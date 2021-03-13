import * as React from 'react';

import { EditorComponent } from '@/components/editor/EditorComponent';
import { EditorLoader } from '@/components/editor/EditorLoader';
import { useWasm } from '@/hooks/useWasm';

export const EditorWasmMiddleware: React.FC = () => {
  const [WasmProvider, wasm] = useWasm();
  const { state } = wasm;

  return <WasmProvider value={wasm}>
    { state === 'pending' && <EditorLoader>Loading WebAssembly...</EditorLoader> }
    { state === 'ready' && <EditorComponent /> }
    { state === 'error' && <EditorLoader>Error while loading WebAssembly</EditorLoader> }
  </WasmProvider>;
};
