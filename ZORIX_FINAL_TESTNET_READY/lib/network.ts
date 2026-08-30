export const BSC_TESTNET = {
  chainIdHex: '0x61',
  chainId: 97,
  chainName: 'BNB Smart Chain Testnet',
  nativeCurrency: { name: 'tBNB', symbol: 'tBNB', decimals: 18 },
  rpcUrls: ['https://data-seed-prebsc-1-s1.bnbchain.org:8545/'],
  blockExplorerUrls: ['https://testnet.bscscan.com/'],
};

export function shortAddress(value: string) {
  return value ? `${value.slice(0, 6)}...${value.slice(-4)}` : '';
}

export function isEvmAddress(value: string) {
  return /^0x[a-fA-F0-9]{40}$/.test(value.trim());
}
