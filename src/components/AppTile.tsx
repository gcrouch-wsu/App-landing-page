import type { AppCard } from "@/lib/schema";

type TileProps = {
  app: AppCard;
  /** When set, the whole card is a link opening in a new tab */
  href?: string;
  className?: string;
};

export function AppTile({ app, href, className = "" }: TileProps) {
  const inner = (
    <>
      <div
        className="h-1 w-full rounded-t-[length:var(--wsu-card-radius,10px)] bg-[var(--wsu-card-accent)]"
        aria-hidden
      />
      <div className="p-4 pt-3">
        <h2 className="text-base font-bold text-[var(--wsu-gray)]">{app.title}</h2>
        <p className="mt-1 break-all text-xs font-medium text-[var(--wsu-url-on-card)]">{app.url}</p>
        {app.description ? (
          <p className="mt-2 text-sm leading-snug text-[var(--wsu-gray-mid)]">{app.description}</p>
        ) : null}
      </div>
    </>
  );

  const shell = `block rounded-[length:var(--wsu-card-radius,10px)] bg-[var(--wsu-card-bg,#fff)] ring-1 ring-black/5 transition hover:opacity-[0.98] ${className}`;

  const shadowStyle = { boxShadow: "var(--wsu-card-shadow,0 4px 14px rgba(0,0,0,0.08))" };

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={shell} style={shadowStyle}>
        {inner}
      </a>
    );
  }

  return (
    <div className={shell} style={shadowStyle}>
      {inner}
    </div>
  );
}
