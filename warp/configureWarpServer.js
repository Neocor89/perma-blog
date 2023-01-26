import { WarpFactory } from "warp-contracts";
import fs from "fs";

const environement = process.env.WARPENV || "testnet";
let warp;

if (environement === "testnet") {
  warp = WarpFactory.forTestnet();
} else if (environement === "mainnet") {
  warp = WarpFactory.forMainnet();
} else {
  throw new Error("Environement not set properly...");
}

async function configureWallet() {
  try {
    if (environement === "testnet") {
      try {
        return JSON.parse(fs.readFileSync("../testwallet.json", "utf-8"));
      } catch (err) {
        const { jwk } = await warp.generateWallet();
        fs.writeFileSync("../testwallet.json", JSON.stringify(jwk));
        return jwk;
      }
    } else {
      return JSON.parse(fs.readFileSync("../wallet.json", "utf-8"));
    }
  } catch (err) {
    console.log("Error configuration Wallet: " + err);
  }
}

export { configureWallet, warp };
