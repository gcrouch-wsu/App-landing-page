import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { SiteTheme } from "@/components/SiteTheme";
import { getSiteSettings } from "@/lib/settings";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-montserrat",
});

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  return {
    title: s.headerTitle,
    description: s.headerSubtitle,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <SiteTheme settings={settings} />
        {children}
      </body>
    </html>
  );
}
