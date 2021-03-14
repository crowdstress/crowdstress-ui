import { join } from '@/components/ui/utils';

const flx = 'display: flex;' as const;

// const row = 'flex-direction: row;' as const;
const col = 'flex-direction: column; min-height: 0;' as const;

// const aifs = 'align-items: flex-start;' as const;
const aic = 'align-items: center;' as const;
const ais = 'align-items: stretch;' as const;

const jcfs = 'justify-content: flex-start;' as const;
// const jcfe = 'justify-content: flex-end;' as const;
const jcsb = 'justify-content: space-between;' as const;
const jcc = 'justify-content: center;' as const;

export const flxCol = join(flx, col);
export const flxAic = join(flx, aic);
export const flxAis = join(flx, ais);
export const flxJcc = join(flx, jcc);
export const flxJcsb = join(flx, jcsb);

export const flxAicJcc = join(flx, aic, jcc);
export const flxAicJsb = join(flx, aic, jcsb);
export const flxAicJcfs = join(flx, aic, jcfs);
