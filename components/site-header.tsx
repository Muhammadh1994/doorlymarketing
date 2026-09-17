"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#ad-space", label: "Ad space" },
  { href: "#reach", label: "Pricing & reach" },
  { href: "#get-your-ad-space", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <span className="flex size-8 items-center justify-center rounded-full bg-postal-red text-postal-red-foreground">
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 8.5 12 14l9-5.5" />
              <rect x="3" y="5" width="18" height="14" rx="1.5" />
            </svg>
          </span>
          Doorly Marketing
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            render={<a href="#get-your-ad-space" />}
            nativeButton={false}
            className="bg-postal-red text-postal-red-foreground hover:bg-postal-red/90"
          >
            Reserve Your Ad Space
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex size-9 items-center justify-center rounded-md border border-border md:hidden"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "overflow-hidden border-t border-border bg-background transition-[grid-template-rows] duration-200 ease-out md:hidden",
          "grid",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="min-h-0">
          <nav className="flex flex-col gap-1 px-4 py-3 sm:px-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm font-medium text-foreground/90 hover:bg-muted"
              >
                {link.label}
              </a>
            ))}
            <Button
              render={<a href="#get-your-ad-space" onClick={() => setOpen(false)} />}
              nativeButton={false}
              className="mt-2 bg-postal-red text-postal-red-foreground hover:bg-postal-red/90"
            >
              Reserve Your Ad Space
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
