import { getLineHeight, px2rem } from '@/components/ui/utils';

type FontStyle = 'primary' | 'secondary';
type FontWeight = 'light' | 'regular' | 'semibold';

interface FontProps {
  fontSize: number;
  fontStyle: FontStyle;
  fontWeight: FontWeight;
}

const fontPrimary = 'font-family: \'Ubuntu\', sans-serif;' as const;

const fontLight = 'font-weight: 300;' as const;
const fontRegular = 'font-weight: 400;' as const;
const fontSemibold = 'font-weight: 500;' as const;

type FontStyleMixin = typeof fontPrimary;
type FontWeightMixin = typeof fontLight | typeof fontRegular | typeof fontSemibold;
type FontMixin = (size: number) => string;

export const font = ({ fontSize, fontStyle, fontWeight }: FontProps): string => {
  const size = `font-size: ${px2rem(fontSize)}`;

  const style = (): FontStyleMixin | '' => {
    if (fontStyle === 'primary') return fontPrimary;
    return '';
  };

  const weight = (): FontWeightMixin => {
    if (fontWeight === 'light') return fontLight;
    if (fontWeight === 'semibold') return fontSemibold;
    return fontRegular;
  };

  const lineHeight = `line-height: ${px2rem(getLineHeight(fontSize))}`;

  return [size, style(), weight(), lineHeight].join(';');
};

export const fontPrimaryLight: FontMixin = size => font({
  fontSize: size,
  fontStyle: 'primary',
  fontWeight: 'light',
});
export const fontPrimaryRegular: FontMixin = size => font({
  fontSize: size,
  fontStyle: 'primary',
  fontWeight: 'regular',
});
export const fontPrimarySemibold: FontMixin = size => font({
  fontSize: size,
  fontStyle: 'primary',
  fontWeight: 'semibold',
});
