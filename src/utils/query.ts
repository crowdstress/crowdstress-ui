export type Query<T extends number | string | boolean = number | string | boolean> = Record<string, T | null | undefined>;

const notUndefinedOrNullSecondItem = <E, T>(x: [E, T | undefined | null]): x is [E, T] => {
  const [/*a*/, b] = x;
  return !!b;
};

export const queryToString = <T extends number | string | boolean>(query: Query<T>, prefix: string = '?', separator: string = '&'): string => {
  const pairs = Object.entries(query).filter(notUndefinedOrNullSecondItem);
  if (pairs.length === 0) {
    return '';
  }
  const items = pairs.map((item) => {
    return item.map(encodeURIComponent).join('=');
  });
  return prefix + items.join(separator);
};
