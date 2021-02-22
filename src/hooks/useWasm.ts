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
  wasm: CrowdstressWasm | null;
  state: WASM_STATE;
}

const defaultWasmObject: WasmObject = {
  wasm: null,
  state: 'pending',
};

export const wasmContext = createContext<WasmObject>(defaultWasmObject);

export const useWasm = (): [Provider<WasmObject>, WasmObject] => {
  const [wasm, setWasm] = useState<WasmObject>(defaultWasmObject);

  useEffect(() => {
    const loadWasm = async (): Promise<void> => {
      try {
        const wasm = await import('@crowdstress/wasm');
        setWasm({
          wasm,
          state: 'ready',
        });
      } catch (e) {
        console.error(e);
        setWasm({
          wasm: null,
          state: 'error',
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
    wasm,
    state: state,
  };
};
