import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-sec-navy text-white/70 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display text-white uppercase tracking-wider text-sm mb-4">Sports</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/scores/college-football" className="hover:text-white transition-colors">Football</Link></li>
              <li><Link href="/scores/mens-college-basketball" className="hover:text-white transition-colors">Basketball</Link></li>
              <li><Link href="/scores/college-baseball" className="hover:text-white transition-colors">Baseball</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-white uppercase tracking-wider text-sm mb-4">Content</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/news" className="hover:text-white transition-colors">News</Link></li>
              <li><Link href="/videos" className="hover:text-white transition-colors">Videos</Link></li>
              <li><Link href="/standings" className="hover:text-white transition-colors">Standings</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-white uppercase tracking-wider text-sm mb-4">Teams</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/teams" className="hover:text-white transition-colors">All Teams</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-white uppercase tracking-wider text-sm mb-4">SEC Sports</h3>
            <p className="text-sm">The definitive source for Southeastern Conference athletics.</p>
            <p className="text-xs mt-4 text-white/40">It Just Means More.</p>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-xs text-white/40">
          <p>Data provided by ESPN. This is an unofficial fan site.</p>
        </div>
      </div>
    </footer>
  );
}
