import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

export const useUpdate = (effect: EffectCallback, deps?: DependencyList): void => {
  const initialRender = useRef(true);

  useEffect((): void => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      effect();
    }
  }, deps);
};
