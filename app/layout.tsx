import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PlaneCursor from "@/components/effects/PlaneCursor";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { SITE } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  metadataBase: new URL("https://aeroclub.accent-casablanca.ma"),
  title: {
    default: `${SITE.full} — ${SITE.school}`,
    template: `%s · ${SITE.abbr}`,
  },
  description:
    "The aeronautical engineering club of École Centrale Casablanca. We design aircraft, build drones, train on flight procedures — and keep one eye on space.",
  keywords: [
    "Club Aero Centrale Casablanca",
    "CACC",
    "École Centrale Casablanca",
    "aviation",
    "aeronautics",
    "aerospace",
    "student club",
    "Morocco",
    "drones",
    "rockets",
    "CubeSat",
  ],
  openGraph: {
    type: "website",
    title: SITE.full,
    description: `${SITE.slogan} — the aeronautical engineering club of ${SITE.school}.`,
    siteName: SITE.full,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Apply stored theme before first paint (light/daytime is the default) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("cac-theme")==="dark")document.documentElement.classList.add("dark")}catch(e){}`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${grotesk.variable} font-sans`}>
        <ThemeProvider>
          <PlaneCursor />
          <Navbar />
          <main id="content">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
