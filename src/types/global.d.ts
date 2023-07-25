import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { OraiswapTokenClient } from '@oraichain/oraidex-contracts-sdk';

declare global {
  interface Window {
    client: SigningCosmWasmClient;
    tokenContract: OraiswapTokenClient;
    codeId: number;
  }
}

export {};
