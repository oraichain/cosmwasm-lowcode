import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';      
import { SimulateCosmWasmClient } from '@oraichain/cw-simulate';
import App from './App';

import './index.css';
import 'reactflow/dist/style.css';

window.client = new SimulateCosmWasmClient({ chainId: 'Oraichain', bech32Prefix: 'orai' });


fetch('/oraiswap_token.wasm')
  .then((res) => res.blob())
  .then((blob) => blob.arrayBuffer())
  .then((buffer) => window.client.upload('orai1hz4kkphvt0smw4wd9uusuxjwkp604u7m4akyzv', new Uint8Array(buffer), 'auto'))
  .then((data) => {
    window.codeId = data.codeId;
    createRoot(document.getElementById('root') as HTMLElement).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  });