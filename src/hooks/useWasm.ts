import {
  createContext,
  useState,
  useContext,
  useEffect,
  Provider
} from 'react';

export type WASM_STATE = 'error' | 'pending' | 'ready';
export type CrowdstressWasm = typeof import('@crowdstress/wasm');
interface WasmObject {
  state: WASM_STATE;
  wasm: CrowdstressWasm | null;
}

const defaultWasmObject: WasmObject = {
  state: 'pending',
  wasm: null,
};

export const wasmContext = createContext<WasmObject>(defaultWasmObject);

export const useWasm = (): [Provider<WasmObject>, WasmObject] => {
  const [wasm, setWasm] = useState<WasmObject>(defaultWasmObject);

  useEffect(() => {
    const loadWasm = async (): Promise<void> => {
      try {
        const wasm = await import('@crowdstress/wasm');
        setWasm({
          state: 'ready',
          wasm,
        });
      } catch (e) {
        console.error(e);
        setWasm({
          state: 'error',
          wasm: null,
        });
      }
    };

    loadWasm();
  }, []);

  return [wasmContext.Provider, wasm];
};

export const useLoadedWasm = (): WasmObject => {
  const { wasm, state } = useContext(wasmContext);
  return {
    state: state,
    wasm,
  };
};
