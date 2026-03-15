const ESPN_BASE = "https://site.api.espn.com/apis";

export async function espnFetch<T>(
  path: string,
  params?: Record<string, string>,
  options?: { revalidate?: number }
): Promise<T> {
  const url = new URL(`${ESPN_BASE}/${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: options?.revalidate ?? 60 },
  });

  if (!res.ok) {
    throw new Error(`ESPN API error: ${res.status} for ${path}`);
  }

  return res.json();
}

export async function espnFetchV2<T>(
  path: string,
  params?: Record<string, string>,
  options?: { revalidate?: number }
): Promise<T> {
  const url = new URL(`https://site.api.espn.com/apis/v2/${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: options?.revalidate ?? 60 },
  });

  if (!res.ok) {
    throw new Error(`ESPN API v2 error: ${res.status} for ${path}`);
  }

  return res.json();
}
