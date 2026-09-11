# Attestcoin integration

Solar DePIN uses Attestcoin as the settlement path, not a wrapper.

## Flow

1. Buyer pays for an AI call-screening job on Ethereum Sepolia (`SolarSource`).
2. `prove.mjs` builds an Attestcoin proof of that Sepolia transaction.
3. `settle.mjs` calls `SolarSettlement.settleFromProof` on Creditcoin Testnet.
4. Credits unlock for the solar compute node.

No bridge. No oracle operator.

## Creditcoin precompile

Settlement is verified by Creditcoin's Block Prover precompile at `0x0FD2`.
`prove.mjs` pulls a Merkle inclusion proof plus a continuity proof of the Sepolia pay tx (chainKey 1).
`SolarSettlement.settleFromProof` submits that proof on-chain; the precompile checks both proofs in the same transaction.
`0x0FD3` (ChainInfo) is used only to wait until the Sepolia height is attested.
No bridge message and no oracle signature is trusted for the credit unlock.

## Proof parameters

- Source chain: Ethereum Sepolia
- chainKey: 1
- header: 11684276
- txIndex: 144
- Proof artifact: `proof.json`

## Live testnet

SolarSource (Sepolia):
https://sepolia.etherscan.io/address/0x3EB89f40d8DA5Da3C73F14A1fC6aEf22874baAFe

Pay tx:
https://sepolia.etherscan.io/tx/0xa21e0d78863233a2657eb2be16c63ad05df2d88ee54658279b1a1cc0db9d0d87

SolarSettlement (Creditcoin Testnet):
https://creditcoin-testnet.blockscout.com/address/0x3EB89f40d8DA5Da3C73F14A1fC6aEf22874baAFe

settleFromProof:
https://creditcoin-testnet.blockscout.com/tx/0x683bb43c3ded7ffeca722840b170b4753db621bfb418d11a8222b2b872beb1d3

## Run

```bash
node prove.mjs
PRIVATE_KEY=0x... node settle.mjs

