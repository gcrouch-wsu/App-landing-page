/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

type BrandLockupProps = {
  brandLine1: string;
  brandLine2: string;
  headerTitle: string;
  headerSubtitle?: string | null;
  headerTitleSizePx?: number | null;
  logoUrl?: string | null;
  logoAlt?: string | null;
  href?: string;
  className?: string;
};

function BrandMark({
  brandLine1,
  brandLine2,
  headerTitle,
  logoUrl,
  logoAlt,
}: Omit<BrandLockupProps, "className" | "headerSubtitle" | "href">) {
  if (logoUrl) {
    return (
      <div className="flex min-w-0 max-w-[9rem] items-center sm:max-w-[10.5rem] lg:max-w-[12rem]">
        <img
          src={logoUrl}
          alt={logoAlt || (headerTitle.trim() ? `${headerTitle} logo` : "Site logo")}
          className="block max-h-14 w-auto max-w-full object-contain sm:max-h-16"
        />
      </div>
    );
  }

  const line1 = brandLine1.trim();
  const line2 = brandLine2.trim();

  if (!line1 && !line2) return null;

  return (
    <div className="flex min-w-0 items-stretch gap-3">
      <span className="w-1 shrink-0 rounded-full bg-[var(--wsu-crimson)]/85" aria-hidden />
      <div className="min-w-0 py-0.5">
        {line1 ? (
          <p className="text-[0.62rem] font-bold uppercase leading-none tracking-[0.28em] text-[var(--wsu-crimson)]">
            {line1}
          </p>
        ) : null}
        {line2 ? (
          <p className="text-[0.62rem] font-bold uppercase leading-none tracking-[0.28em] text-[var(--wsu-gray-mid)]">
            {line2}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function BrandLockup({
  brandLine1,
  brandLine2,
  headerTitle,
  headerSubtitle,
  headerTitleSizePx,
  logoUrl,
  logoAlt,
  href,
  className = "",
}: BrandLockupProps) {
  const hasMark = Boolean(logoUrl || brandLine1.trim() || brandLine2.trim());
  const hasTitle = Boolean(headerTitle.trim());
  const hasSubtitle = Boolean(headerSubtitle?.trim());

  if (!hasMark && !hasTitle && !hasSubtitle) {
    return null;
  }

  const content = (
    <div
      className={`grid min-w-0 max-w-full gap-3 ${
        hasMark && (hasTitle || hasSubtitle)
          ? "sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center sm:gap-4"
          : ""
      } ${className}`.trim()}
    >
      {hasMark ? (
        <BrandMark
          brandLine1={brandLine1}
          brandLine2={brandLine2}
          headerTitle={headerTitle}
          logoUrl={logoUrl}
          logoAlt={logoAlt}
        />
      ) : null}
      {hasTitle || hasSubtitle ? (
        <div className="min-w-0 max-w-full">
          {hasTitle ? (
            <div
              className="max-w-full font-bold leading-[1.08] text-[var(--wsu-gray)] text-pretty"
              style={{
                fontSize: `${Math.min(40, Math.max(18, headerTitleSizePx ?? 28))}px`,
              }}
            >
              {headerTitle}
            </div>
          ) : null}
          {hasSubtitle ? (
            <p
              className={`max-w-full text-sm font-medium text-[var(--wsu-gray-mid)] text-pretty ${
                hasTitle ? "mt-1" : ""
              }`.trim()}
            >
              {headerSubtitle}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );

  if (!href) return content;

  return (
    <Link href={href} className="no-underline">
      {content}
    </Link>
  );
}
