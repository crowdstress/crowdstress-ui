export const getClassName = (...classNames: string[]): string =>
  classNames.reduce((acc, val, index) => {
    if (val) {
      acc += `${index > 0 ? ' ' : ''}${val}`;
    }
    return acc;
  }, '');
