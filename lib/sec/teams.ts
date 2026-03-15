export interface SecTeamInfo {
  name: string;
  slug: string;
  abbrev: string;
  color: string;
  altColor: string;
  location: string;
  mascot: string;
}

export const SEC_TEAMS: Record<number, SecTeamInfo> = {
  333: { name: "Alabama Crimson Tide", slug: "alabama", abbrev: "ALA", color: "9e1b32", altColor: "ffffff", location: "Alabama", mascot: "Crimson Tide" },
  8:   { name: "Arkansas Razorbacks", slug: "arkansas", abbrev: "ARK", color: "9d2235", altColor: "ffffff", location: "Arkansas", mascot: "Razorbacks" },
  2:   { name: "Auburn Tigers", slug: "auburn", abbrev: "AUB", color: "03244d", altColor: "f26522", location: "Auburn", mascot: "Tigers" },
  57:  { name: "Florida Gators", slug: "florida", abbrev: "FLA", color: "0021a5", altColor: "fa4616", location: "Florida", mascot: "Gators" },
  61:  { name: "Georgia Bulldogs", slug: "georgia", abbrev: "UGA", color: "ba0c2f", altColor: "000000", location: "Georgia", mascot: "Bulldogs" },
  96:  { name: "Kentucky Wildcats", slug: "kentucky", abbrev: "UK", color: "0033a0", altColor: "ffffff", location: "Kentucky", mascot: "Wildcats" },
  99:  { name: "LSU Tigers", slug: "lsu", abbrev: "LSU", color: "461d7c", altColor: "fdd023", location: "LSU", mascot: "Tigers" },
  145: { name: "Ole Miss Rebels", slug: "ole-miss", abbrev: "MISS", color: "14213d", altColor: "ce1126", location: "Ole Miss", mascot: "Rebels" },
  344: { name: "Mississippi State Bulldogs", slug: "mississippi-state", abbrev: "MSST", color: "660000", altColor: "ffffff", location: "Mississippi State", mascot: "Bulldogs" },
  142: { name: "Missouri Tigers", slug: "missouri", abbrev: "MIZ", color: "f1b82d", altColor: "000000", location: "Missouri", mascot: "Tigers" },
  201: { name: "Oklahoma Sooners", slug: "oklahoma", abbrev: "OU", color: "841617", altColor: "ffffff", location: "Oklahoma", mascot: "Sooners" },
  2579: { name: "South Carolina Gamecocks", slug: "south-carolina", abbrev: "SC", color: "73000a", altColor: "000000", location: "South Carolina", mascot: "Gamecocks" },
  2633: { name: "Tennessee Volunteers", slug: "tennessee", abbrev: "TENN", color: "ff8200", altColor: "ffffff", location: "Tennessee", mascot: "Volunteers" },
  251: { name: "Texas Longhorns", slug: "texas", abbrev: "TEX", color: "bf5700", altColor: "ffffff", location: "Texas", mascot: "Longhorns" },
  245: { name: "Texas A&M Aggies", slug: "texas-am", abbrev: "TAMU", color: "500000", altColor: "ffffff", location: "Texas A&M", mascot: "Aggies" },
  238: { name: "Vanderbilt Commodores", slug: "vanderbilt", abbrev: "VAN", color: "866d4b", altColor: "000000", location: "Vanderbilt", mascot: "Commodores" },
};

export const SEC_TEAM_IDS = Object.keys(SEC_TEAMS).map(Number);

export function findSecTeamBySlug(slug: string): (SecTeamInfo & { id: number }) | null {
  for (const [id, team] of Object.entries(SEC_TEAMS)) {
    if (team.slug === slug) {
      return { ...team, id: Number(id) };
    }
  }
  return null;
}

export function isSecTeam(teamId: number): boolean {
  return SEC_TEAM_IDS.includes(teamId);
}
