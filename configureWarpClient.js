import { WarpFactory } from "warp-contracts";
import { transactionId } from "./transactionId";
import wallet from "./testwallet";

const environement = process.env.NEXT_PUBLIC_WARPENV || "testnet";
let warp;
let conract;

async function getContract() {
  if (environement == "testnet") {
    warp = WarpFactory.forTestnet();
    conract = warp.contract(transactionId).connect(wallet);
  } else if (environement == "mainnet") {
    warp = WarpFactory.forMainnet();
    conract = warp.contract(transactionId).connect();
  } else {
    throw new Error("Environement configured improperly...");
  }
  return conract;
}

export { getContract };
