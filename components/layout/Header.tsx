"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "next-themes";
import { SPORTS } from "@/lib/sec/sports";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <header className="bg-sec-navy/95 backdrop-blur-md text-white sticky top-0 z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Tagline */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-display text-2xl font-bold tracking-wider uppercase">
              <span className="text-sec-gold">SEC</span>
              <span className="text-white">Sports</span>
            </div>
            <div className="hidden lg:block w-px h-6 bg-white/20" />
            <span className="hidden lg:block text-[10px] uppercase tracking-[0.25em] text-sec-gold/70 font-medium">
              It Just Means More
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            <Link href="/scores" className="px-3 py-2 rounded-md text-sm font-semibold hover:bg-white/10 transition-colors text-sec-gold">
              Live Scores
            </Link>
            <div className="w-px h-4 bg-white/10" />
            {SPORTS.map((sport) => (
              <Link
                key={sport.slug}
                href={`/scores/${sport.slug}`}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors text-white/80 hover:text-white"
              >
                {sport.name}
              </Link>
            ))}
            <div className="w-px h-4 bg-white/10" />
            <Link href="/teams" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors text-white/80 hover:text-white">
              Teams
            </Link>
            <Link href="/videos" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors text-white/80 hover:text-white">
              Videos
            </Link>
            <Link href="/standings" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors text-white/80 hover:text-white">
              Standings
            </Link>
            <Link href="/news" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors text-white/80 hover:text-white">
              News
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-md hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-md hover:bg-white/10"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="md:hidden pb-4 border-t border-white/10 pt-3 space-y-1">
            <Link href="/scores" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-md text-sm font-semibold text-sec-gold hover:bg-white/10">
              Live Scores
            </Link>
            <div className="h-px bg-white/10 my-1" />
            {SPORTS.map((sport) => (
              <Link
                key={sport.slug}
                href={`/scores/${sport.slug}`}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-md text-sm hover:bg-white/10"
              >
                {sport.icon} {sport.name}
              </Link>
            ))}
            <div className="h-px bg-white/10 my-1" />
            <Link href="/teams" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-md text-sm hover:bg-white/10">Teams</Link>
            <Link href="/videos" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-md text-sm hover:bg-white/10">Videos</Link>
            <Link href="/standings" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-md text-sm hover:bg-white/10">Standings</Link>
            <Link href="/news" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-md text-sm hover:bg-white/10">News</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
