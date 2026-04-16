import { cookies } from "next/headers";
import Link from "next/link";
import type { SiteSettingsRow } from "@/lib/schema";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";
import { logoutAction } from "@/app/actions/auth";

type Props = {
  settings: SiteSettingsRow;
};

export async function SiteHeader({ settings }: Props) {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  const signedIn = token ? await verifySessionToken(token) : false;

  return (
    <>
      <div
        className="h-1.5 w-full bg-gradient-to-r from-[var(--wsu-crimson)] from-[40%] to-[var(--wsu-gray-mid)] to-[40%]"
        aria-hidden
      />
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--wsu-gray-light)] bg-white px-5 py-4">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <div className="grid h-11 w-11 place-items-center rounded-lg bg-[var(--wsu-crimson)] text-center text-[0.65rem] font-bold leading-tight tracking-wide text-white">
            {settings.brandLine1}
            <br />
            {settings.brandLine2}
          </div>
          <div>
            <h1 className="m-0 text-lg font-bold text-[var(--wsu-gray)]">{settings.headerTitle}</h1>
            <p className="m-0 mt-0.5 text-xs font-medium text-[var(--wsu-gray-mid)]">
              {settings.headerSubtitle}
            </p>
          </div>
        </Link>
        <nav className="flex items-center gap-3">
          {signedIn ? (
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-full border border-[var(--wsu-gray-light)] bg-white px-4 py-2 text-sm font-semibold text-[var(--wsu-gray)] hover:bg-[var(--wsu-bg)]"
              >
                Sign out
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-[var(--wsu-crimson)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--wsu-crimson-dark)]"
            >
              Admin login
            </Link>
          )}
        </nav>
      </header>
    </>
  );
}
