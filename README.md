# Solar DePIN

AI call screening compute network settled on Creditcoin with Attestcoin.

## Problem
Spam and unknown calls waste time. AI can screen them, but enterprises need verifiable payment and node rewards without a trusted operator.

## Solution
1. User pays for a screening job on Sepolia (`SolarSource`).
2. Attestcoin proves that payment on Creditcoin.
3. `SolarSettlement` unlocks credits for the compute node.

No Solana. Creditcoin is the settlement layer.

## Live testnet demo
- SolarSource (Sepolia): 0x3EB89f40d8DA5Da3C73F14A1fC6aEf22874baAFe
- SolarSettlement (Creditcoin Testnet): 0x3EB89f40d8DA5Da3C73F14A1fC6aEf22874baAFe
- Payment tx: https://sepolia.etherscan.io/tx/0xa21e0d78863233a2657eb2be16c63ad05df2d88ee54658279b1a1cc0db9d0d87
- Attestcoin settlement: https://creditcoin-testnet.blockscout.com/tx/0x683bb43c3ded7ffeca722840b170b4753db621bfb418d11a8222b2b872beb1d3

## Why this fits the hackathon
- Uses Attestcoin proof verification on Creditcoin
- DePIN + AI track: paid AI screening jobs
- Real cross-chain tx, not a mock

## Run
Open `index.html`.
Proof script: `node prove.mjs`
Settlement script: `PRIVATE_KEY=0x... node settle.mjs`
