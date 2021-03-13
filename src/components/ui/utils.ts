export const px2rem = (value: number): string => `${value / 16}rem`;
export const getLineHeight = (fontSize: number): number => (Math.floor(fontSize / 8) + 1) * 8;
export const join = (...args: string[]): string => args.join(';');
