import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/lib/site-data";

export function Logo({
  settings,
  className,
}: {
  settings: SiteSettings | null;
  className?: string;
}) {
  const url = settings?.logo_url || settings?.logo_mark_url;
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center rounded-full p-[2px]",
        "gold-gradient shadow-[0_4px_24px_-8px_rgba(201,163,78,0.55)]",
        className,
      )}
    >
      <div className="flex h-full w-full items-center justify-center rounded-full bg-[var(--background)]">
        {url ? (
          <img
            src={url}
            alt={settings?.business_name ?? "Logo"}
            className="h-[78%] w-[78%] object-contain"
            loading="eager"
          />
        ) : (
          <span className="font-display text-lg text-[var(--burgundy)]">MA</span>
        )}
      </div>
    </div>
  );
}
