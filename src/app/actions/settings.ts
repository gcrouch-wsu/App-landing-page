"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { cookies } from "next/headers";
import { getDb } from "@/lib/db";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";
import { siteSettings } from "@/lib/schema";

const hex = z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Use #RRGGBB format");

const settingsSchema = z.object({
  brandLine1: z.string().trim().min(1).max(40),
  brandLine2: z.string().trim().min(1).max(40),
  headerTitle: z.string().trim().min(1).max(120),
  headerSubtitle: z.string().trim().min(1).max(200),
  heroTitle: z.string().trim().min(1).max(120),
  heroLede: z.string().trim().min(1).max(2000),
  emptyStateText: z.string().trim().min(1).max(2000),
  manageAddTitle: z.string().trim().min(1).max(120),
  manageAddBlurb: z.string().trim().min(1).max(2000),
  manageOrderTitle: z.string().trim().min(1).max(120),
  manageOrderBlurb: z.string().trim().min(1).max(2000),
  manageEmptyDragText: z.string().trim().min(1).max(2000),
  loginTitle: z.string().trim().min(1).max(120),
  loginLede: z.string().trim().min(1).max(2000),
  loginBackLabel: z.string().trim().min(1).max(120),
  colorPrimary: hex,
  colorPrimaryDark: hex,
  colorText: hex,
  colorTextMuted: hex,
  colorBorder: hex,
  colorPageBg: hex,
  colorCardBg: hex,
  colorCardAccent: hex,
  colorUrlOnCard: hex,
  cardRadiusPx: z.coerce.number().int().min(4).max(32),
  cardShadow: z.enum(["none", "sm", "md", "lg"]),
});

async function requireSession() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token || !(await verifySessionToken(token))) {
    throw new Error("Unauthorized");
  }
}

export async function updateSiteSettingsAction(formData: FormData) {
  await requireSession();
  const raw = {
    brandLine1: formData.get("brandLine1"),
    brandLine2: formData.get("brandLine2"),
    headerTitle: formData.get("headerTitle"),
    headerSubtitle: formData.get("headerSubtitle"),
    heroTitle: formData.get("heroTitle"),
    heroLede: formData.get("heroLede"),
    emptyStateText: formData.get("emptyStateText"),
    manageAddTitle: formData.get("manageAddTitle"),
    manageAddBlurb: formData.get("manageAddBlurb"),
    manageOrderTitle: formData.get("manageOrderTitle"),
    manageOrderBlurb: formData.get("manageOrderBlurb"),
    manageEmptyDragText: formData.get("manageEmptyDragText"),
    loginTitle: formData.get("loginTitle"),
    loginLede: formData.get("loginLede"),
    loginBackLabel: formData.get("loginBackLabel"),
    colorPrimary: formData.get("colorPrimary"),
    colorPrimaryDark: formData.get("colorPrimaryDark"),
    colorText: formData.get("colorText"),
    colorTextMuted: formData.get("colorTextMuted"),
    colorBorder: formData.get("colorBorder"),
    colorPageBg: formData.get("colorPageBg"),
    colorCardBg: formData.get("colorCardBg"),
    colorCardAccent: formData.get("colorCardAccent"),
    colorUrlOnCard: formData.get("colorUrlOnCard"),
    cardRadiusPx: formData.get("cardRadiusPx"),
    cardShadow: formData.get("cardShadow"),
  };
  const parsed = settingsSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.flatten().fieldErrors };
  }
  const v = parsed.data;
  const db = getDb();
  await db
    .insert(siteSettings)
    .values({
      id: 1,
      brandLine1: v.brandLine1,
      brandLine2: v.brandLine2,
      headerTitle: v.headerTitle,
      headerSubtitle: v.headerSubtitle,
      heroTitle: v.heroTitle,
      heroLede: v.heroLede,
      emptyStateText: v.emptyStateText,
      manageAddTitle: v.manageAddTitle,
      manageAddBlurb: v.manageAddBlurb,
      manageOrderTitle: v.manageOrderTitle,
      manageOrderBlurb: v.manageOrderBlurb,
      manageEmptyDragText: v.manageEmptyDragText,
      loginTitle: v.loginTitle,
      loginLede: v.loginLede,
      loginBackLabel: v.loginBackLabel,
      colorPrimary: v.colorPrimary,
      colorPrimaryDark: v.colorPrimaryDark,
      colorText: v.colorText,
      colorTextMuted: v.colorTextMuted,
      colorBorder: v.colorBorder,
      colorPageBg: v.colorPageBg,
      colorCardBg: v.colorCardBg,
      colorCardAccent: v.colorCardAccent,
      colorUrlOnCard: v.colorUrlOnCard,
      cardRadiusPx: v.cardRadiusPx,
      cardShadow: v.cardShadow,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: siteSettings.id,
      set: {
        brandLine1: v.brandLine1,
        brandLine2: v.brandLine2,
        headerTitle: v.headerTitle,
        headerSubtitle: v.headerSubtitle,
        heroTitle: v.heroTitle,
        heroLede: v.heroLede,
        emptyStateText: v.emptyStateText,
        manageAddTitle: v.manageAddTitle,
        manageAddBlurb: v.manageAddBlurb,
        manageOrderTitle: v.manageOrderTitle,
        manageOrderBlurb: v.manageOrderBlurb,
        manageEmptyDragText: v.manageEmptyDragText,
        loginTitle: v.loginTitle,
        loginLede: v.loginLede,
        loginBackLabel: v.loginBackLabel,
        colorPrimary: v.colorPrimary,
        colorPrimaryDark: v.colorPrimaryDark,
        colorText: v.colorText,
        colorTextMuted: v.colorTextMuted,
        colorBorder: v.colorBorder,
        colorPageBg: v.colorPageBg,
        colorCardBg: v.colorCardBg,
        colorCardAccent: v.colorCardAccent,
        colorUrlOnCard: v.colorUrlOnCard,
        cardRadiusPx: v.cardRadiusPx,
        cardShadow: v.cardShadow,
        updatedAt: new Date(),
      },
    });
  revalidatePath("/", "layout");
  revalidatePath("/");
  revalidatePath("/manage");
  revalidatePath("/login");
  return { ok: true as const };
}
