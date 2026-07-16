import { NextRequest, NextResponse } from "next/server";
import { EDITABLE_COLLECTIONS, readCollection, writeCollection } from "@/lib/data";

/**
 * Lightweight admin API — no database, no complex backend.
 * GET  /api/admin/{collection}  → returns the JSON collection
 * PUT  /api/admin/{collection}  → replaces it (requires x-admin-key header)
 *
 * Set ADMIN_PASSWORD in .env.local. Writes persist to /data/*.json,
 * which works on any Node host (VPS, school server). On serverless
 * platforms with a read-only filesystem (e.g. Vercel), switch lib/data.ts
 * to Firebase/Supabase — the pages won't need to change.
 */

type Params = { params: { collection: string } };

function isEditable(name: string): name is (typeof EDITABLE_COLLECTIONS)[number] {
  return (EDITABLE_COLLECTIONS as readonly string[]).includes(name);
}

function authorized(req: NextRequest) {
  const key = req.headers.get("x-admin-key");
  const expected = process.env.ADMIN_PASSWORD;
  return Boolean(expected) && key === expected;
}

export async function GET(req: NextRequest, { params }: Params) {
  if (!isEditable(params.collection)) {
    return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  }
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(readCollection(params.collection));
}

export async function PUT(req: NextRequest, { params }: Params) {
  if (!isEditable(params.collection)) {
    return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  }
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!Array.isArray(body)) {
    return NextResponse.json({ error: "Collection must be a JSON array" }, { status: 400 });
  }
  writeCollection(params.collection, body);
  return NextResponse.json({ ok: true });
}
