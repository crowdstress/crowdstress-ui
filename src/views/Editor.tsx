import * as React from 'react';
import { ObjectsLayer } from '@/components/editor/ObjectsLayer';
import { useSelector } from 'react-redux';
import { getSnapToGrid } from '@/store/editor/params';
import { GridLayer } from '@/components/editor/GridLayer';
import { Toolbar } from '@/components/editor/Toolbar';
import { Menubar } from '@/components/editor/Menubar';
import { HumansLayer } from '@/components/editor/HumansLayer';
import { useWasm } from '@/hooks/useWasm';
import '@/styles/editor.scss';

export const Editor: React.FC = () => {
  const snapToGrid = useSelector(getSnapToGrid);
  const [WasmProvider, wasm] = useWasm();
  const { state } = wasm;

  return <div className="editor">
    <WasmProvider value={wasm}>
      {
        state === 'pending' &&
        <div className="editor__loader">
          Loading WebAssembly...
        </div>
      }
      {
        state === 'ready' &&
        <div className="editor__layout">
          <div className="editor__menubar">
            <Menubar/>
          </div>
          <div className="editor__toolbar">
            <Toolbar/>
          </div>
          <div className="editor__canvas">
            { snapToGrid && <GridLayer/> }
            <HumansLayer/>
            <ObjectsLayer/>
          </div>
        </div>
      }
    </WasmProvider>
  </div>;
};
