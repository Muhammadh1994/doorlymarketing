export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="scene-copy">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <a href="#top" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
              <span className="flex size-8 items-center justify-center rounded-full bg-postal-red text-postal-red-foreground">
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 8.5 12 14l9-5.5" />
                  <rect x="3" y="5" width="18" height="14" rx="1.5" />
                </svg>
              </span>
              Doorly Marketing
            </a>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Shared postcard advertising for local businesses, mailed directly
              to households through USPS.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm sm:flex sm:gap-16">
            <div>
              <p className="font-medium text-foreground">Service area</p>
              <p className="mt-2 text-muted-foreground">
                [Service area — pending client details]
              </p>
            </div>
            <div>
              <p className="font-medium text-foreground">Contact</p>
              <p className="mt-2 text-muted-foreground">
                [Phone number — pending]
              </p>
              <p className="text-muted-foreground">
                [Email address — pending]
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-foreground/15 pt-6 text-xs text-muted-foreground">
          © {year} Doorly Marketing. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
