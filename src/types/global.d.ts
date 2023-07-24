import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';

declare global {
  interface Window {
    client: SigningCosmWasmClient;
    codeId: number;
  }
}

export {};
