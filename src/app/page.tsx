import { AppTile } from "@/components/AppTile";
import { DbSetupHint } from "@/components/DbSetupHint";
import { SiteHeader } from "@/components/SiteHeader";
import { listAppsOrdered } from "@/lib/apps";
import { getSiteSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const settings = await getSiteSettings();

  let apps;
  try {
    apps = await listAppsOrdered();
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return (
      <>
        <SiteHeader settings={settings} />
        <DbSetupHint message={message} />
      </>
    );
  }

  return (
    <>
      <SiteHeader settings={settings} />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="mb-2 text-2xl font-bold text-[var(--wsu-gray)]">{settings.heroTitle}</h2>
        <p className="mb-8 max-w-2xl whitespace-pre-wrap text-sm text-[var(--wsu-gray-mid)]">
          {settings.heroLede}
        </p>
        {apps.length === 0 ? (
          <p className="rounded-[length:var(--wsu-card-radius,10px)] border border-dashed border-[var(--wsu-gray-light)] bg-white py-12 text-center text-sm text-[var(--wsu-gray-mid)]">
            {settings.emptyStateText}
          </p>
        ) : (
          <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((app) => (
              <li key={app.id}>
                <AppTile app={app} href={app.url} />
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
