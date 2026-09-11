import { readFileSync } from "fs";
import { JsonRpcProvider, Wallet, Contract } from "ethers";

const ASC = "0x3EB89f40d8DA5Da3C73F14A1fC6aEf22874baAFe";
const CC_RPC = "https://rpc.cc3-testnet.creditcoin.network";
const ME = "0x148c10bC74cC3cFb8F99d48DeA90cbF7897Cc2e1";
const JOB = "0x0000000000000000000000000000000000000000000000000000000000000001";

const raw = JSON.parse(readFileSync("proof.json", "utf8"));
const p = raw.data || raw;

const abi = [
  "function settleFromProof((uint64 chainKey,uint64 blockHeight,bytes encodedTransaction,bytes32 merkleRoot,(bytes32 hash,bool isLeft)[] siblings,bytes32 lowerEndpointDigest,bytes32[] continuityRoots,address beneficiary,uint256 amount,bytes32 jobId) x)"
];

if (!process.env.PRIVATE_KEY) {
  console.error("Немає PRIVATE_KEY");
  process.exit(1);
}

const wallet = new Wallet(process.env.PRIVATE_KEY, new JsonRpcProvider(CC_RPC));
const c = new Contract(ASC, abi, wallet);

const x = {
  chainKey: p.chainKey,
  blockHeight: p.headerNumber,
  encodedTransaction: p.txBytes,
  merkleRoot: p.merkleProof.root,
  siblings: p.merkleProof.siblings,
  lowerEndpointDigest: p.continuityProof.lowerEndpointDigest,
  continuityRoots: p.continuityProof.roots,
  beneficiary: ME,
  amount: 1n,
  jobId: JOB
};

console.log("sending settleFromProof...");
const tx = await c.settleFromProof(x);
console.log("tx", tx.hash);
const rec = await tx.wait();
console.log("status", rec.status);
