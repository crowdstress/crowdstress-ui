export const darken = (color: string, value: number): string => {
  if (color.length < 7 || color.indexOf('#') !== 0) return color;

  const sr = color.slice(1, 3);
  const sg = color.slice(3, 5);
  const sb = color.slice(5, 7);

  const r = parseInt(sr, 16);
  const g = parseInt(sg, 16);
  const b = parseInt(sb, 16);

  const dr = r - value > 0 ? r - value : 0;
  const dg = g - value > 0 ? g - value : 0;
  const db = b - value > 0 ? b - value : 0;

  return `#${dr.toString(16)}${dg.toString(16)}${db.toString(16)}`;
};
