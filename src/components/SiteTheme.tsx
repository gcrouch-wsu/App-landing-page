import type { SiteSettingsRow } from "@/lib/schema";

function cardShadowValue(key: string): string {
  switch (key) {
    case "none":
      return "none";
    case "sm":
      return "0 2px 8px rgba(0,0,0,0.06)";
    case "lg":
      return "0 8px 24px rgba(0,0,0,0.12)";
    case "md":
    default:
      return "0 4px 14px rgba(0,0,0,0.08)";
  }
}

/** Injects CSS variables from saved site settings (colors, card radius, shadow). */
export function SiteTheme({ settings }: { settings: SiteSettingsRow }) {
  const r = Math.min(32, Math.max(4, settings.cardRadiusPx));
  const css = `:root {
  --wsu-crimson: ${settings.colorPrimary};
  --wsu-crimson-dark: ${settings.colorPrimaryDark};
  --wsu-gray: ${settings.colorText};
  --wsu-gray-mid: ${settings.colorTextMuted};
  --wsu-gray-light: ${settings.colorBorder};
  --wsu-bg: ${settings.colorPageBg};
  --wsu-white: #ffffff;
  --wsu-card-bg: ${settings.colorCardBg};
  --wsu-card-accent: ${settings.colorCardAccent};
  --wsu-url-on-card: ${settings.colorUrlOnCard};
  --wsu-card-radius: ${r}px;
  --wsu-card-shadow: ${cardShadowValue(settings.cardShadow)};
}`;

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
