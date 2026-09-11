import { JsonRpcProvider } from "ethers";
import { chainInfo, proofProvider } from "@gluwa/usc-sdk";

const TX = "0xa21e0d78863233a2657eb2be16c63ad05df2d88ee54658279b1a1cc0db9d0d87";
const CHAIN_KEY = 1;
const BLOCK = 11684276n;
const CC_RPC = "https://rpc.cc3-testnet.creditcoin.network";
const PROOF_URL = "https://prover.cc3-testnet.creditcoin.network";

const cc = new JsonRpcProvider(CC_RPC);
const info = new chainInfo.PrecompileChainInfoProvider(cc);
const builder = new proofProvider.service.ProofBuilder(CHAIN_KEY, PROOF_URL);

console.log("1) wait attestation...");
await info.waitUntilHeightAttested(CHAIN_KEY, BLOCK);
console.log("2) get proof...");
const result = await builder.getProof(TX);
console.log(JSON.stringify(result, null, 2));
