"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateSiteSettingsAction } from "@/app/actions/settings";
import type { SiteSettingsRow } from "@/lib/schema";

export function SiteAppearanceForm({ settings }: { settings: SiteSettingsRow }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [banner, setBanner] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBanner(null);
    setPending(true);
    try {
      const fd = new FormData(e.currentTarget);
      const res = await updateSiteSettingsAction(fd);
      if (res.ok) {
        router.refresh();
        return;
      }
      const parts = Object.entries(res.error)
        .flatMap(([, v]) => v ?? [])
        .filter(Boolean);
      setBanner(parts.length ? parts.join(" ") : "Check your inputs.");
    } catch {
      setBanner("Could not save settings.");
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="mb-10 rounded-[10px] border border-[var(--wsu-gray-light)] bg-white p-5 shadow-[0_4px_14px_rgba(0,0,0,0.06)]">
      <h2 className="m-0 text-lg font-bold text-[var(--wsu-gray)]">Page &amp; appearance</h2>
      <p className="mt-1 text-sm text-[var(--wsu-gray-mid)]">
        Edit headings, blurbs, and colors for the public site, login page, and cards. Save once; changes apply everywhere.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-8">
        {banner ? <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">{banner}</p> : null}

        <fieldset className="space-y-3 border-0 p-0">
          <legend className="text-sm font-semibold text-[var(--wsu-gray)]">Header</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)]">
              Brand line 1
              <input name="brandLine1" required defaultValue={settings.brandLine1} className="mt-1 w-full rounded-lg border border-[var(--wsu-gray-light)] px-2 py-2 text-sm" />
            </label>
            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)]">
              Brand line 2
              <input name="brandLine2" required defaultValue={settings.brandLine2} className="mt-1 w-full rounded-lg border border-[var(--wsu-gray-light)] px-2 py-2 text-sm" />
            </label>
            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)] sm:col-span-2">
              Site title
              <input name="headerTitle" required defaultValue={settings.headerTitle} className="mt-1 w-full rounded-lg border border-[var(--wsu-gray-light)] px-2 py-2 text-sm" />
            </label>
            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)] sm:col-span-2">
              Site subtitle
              <input name="headerSubtitle" required defaultValue={settings.headerSubtitle} className="mt-1 w-full rounded-lg border border-[var(--wsu-gray-light)] px-2 py-2 text-sm" />
            </label>
          </div>
        </fieldset>

        <fieldset className="space-y-3 border-0 p-0">
          <legend className="text-sm font-semibold text-[var(--wsu-gray)]">Public page (home)</legend>
          <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)]">
            Section heading
            <input name="heroTitle" required defaultValue={settings.heroTitle} className="mt-1 w-full rounded-lg border border-[var(--wsu-gray-light)] px-2 py-2 text-sm" />
          </label>
          <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)]">
            Intro paragraph
            <textarea name="heroLede" required rows={3} defaultValue={settings.heroLede} className="mt-1 w-full resize-y rounded-lg border border-[var(--wsu-gray-light)] px-2 py-2 text-sm" />
          </label>
          <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)]">
            Empty state (no cards yet)
            <textarea name="emptyStateText" required rows={2} defaultValue={settings.emptyStateText} className="mt-1 w-full resize-y rounded-lg border border-[var(--wsu-gray-light)] px-2 py-2 text-sm" />
          </label>
        </fieldset>

        <fieldset className="space-y-3 border-0 p-0">
          <legend className="text-sm font-semibold text-[var(--wsu-gray)]">Manage page</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)] sm:col-span-2">
              “Add application” title
              <input name="manageAddTitle" required defaultValue={settings.manageAddTitle} className="mt-1 w-full rounded-lg border border-[var(--wsu-gray-light)] px-2 py-2 text-sm" />
            </label>
            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)] sm:col-span-2">
              “Add application” blurb
              <textarea name="manageAddBlurb" required rows={3} defaultValue={settings.manageAddBlurb} className="mt-1 w-full resize-y rounded-lg border border-[var(--wsu-gray-light)] px-2 py-2 text-sm" />
            </label>
            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)] sm:col-span-2">
              “Card order” title
              <input name="manageOrderTitle" required defaultValue={settings.manageOrderTitle} className="mt-1 w-full rounded-lg border border-[var(--wsu-gray-light)] px-2 py-2 text-sm" />
            </label>
            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)] sm:col-span-2">
              “Card order” blurb
              <textarea name="manageOrderBlurb" required rows={2} defaultValue={settings.manageOrderBlurb} className="mt-1 w-full resize-y rounded-lg border border-[var(--wsu-gray-light)] px-2 py-2 text-sm" />
            </label>
            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)] sm:col-span-2">
              Empty drag area message
              <input name="manageEmptyDragText" required defaultValue={settings.manageEmptyDragText} className="mt-1 w-full rounded-lg border border-[var(--wsu-gray-light)] px-2 py-2 text-sm" />
            </label>
          </div>
        </fieldset>

        <fieldset className="space-y-3 border-0 p-0">
          <legend className="text-sm font-semibold text-[var(--wsu-gray)]">Login page</legend>
          <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)]">
            Page title
            <input name="loginTitle" required defaultValue={settings.loginTitle} className="mt-1 w-full rounded-lg border border-[var(--wsu-gray-light)] px-2 py-2 text-sm" />
          </label>
          <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)]">
            Intro paragraph
            <textarea name="loginLede" required rows={3} defaultValue={settings.loginLede} className="mt-1 w-full resize-y rounded-lg border border-[var(--wsu-gray-light)] px-2 py-2 text-sm" />
          </label>
          <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)]">
            Back link label
            <input name="loginBackLabel" required defaultValue={settings.loginBackLabel} className="mt-1 w-full rounded-lg border border-[var(--wsu-gray-light)] px-2 py-2 text-sm" />
          </label>
        </fieldset>

        <fieldset className="space-y-3 border-0 p-0">
          <legend className="text-sm font-semibold text-[var(--wsu-gray)]">Colors (#RRGGBB)</legend>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(
              [
                ["colorPrimary", "Primary (buttons, brand)", settings.colorPrimary],
                ["colorPrimaryDark", "Primary hover / dark", settings.colorPrimaryDark],
                ["colorText", "Main text", settings.colorText],
                ["colorTextMuted", "Muted text", settings.colorTextMuted],
                ["colorBorder", "Borders", settings.colorBorder],
                ["colorPageBg", "Page background", settings.colorPageBg],
                ["colorCardBg", "Card background", settings.colorCardBg],
                ["colorCardAccent", "Card top stripe", settings.colorCardAccent],
                ["colorUrlOnCard", "URL text on cards", settings.colorUrlOnCard],
              ] as const
            ).map(([name, label, value]) => (
              <label key={name} className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)]">
                {label}
                <input
                  name={name}
                  type="text"
                  required
                  pattern="^#[0-9A-Fa-f]{6}$"
                  defaultValue={value}
                  className="mt-1 w-full rounded-lg border border-[var(--wsu-gray-light)] px-2 py-2 font-mono text-sm"
                />
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="space-y-3 border-0 p-0">
          <legend className="text-sm font-semibold text-[var(--wsu-gray)]">Cards</legend>
          <div className="flex flex-wrap gap-4">
            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)]">
              Corner radius (px)
              <input
                name="cardRadiusPx"
                type="number"
                min={4}
                max={32}
                required
                defaultValue={settings.cardRadiusPx}
                className="mt-1 block w-28 rounded-lg border border-[var(--wsu-gray-light)] px-2 py-2 text-sm"
              />
            </label>
            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--wsu-gray-mid)]">
              Shadow
              <select
                name="cardShadow"
                defaultValue={settings.cardShadow}
                className="mt-1 block rounded-lg border border-[var(--wsu-gray-light)] px-2 py-2 text-sm"
              >
                <option value="none">None</option>
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </label>
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-[var(--wsu-crimson)] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[var(--wsu-crimson-dark)] disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save page & appearance"}
        </button>
      </form>
    </section>
  );
}
