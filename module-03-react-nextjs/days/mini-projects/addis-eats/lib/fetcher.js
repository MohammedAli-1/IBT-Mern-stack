// Shared fetcher for SWR — throws on non-ok responses so SWR populates error
export async function fetcher(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error("Fetch failed");
    error.status = res.status;
    error.info = await res.json().catch(() => ({}));
    throw error;
  }
  return res.json();
}
