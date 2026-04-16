import { eq } from "drizzle-orm";
import { cache } from "react";
import { getDb } from "./db";
import { siteSettings, type SiteSettingsRow } from "./schema";

/** Defaults when the table is missing or empty (matches migration). */
export const DEFAULT_SITE_SETTINGS: SiteSettingsRow = {
  id: 1,
  brandLine1: "WSU",
  brandLine2: "Grad",
  headerTitle: "Graduate School Tools",
  headerSubtitle: "Internal directory",
  heroTitle: "Applications",
  heroLede:
    "This page is public. Editors sign in with Admin login to add links, descriptions, and ordering.",
  emptyStateText: "No applications yet. Sign in with Admin login to add cards.",
  manageAddTitle: "Add application",
  manageAddBlurb:
    "Titles and URLs appear on the public page. Descriptions are optional. Drag cards in the frame below to set order; changes save automatically.",
  manageOrderTitle: "Card order",
  manageOrderBlurb: "Drag by the handle. Order matches the public landing page.",
  manageEmptyDragText: "No cards yet. Add one above.",
  loginTitle: "Admin sign in",
  loginLede:
    "Enter the shared admin password to manage application cards. The public directory is on the home page.",
  loginBackLabel: "← Back to directory",
  colorPrimary: "#981e32",
  colorPrimaryDark: "#6d1524",
  colorText: "#393939",
  colorTextMuted: "#5e6a71",
  colorBorder: "#e2e2e2",
  colorPageBg: "#f7f5f5",
  colorCardBg: "#ffffff",
  colorCardAccent: "#981e32",
  colorUrlOnCard: "#981e32",
  cardRadiusPx: 10,
  cardShadow: "md",
  updatedAt: null,
};

export const getSiteSettings = cache(async (): Promise<SiteSettingsRow> => {
  try {
    const db = getDb();
    const rows = await db.select().from(siteSettings).where(eq(siteSettings.id, 1)).limit(1);
    if (rows[0]) return rows[0];
  } catch {
    /* table missing or DB down */
  }
  return DEFAULT_SITE_SETTINGS;
});
