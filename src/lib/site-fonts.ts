import {
  IBM_Plex_Sans,
  Montserrat,
  Source_Serif_4,
  Space_Grotesk,
} from "next/font/google";

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-montserrat",
});

export const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-space-grotesk",
});

export const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-source-serif-4",
});

export const bodyFontVariables = [
  montserrat.variable,
  ibmPlexSans.variable,
  spaceGrotesk.variable,
  sourceSerif4.variable,
].join(" ");

export const cardFontFamilies = {
  montserrat: `${montserrat.style.fontFamily}, system-ui, sans-serif`,
  "ibm-plex-sans": `${ibmPlexSans.style.fontFamily}, system-ui, sans-serif`,
  "space-grotesk": `${spaceGrotesk.style.fontFamily}, system-ui, sans-serif`,
  "source-serif-4": `${sourceSerif4.style.fontFamily}, Georgia, serif`,
} as const;
