import { eq, sql } from "drizzle-orm";
import { cache } from "react";
import { getDb } from "./db";
import { DEFAULT_SITE_SETTINGS } from "./site-defaults";
import { siteSettings, type SiteSettingsRow } from "./schema";

export { DEFAULT_SITE_SETTINGS } from "./site-defaults";

const legacySettingsSelection = {
  id: siteSettings.id,
  brandLine1: siteSettings.brandLine1,
  brandLine2: siteSettings.brandLine2,
  headerTitle: siteSettings.headerTitle,
  headerSubtitle: siteSettings.headerSubtitle,
  heroTitle: siteSettings.heroTitle,
  heroLede: siteSettings.heroLede,
  emptyStateText: siteSettings.emptyStateText,
  manageAddTitle: siteSettings.manageAddTitle,
  manageAddBlurb: siteSettings.manageAddBlurb,
  manageOrderTitle: siteSettings.manageOrderTitle,
  manageOrderBlurb: siteSettings.manageOrderBlurb,
  manageEmptyDragText: siteSettings.manageEmptyDragText,
  loginTitle: siteSettings.loginTitle,
  loginLede: siteSettings.loginLede,
  loginBackLabel: siteSettings.loginBackLabel,
  colorPrimary: siteSettings.colorPrimary,
  colorPrimaryDark: siteSettings.colorPrimaryDark,
  colorText: siteSettings.colorText,
  colorTextMuted: siteSettings.colorTextMuted,
  colorBorder: siteSettings.colorBorder,
  colorPageBg: siteSettings.colorPageBg,
  colorCardBg: siteSettings.colorCardBg,
  colorCardAccent: siteSettings.colorCardAccent,
  colorUrlOnCard: siteSettings.colorUrlOnCard,
  cardRadiusPx: siteSettings.cardRadiusPx,
  cardShadow: siteSettings.cardShadow,
  updatedAt: siteSettings.updatedAt,
};

type ColumnRow = {
  column_name: string;
};

export async function siteSettingsSupportLogoColumns(): Promise<boolean> {
  try {
    const db = getDb();
    const result = await db.execute(sql`
      select column_name
      from information_schema.columns
      where table_schema = current_schema()
        and table_name = 'site_settings'
        and column_name in ('logo_url', 'logo_alt')
    `);

    const names = new Set(
      (result.rows as ColumnRow[]).map((row) => String(row.column_name)),
    );

    return names.has("logo_url") && names.has("logo_alt");
  } catch {
    return false;
  }
}

async function getLegacySiteSettings(): Promise<SiteSettingsRow | null> {
  const db = getDb();
  const rows = await db
    .select(legacySettingsSelection)
    .from(siteSettings)
    .where(eq(siteSettings.id, 1))
    .limit(1);

  if (!rows[0]) return null;

  return {
    ...DEFAULT_SITE_SETTINGS,
    ...rows[0],
    logoUrl: null,
    logoAlt: null,
  };
}

export const getSiteSettings = cache(async (): Promise<SiteSettingsRow> => {
  try {
    const db = getDb();
    if (await siteSettingsSupportLogoColumns()) {
      const rows = await db.select().from(siteSettings).where(eq(siteSettings.id, 1)).limit(1);
      if (rows[0]) return rows[0];
    } else {
      const legacy = await getLegacySiteSettings();
      if (legacy) return legacy;
    }
  } catch {
    try {
      const legacy = await getLegacySiteSettings();
      if (legacy) return legacy;
    } catch {
      /* table missing or DB down */
    }
  }

  return DEFAULT_SITE_SETTINGS;
});
