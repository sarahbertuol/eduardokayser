export function sx(str) {
  const obj = {};
  str.split(';').forEach(rule => {
    const idx = rule.indexOf(':');
    if (idx === -1) return;
    let prop = rule.slice(0, idx).trim();
    let val = rule.slice(idx + 1).trim();
    if (!prop || !val) return;
    if (!prop.startsWith('--')) {
      prop = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    }
    obj[prop] = val;
  });
  return obj;
}
