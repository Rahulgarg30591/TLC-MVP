export async function apiJson(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const error = new Error('An error occured while fetching the data');
    error.code = res.status;
    error.info = await res.json();
    throw error;
  }
  return res.json();
}

export function omitEmptyFilters(filters = {}) {
  const next = { ...filters };
  Object.keys(next).forEach((key) => {
    const val = next[key];
    if (val === 'all' || val === '' || val?.orderBy === 'none') {
      delete next[key];
    }
  });
  return next;
}
