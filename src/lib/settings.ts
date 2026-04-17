import { sql } from "drizzle-orm";
import { cache } from "react";
import { getDb } from "./db";
import type { SiteSettingsRow } from "./schema";
import { DEFAULT_SITE_SETTINGS } from "./site-defaults";

export { DEFAULT_SITE_SETTINGS } from "./site-defaults";

type ColumnRow = {
  column_name: string;
};

type RawSettingsRow = Partial<SiteSettingsRow>;

export type SiteSettingsCapabilities = {
  supportsLogoStorage: boolean;
  supportsHeaderTitleSize: boolean;
};

function normalizeSettingsRow(
  row: RawSettingsRow,
  capabilities: SiteSettingsCapabilities,
): SiteSettingsRow {
  return {
    ...DEFAULT_SITE_SETTINGS,
    ...row,
    logoUrl: capabilities.supportsLogoStorage ? row.logoUrl ?? null : null,
    logoAlt: capabilities.supportsLogoStorage ? row.logoAlt ?? null : null,
    logoSizePx: row.logoSizePx ? Number(row.logoSizePx) : DEFAULT_SITE_SETTINGS.logoSizePx,
    headerLayout: row.headerLayout ?? DEFAULT_SITE_SETTINGS.headerLayout,
    headerTitleSizePx: capabilities.supportsHeaderTitleSize
      ? Number(row.headerTitleSizePx ?? DEFAULT_SITE_SETTINGS.headerTitleSizePx)
      : DEFAULT_SITE_SETTINGS.headerTitleSizePx,
    updatedAt:
      row.updatedAt instanceof Date
        ? row.updatedAt
        : row.updatedAt
          ? new Date(String(row.updatedAt))
          : null,
  };
}

export async function getSiteSettingsCapabilities(): Promise<SiteSettingsCapabilities> {
  try {
    const db = getDb();
    const result = await db.execute(sql`
      select column_name
      from information_schema.columns
      where table_name = 'site_settings'
        and column_name in ('logo_url', 'logo_alt', 'header_title_size_px')
    `);

    const names = new Set((result.rows as ColumnRow[]).map((row) => String(row.column_name)));
    return {
      supportsLogoStorage: names.has("logo_url") && names.has("logo_alt"),
      supportsHeaderTitleSize: names.has("header_title_size_px"),
    };
  } catch {
    return {
      supportsLogoStorage: false,
      supportsHeaderTitleSize: false,
    };
  }
}

export async function siteSettingsSupportLogoColumns(): Promise<boolean> {
  return (await getSiteSettingsCapabilities()).supportsLogoStorage;
}

export async function siteSettingsSupportHeaderTitleSizeColumn(): Promise<boolean> {
  return (await getSiteSettingsCapabilities()).supportsHeaderTitleSize;
}

async function querySiteSettings(capabilities: SiteSettingsCapabilities): Promise<SiteSettingsRow | null> {
  const db = getDb();
  // We'll try to select all columns. If it fails due to missing columns, we'll fall back.
  try {
    const result = await db.execute<RawSettingsRow>(sql`
      select
        "id",
        "logo_url" as "logoUrl",
        "logo_alt" as "logoAlt",
        "logo_size_px" as "logoSizePx",
        "header_layout" as "headerLayout",
        "brand_line1" as "brandLine1",
        "brand_line2" as "brandLine2",
        "header_title" as "headerTitle",
        "header_subtitle" as "headerSubtitle",
        "header_title_size_px" as "headerTitleSizePx",
        "hero_title" as "heroTitle",
        "hero_lede" as "heroLede",
        "empty_state_text" as "emptyStateText",
        "manage_add_title" as "manageAddTitle",
        "manage_add_blurb" as "manageAddBlurb",
        "manage_order_title" as "manageOrderTitle",
        "manage_order_blurb" as "manageOrderBlurb",
        "manage_empty_drag_text" as "manageEmptyDragText",
        "login_title" as "loginTitle",
        "login_lede" as "loginLede",
        "login_back_label" as "loginBackLabel",
        "color_primary" as "colorPrimary",
        "color_primary_dark" as "colorPrimaryDark",
        "color_text" as "colorText",
        "color_text_muted" as "colorTextMuted",
        "color_border" as "colorBorder",
        "color_page_bg" as "colorPageBg",
        "color_card_bg" as "colorCardBg",
        "color_card_accent" as "colorCardAccent",
        "color_url_on_card" as "colorUrlOnCard",
        "card_radius_px" as "cardRadiusPx",
        "card_shadow" as "cardShadow",
        "updated_at" as "updatedAt"
      from "site_settings"
      where "id" = 1
      limit 1
    `);
    const row = result.rows[0];
    return row ? normalizeSettingsRow(row, capabilities) : null;
  } catch (e) {
    // Fallback for older schema if needed
    const result = await db.execute<RawSettingsRow>(sql`
      select
        "id",
        "brand_line1" as "brandLine1",
        "brand_line2" as "brandLine2",
        "header_title" as "headerTitle",
        "header_subtitle" as "headerSubtitle",
        "hero_title" as "heroTitle",
        "hero_lede" as "heroLede",
        "empty_state_text" as "emptyStateText",
        "manage_add_title" as "manageAddTitle",
        "manage_add_blurb" as "manageAddBlurb",
        "manage_order_title" as "manageOrderTitle",
        "manage_order_blurb" as "manageOrderBlurb",
        "manage_empty_drag_text" as "manageEmptyDragText",
        "login_title" as "loginTitle",
        "login_lede" as "loginLede",
        "login_back_label" as "loginBackLabel",
        "color_primary" as "colorPrimary",
        "color_primary_dark" as "colorPrimaryDark",
        "color_text" as "colorText",
        "color_text_muted" as "colorTextMuted",
        "color_border" as "colorBorder",
        "color_page_bg" as "colorPageBg",
        "color_card_bg" as "colorCardBg",
        "color_card_accent" as "colorCardAccent",
        "color_url_on_card" as "colorUrlOnCard",
        "card_radius_px" as "cardRadiusPx",
        "card_shadow" as "cardShadow",
        "updated_at" as "updatedAt"
      from "site_settings"
      where "id" = 1
      limit 1
    `);
    const row = result.rows[0];
    return row ? normalizeSettingsRow(row, capabilities) : null;
  }
}

export const getSiteSettings = cache(async (): Promise<SiteSettingsRow> => {
  try {
    const capabilities = await getSiteSettingsCapabilities();
    const settings = await querySiteSettings(capabilities);
    if (settings) return settings;
  } catch {
    try {
      const settings = await querySiteSettings({
        supportsLogoStorage: false,
        supportsHeaderTitleSize: false,
      });
      if (settings) return settings;
    } catch {
      /* table missing or DB down */
    }
  }

  return DEFAULT_SITE_SETTINGS;
});
