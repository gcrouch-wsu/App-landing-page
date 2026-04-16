"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateSiteSettingsAction } from "@/app/actions/settings";
import { BrandLockup } from "@/components/BrandLockup";
import type { SiteSettingsRow } from "@/lib/schema";
import { DEFAULT_SITE_SETTINGS } from "@/lib/site-defaults";

type Props = {
  settings: SiteSettingsRow;
  supportsLogoStorage: boolean;
  supportsHeaderTitleSize: boolean;
};

function blankIfDefault(value: string | number | null | undefined, fallback: string | number): string {
  if (value === null || value === undefined) return "";
  return String(value) === String(fallback) ? "" : String(value);
}

function previewValue(
  value: string,
  touched: boolean | undefined,
  savedValue: string | null | undefined,
): string {
  if (!touched) return String(savedValue ?? "");
  return value.trim();
}

export function SiteAppearanceForm({
  settings,
  supportsLogoStorage,
  supportsHeaderTitleSize,
}: Props) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [banner, setBanner] = useState<string | null>(null);
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const logoUrlValue = settings.logoUrl ?? "";
  const logoAltFallback = `${settings.headerTitle} logo`;
  const logoAltValue =
    settings.logoAlt && settings.logoAlt === logoAltFallback ? "" : (settings.logoAlt ?? "");
  const brandLine1Value = blankIfDefault(settings.brandLine1, DEFAULT_SITE_SETTINGS.brandLine1);
  const brandLine2Value = blankIfDefault(settings.brandLine2, DEFAULT_SITE_SETTINGS.brandLine2);
  const headerTitleValue = blankIfDefault(settings.headerTitle, DEFAULT_SITE_SETTINGS.headerTitle);
  const headerSubtitleValue = blankIfDefault(
    settings.headerSubtitle,
    DEFAULT_SITE_SETTINGS.headerSubtitle,
  );
  const heroTitleValue = blankIfDefault(settings.heroTitle, DEFAULT_SITE_SETTINGS.heroTitle);
  const heroLedeValue = blankIfDefault(settings.heroLede, DEFAULT_SITE_SETTINGS.heroLede);
  const emptyStateTextValue = blankIfDefault(
    settings.emptyStateText,
    DEFAULT_SITE_SETTINGS.emptyStateText,
  );
  const loginTitleValue = blankIfDefault(settings.loginTitle, DEFAULT_SITE_SETTINGS.loginTitle);
  const loginLedeValue = blankIfDefault(settings.loginLede, DEFAULT_SITE_SETTINGS.loginLede);
  const loginBackLabelValue = blankIfDefault(
    settings.loginBackLabel,
    DEFAULT_SITE_SETTINGS.loginBackLabel,
  );
  const manageAddTitleValue = blankIfDefault(
    settings.manageAddTitle,
    DEFAULT_SITE_SETTINGS.manageAddTitle,
  );
  const manageAddBlurbValue = blankIfDefault(
    settings.manageAddBlurb,
    DEFAULT_SITE_SETTINGS.manageAddBlurb,
  );
  const manageOrderTitleValue = blankIfDefault(
    settings.manageOrderTitle,
    DEFAULT_SITE_SETTINGS.manageOrderTitle,
  );
  const manageEmptyDragTextValue = blankIfDefault(
    settings.manageEmptyDragText,
    DEFAULT_SITE_SETTINGS.manageEmptyDragText,
  );
  const manageOrderBlurbValue = blankIfDefault(
    settings.manageOrderBlurb,
    DEFAULT_SITE_SETTINGS.manageOrderBlurb,
  );
  const colorPrimaryValue = blankIfDefault(settings.colorPrimary, DEFAULT_SITE_SETTINGS.colorPrimary);
  const colorPrimaryDarkValue = blankIfDefault(
    settings.colorPrimaryDark,
    DEFAULT_SITE_SETTINGS.colorPrimaryDark,
  );
  const colorTextValue = blankIfDefault(settings.colorText, DEFAULT_SITE_SETTINGS.colorText);
  const colorTextMutedValue = blankIfDefault(
    settings.colorTextMuted,
    DEFAULT_SITE_SETTINGS.colorTextMuted,
  );
  const colorBorderValue = blankIfDefault(settings.colorBorder, DEFAULT_SITE_SETTINGS.colorBorder);
  const colorPageBgValue = blankIfDefault(settings.colorPageBg, DEFAULT_SITE_SETTINGS.colorPageBg);
  const colorCardBgValue = blankIfDefault(settings.colorCardBg, DEFAULT_SITE_SETTINGS.colorCardBg);
  const colorCardAccentValue = blankIfDefault(
    settings.colorCardAccent,
    DEFAULT_SITE_SETTINGS.colorCardAccent,
  );
  const colorUrlOnCardValue = blankIfDefault(
    settings.colorUrlOnCard,
    DEFAULT_SITE_SETTINGS.colorUrlOnCard,
  );
  const cardRadiusPxValue = blankIfDefault(
    settings.cardRadiusPx,
    DEFAULT_SITE_SETTINGS.cardRadiusPx,
  );
  const cardShadowValue = blankIfDefault(settings.cardShadow, DEFAULT_SITE_SETTINGS.cardShadow);
  const headerTitleSizePxValue = blankIfDefault(
    settings.headerTitleSizePx,
    DEFAULT_SITE_SETTINGS.headerTitleSizePx,
  );

  const [logoUrl, setLogoUrl] = useState(logoUrlValue);
  const [logoAlt, setLogoAlt] = useState(logoAltValue);
  const [brandLine1, setBrandLine1] = useState(brandLine1Value);
  const [brandLine2, setBrandLine2] = useState(brandLine2Value);
  const [headerTitle, setHeaderTitle] = useState(headerTitleValue);
  const [headerSubtitle, setHeaderSubtitle] = useState(headerSubtitleValue);
  const [headerTitleSizePx, setHeaderTitleSizePx] = useState(headerTitleSizePxValue);

  function handleFieldInput(event: React.FormEvent<HTMLFormElement>) {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    if (!target.name) return;

    setTouchedFields((prev) => (prev[target.name] ? prev : { ...prev, [target.name]: true }));

    switch (target.name) {
      case "logoUrl":
        setLogoUrl(target.value);
        break;
      case "logoAlt":
        setLogoAlt(target.value);
        break;
      case "brandLine1":
        setBrandLine1(target.value);
        break;
      case "brandLine2":
        setBrandLine2(target.value);
        break;
      case "headerTitle":
        setHeaderTitle(target.value);
        break;
      case "headerSubtitle":
        setHeaderSubtitle(target.value);
        break;
      case "headerTitleSizePx":
        setHeaderTitleSizePx(target.value);
        break;
      default:
        break;
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBanner(null);
    setPending(true);
    try {
      const fd = new FormData(e.currentTarget);
      const preservedTextValues: Record<string, string> = {
        logoAlt: settings.logoAlt ?? "",
        brandLine1: settings.brandLine1,
        brandLine2: settings.brandLine2,
        headerTitle: settings.headerTitle,
        headerSubtitle: settings.headerSubtitle,
        heroTitle: settings.heroTitle,
        heroLede: settings.heroLede,
        emptyStateText: settings.emptyStateText,
        loginTitle: settings.loginTitle,
        loginLede: settings.loginLede,
        loginBackLabel: settings.loginBackLabel,
        manageAddTitle: settings.manageAddTitle,
        manageAddBlurb: settings.manageAddBlurb,
        manageOrderTitle: settings.manageOrderTitle,
        manageOrderBlurb: settings.manageOrderBlurb,
        manageEmptyDragText: settings.manageEmptyDragText,
      };

      for (const [name, originalValue] of Object.entries(preservedTextValues)) {
        if (!touchedFields[name] && String(fd.get(name) ?? "") === "") {
          fd.set(name, originalValue);
        }
      }

      const res = await updateSiteSettingsAction(fd);
      if (res.ok) {
        router.refresh();
        return;
      }
      const parts = Object.entries(res.error)
        .flatMap(([, value]) => value ?? [])
        .filter(Boolean);
      setBanner(parts.length ? parts.join(" ") : "Check your inputs.");
    } catch {
      setBanner("Could not save settings.");
    } finally {
      setPending(false);
    }
  }

  const previewTitle = previewValue(headerTitle, touchedFields.headerTitle, settings.headerTitle);
  const previewSubtitle = previewValue(
    headerSubtitle,
    touchedFields.headerSubtitle,
    settings.headerSubtitle,
  );
  const previewBrandLine1 = previewValue(
    brandLine1,
    touchedFields.brandLine1,
    settings.brandLine1,
  );
  const previewBrandLine2 = previewValue(
    brandLine2,
    touchedFields.brandLine2,
    settings.brandLine2,
  );
  const previewLogoUrl = supportsLogoStorage ? logoUrl.trim() || null : null;
  const previewLogoAlt = previewValue(logoAlt, touchedFields.logoAlt, settings.logoAlt);
  const previewHeaderTitleSize =
    touchedFields.headerTitleSizePx
      ? (headerTitleSizePx.trim() === ""
          ? DEFAULT_SITE_SETTINGS.headerTitleSizePx
          : Number(headerTitleSizePx))
      : settings.headerTitleSizePx;

  return (
    <section className="mb-10 rounded-[18px] border border-[var(--wsu-gray-light)] bg-white p-6 shadow-[0_10px_28px_rgba(0,0,0,0.06)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-lg font-bold text-[var(--wsu-gray)]">Page and appearance</h2>
          <p className="mt-1 text-sm leading-6 text-[var(--wsu-gray-mid)]">
            Update the public page, login screen, card styling, and header branding from one
            place.
          </p>
        </div>
        <div className="max-w-sm rounded-[18px] bg-[var(--wsu-bg)] px-4 py-3 text-sm leading-6 text-[var(--wsu-gray-mid)] ring-1 ring-black/5">
          Text fields are optional. Clear any copy field and save to hide it on the site. Color
          and card styling inputs still fall back to their built-in defaults when left blank.
          {supportsLogoStorage
            ? " Add a logo URL to replace the text mark in the upper-left header."
            : " The header currently uses the text mark because this database has not enabled logo storage yet."}
        </div>
      </div>

      <form onSubmit={handleSubmit} onInputCapture={handleFieldInput} className="mt-6 space-y-8">
        {banner ? <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-800">{banner}</p> : null}

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(300px,360px)]">
          <fieldset className="space-y-4 rounded-[18px] border border-[var(--wsu-gray-light)] p-5">
            <legend className="px-2 text-sm font-semibold text-[var(--wsu-gray)]">Logo and header</legend>

            {supportsLogoStorage ? (
              <>
                <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)]">
                  Logo image URL <span className="font-normal normal-case">(optional)</span>
                  <input
                    name="logoUrl"
                    defaultValue={logoUrlValue}
                    inputMode="url"
                    className="mt-1 w-full rounded-xl border border-[var(--wsu-gray-light)] px-3 py-2.5 text-sm"
                    placeholder="https://example.edu/logo.svg or /logo.png"
                  />
                </label>

                <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)]">
                  Logo alt text <span className="font-normal normal-case">(optional)</span>
                  <input
                    name="logoAlt"
                    defaultValue={logoAltValue}
                    className="mt-1 w-full rounded-xl border border-[var(--wsu-gray-light)] px-3 py-2.5 text-sm"
                    placeholder="Graduate School logo"
                  />
                </label>
              </>
            ) : (
              <>
                <input type="hidden" name="logoUrl" value="" />
                <input type="hidden" name="logoAlt" value="" />
                <div className="rounded-[16px] bg-[var(--wsu-bg)] px-4 py-3 text-sm leading-6 text-[var(--wsu-gray-mid)] ring-1 ring-black/5">
                  Logo storage is unavailable until the database migration adds the `logo_url` and
                  `logo_alt` columns. The rest of the page and appearance settings will still save
                  normally.
                </div>
              </>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)]">
                Text mark line 1
                <input
                  name="brandLine1"
                  defaultValue={brandLine1Value}
                  className="mt-1 w-full rounded-xl border border-[var(--wsu-gray-light)] px-3 py-2.5 text-sm"
                  placeholder={DEFAULT_SITE_SETTINGS.brandLine1}
                />
              </label>
              <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)]">
                Text mark line 2
                <input
                  name="brandLine2"
                  defaultValue={brandLine2Value}
                  className="mt-1 w-full rounded-xl border border-[var(--wsu-gray-light)] px-3 py-2.5 text-sm"
                  placeholder={DEFAULT_SITE_SETTINGS.brandLine2}
                />
              </label>
            </div>

            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)]">
              Site title
              <input
                name="headerTitle"
                defaultValue={headerTitleValue}
                className="mt-1 w-full rounded-xl border border-[var(--wsu-gray-light)] px-3 py-2.5 text-sm"
                placeholder={DEFAULT_SITE_SETTINGS.headerTitle}
              />
            </label>

            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)]">
              Site subtitle
              <input
                name="headerSubtitle"
                defaultValue={headerSubtitleValue}
                className="mt-1 w-full rounded-xl border border-[var(--wsu-gray-light)] px-3 py-2.5 text-sm"
                placeholder={DEFAULT_SITE_SETTINGS.headerSubtitle}
              />
            </label>

            {supportsHeaderTitleSize ? (
              <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)]">
                Site title size (px)
                <input
                  name="headerTitleSizePx"
                  type="number"
                  min={18}
                  max={40}
                  defaultValue={headerTitleSizePxValue}
                  className="mt-1 block w-32 rounded-xl border border-[var(--wsu-gray-light)] px-3 py-2.5 text-sm"
                  placeholder={String(DEFAULT_SITE_SETTINGS.headerTitleSizePx)}
                />
              </label>
            ) : (
              <input type="hidden" name="headerTitleSizePx" value="" />
            )}
          </fieldset>

          <aside className="rounded-[18px] bg-[var(--wsu-bg)] p-5 ring-1 ring-black/5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--wsu-crimson)]">
              Header preview
            </p>
            <div className="mt-4 rounded-[18px] border border-[var(--wsu-gray-light)] bg-white p-4">
              <BrandLockup
                brandLine1={previewBrandLine1}
                brandLine2={previewBrandLine2}
                headerTitle={previewTitle}
                headerSubtitle={previewSubtitle}
                headerTitleSizePx={previewHeaderTitleSize}
                logoUrl={previewLogoUrl}
                logoAlt={previewLogoAlt}
              />
            </div>
            <p className="mt-4 text-sm leading-6 text-[var(--wsu-gray-mid)]">
              {supportsLogoStorage
                ? "Wide or tall logos scale naturally without a surrounding box. If you leave the logo URL blank, the header uses the text mark instead."
                : "The preview shows the text mark layout that will be used until logo storage is enabled in the database."}
              {!supportsHeaderTitleSize
                ? " Title size uses the built-in default until the database migration adds header_title_size_px."
                : ""}
            </p>
          </aside>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <fieldset className="space-y-4 rounded-[18px] border border-[var(--wsu-gray-light)] p-5">
            <legend className="px-2 text-sm font-semibold text-[var(--wsu-gray)]">Public page</legend>

            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)]">
              Section heading
              <input
                name="heroTitle"
                defaultValue={heroTitleValue}
                className="mt-1 w-full rounded-xl border border-[var(--wsu-gray-light)] px-3 py-2.5 text-sm"
                placeholder={DEFAULT_SITE_SETTINGS.heroTitle}
              />
            </label>

            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)]">
              Intro paragraph
              <textarea
                name="heroLede"
                rows={4}
                defaultValue={heroLedeValue}
                className="mt-1 w-full resize-y rounded-xl border border-[var(--wsu-gray-light)] px-3 py-2.5 text-sm"
                placeholder={DEFAULT_SITE_SETTINGS.heroLede}
              />
            </label>

            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)]">
              Empty state message
              <textarea
                name="emptyStateText"
                rows={3}
                defaultValue={emptyStateTextValue}
                className="mt-1 w-full resize-y rounded-xl border border-[var(--wsu-gray-light)] px-3 py-2.5 text-sm"
                placeholder={DEFAULT_SITE_SETTINGS.emptyStateText}
              />
            </label>
          </fieldset>

          <fieldset className="space-y-4 rounded-[18px] border border-[var(--wsu-gray-light)] p-5">
            <legend className="px-2 text-sm font-semibold text-[var(--wsu-gray)]">Login page</legend>

            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)]">
              Page title
              <input
                name="loginTitle"
                defaultValue={loginTitleValue}
                className="mt-1 w-full rounded-xl border border-[var(--wsu-gray-light)] px-3 py-2.5 text-sm"
                placeholder={DEFAULT_SITE_SETTINGS.loginTitle}
              />
            </label>

            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)]">
              Intro paragraph
              <textarea
                name="loginLede"
                rows={4}
                defaultValue={loginLedeValue}
                className="mt-1 w-full resize-y rounded-xl border border-[var(--wsu-gray-light)] px-3 py-2.5 text-sm"
                placeholder={DEFAULT_SITE_SETTINGS.loginLede}
              />
            </label>

            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)]">
              Back link label
              <input
                name="loginBackLabel"
                defaultValue={loginBackLabelValue}
                className="mt-1 w-full rounded-xl border border-[var(--wsu-gray-light)] px-3 py-2.5 text-sm"
                placeholder={DEFAULT_SITE_SETTINGS.loginBackLabel}
              />
            </label>
          </fieldset>
        </div>

        <fieldset className="space-y-4 rounded-[18px] border border-[var(--wsu-gray-light)] p-5">
          <legend className="px-2 text-sm font-semibold text-[var(--wsu-gray)]">Manage page</legend>

          <div className="grid gap-4 lg:grid-cols-2">
            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)] lg:col-span-2">
              Add application title
              <input
                name="manageAddTitle"
                defaultValue={manageAddTitleValue}
                className="mt-1 w-full rounded-xl border border-[var(--wsu-gray-light)] px-3 py-2.5 text-sm"
                placeholder={DEFAULT_SITE_SETTINGS.manageAddTitle}
              />
            </label>

            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)] lg:col-span-2">
              Add application blurb
              <textarea
                name="manageAddBlurb"
                rows={4}
                defaultValue={manageAddBlurbValue}
                className="mt-1 w-full resize-y rounded-xl border border-[var(--wsu-gray-light)] px-3 py-2.5 text-sm"
                placeholder={DEFAULT_SITE_SETTINGS.manageAddBlurb}
              />
            </label>

            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)]">
              Card order title
              <input
                name="manageOrderTitle"
                defaultValue={manageOrderTitleValue}
                className="mt-1 w-full rounded-xl border border-[var(--wsu-gray-light)] px-3 py-2.5 text-sm"
                placeholder={DEFAULT_SITE_SETTINGS.manageOrderTitle}
              />
            </label>

            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)]">
              Empty drag message
              <input
                name="manageEmptyDragText"
                defaultValue={manageEmptyDragTextValue}
                className="mt-1 w-full rounded-xl border border-[var(--wsu-gray-light)] px-3 py-2.5 text-sm"
                placeholder={DEFAULT_SITE_SETTINGS.manageEmptyDragText}
              />
            </label>

            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)] lg:col-span-2">
              Card order blurb
              <textarea
                name="manageOrderBlurb"
                rows={3}
                defaultValue={manageOrderBlurbValue}
                className="mt-1 w-full resize-y rounded-xl border border-[var(--wsu-gray-light)] px-3 py-2.5 text-sm"
                placeholder={DEFAULT_SITE_SETTINGS.manageOrderBlurb}
              />
            </label>
          </div>
        </fieldset>

        <fieldset className="space-y-4 rounded-[18px] border border-[var(--wsu-gray-light)] p-5">
          <legend className="px-2 text-sm font-semibold text-[var(--wsu-gray)]">Colors</legend>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {(
              [
                ["colorPrimary", "Primary", colorPrimaryValue, DEFAULT_SITE_SETTINGS.colorPrimary],
                [
                  "colorPrimaryDark",
                  "Primary hover",
                  colorPrimaryDarkValue,
                  DEFAULT_SITE_SETTINGS.colorPrimaryDark,
                ],
                ["colorText", "Main text", colorTextValue, DEFAULT_SITE_SETTINGS.colorText],
                [
                  "colorTextMuted",
                  "Muted text",
                  colorTextMutedValue,
                  DEFAULT_SITE_SETTINGS.colorTextMuted,
                ],
                ["colorBorder", "Borders", colorBorderValue, DEFAULT_SITE_SETTINGS.colorBorder],
                [
                  "colorPageBg",
                  "Page background",
                  colorPageBgValue,
                  DEFAULT_SITE_SETTINGS.colorPageBg,
                ],
                ["colorCardBg", "Card background", colorCardBgValue, DEFAULT_SITE_SETTINGS.colorCardBg],
                [
                  "colorCardAccent",
                  "Card top stripe",
                  colorCardAccentValue,
                  DEFAULT_SITE_SETTINGS.colorCardAccent,
                ],
                [
                  "colorUrlOnCard",
                  "Card URL text",
                  colorUrlOnCardValue,
                  DEFAULT_SITE_SETTINGS.colorUrlOnCard,
                ],
              ] as const
            ).map(([name, label, value, fallback]) => (
              <label
                key={name}
                className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)]"
              >
                {label}
                <input
                  name={name}
                  type="text"
                  defaultValue={value}
                  className="mt-1 w-full rounded-xl border border-[var(--wsu-gray-light)] px-3 py-2.5 font-mono text-sm"
                  placeholder={fallback}
                />
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="space-y-4 rounded-[18px] border border-[var(--wsu-gray-light)] p-5">
          <legend className="px-2 text-sm font-semibold text-[var(--wsu-gray)]">Cards</legend>

          <div className="flex flex-wrap gap-4">
            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)]">
              Corner radius (px)
              <input
                name="cardRadiusPx"
                type="number"
                min={4}
                max={32}
                defaultValue={cardRadiusPxValue}
                className="mt-1 block w-32 rounded-xl border border-[var(--wsu-gray-light)] px-3 py-2.5 text-sm"
                placeholder={String(DEFAULT_SITE_SETTINGS.cardRadiusPx)}
              />
            </label>

            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)]">
              Shadow
              <select
                name="cardShadow"
                defaultValue={cardShadowValue}
                className="mt-1 block rounded-xl border border-[var(--wsu-gray-light)] px-3 py-2.5 text-sm"
              >
                <option value="">Use default (medium)</option>
                <option value="none">None</option>
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </label>
          </div>
        </fieldset>

        <div className="flex flex-col gap-3 rounded-[18px] bg-[var(--wsu-bg)] px-4 py-4 ring-1 ring-black/5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-6 text-[var(--wsu-gray-mid)]">
            Text fields can be left blank. Color and card settings revert to defaults if blank.
          </p>
          <button
            type="submit"
            disabled={pending}
            className="rounded-full bg-[var(--wsu-crimson)] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--wsu-crimson-dark)] disabled:opacity-60"
          >
            {pending ? "Saving..." : "Save page and appearance"}
          </button>
        </div>
      </form>
    </section>
  );
}
