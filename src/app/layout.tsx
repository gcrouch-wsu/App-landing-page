import type { Metadata } from "next";
import { SiteTheme } from "@/components/SiteTheme";
import { bodyFontVariables } from "@/lib/site-fonts";
import { getSiteSettings } from "@/lib/settings";
import "./globals.css";

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
      <body className={`${bodyFontVariables} antialiased`}>
        <SiteTheme settings={settings} />
        {children}
      </body>
    </html>
  );
}
