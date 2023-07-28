import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SimulateCosmWasmClient } from '@oraichain/cw-simulate';
import App from './App';

import './index.css';
import 'reactflow/dist/style.css';
import { OraiswapTokenClient } from '@oraichain/oraidex-contracts-sdk';

const sender = 'orai1hz4kkphvt0smw4wd9uusuxjwkp604u7m4akyzv';
window.client = new SimulateCosmWasmClient({ chainId: 'Oraichain', bech32Prefix: 'orai', metering: true });

fetch('/oraiswap_token.wasm')
  .then((res) => res.blob())
  .then((blob) => blob.arrayBuffer())
  .then((buffer) => window.client.upload('orai1hz4kkphvt0smw4wd9uusuxjwkp604u7m4akyzv', new Uint8Array(buffer), 'auto'))
  .then(async (data) => {
    window.codeId = data.codeId;
    const { contractAddress, gasUsed } = await window.client.instantiate(
      sender,
      window.codeId,
      {
        decimals: 6,
        name: 'cw20 orai',
        symbol: 'orai',
        initial_balances: [
          {
            address: 'orai1hz4kkphvt0smw4wd9uusuxjwkp604u7m4akyzv',
            amount: '10000000'
          },
          {
            address: 'orai12zyu8w93h0q2lcnt50g3fn0w3yqnhy4fvawaqz',
            amount: '20000000'
          }
        ]
      },
      'oraichain token',
      'auto'
    );
    window.tokenContract = new OraiswapTokenClient(window.client, sender, contractAddress);
    createRoot(document.getElementById('root') as HTMLElement).render(
      <StrictMode>
        <App title={`Gas Used: ${gasUsed}`} />
      </StrictMode>
    );
  });
