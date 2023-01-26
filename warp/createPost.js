import { warp, configureWallet } from "./configureWarpServer.js";
import { transactionId } from "../transactionId.js";

import { v4 as uuid } from "uuid";

async function createPost() {
  let wallet = await configureWallet();
  const contract = warp.contract(transactionId).connect(wallet);

  await contract.writeInteraction({
    function: "createPost",
    post: {
      title: "FIRST POST",
      content: "This is a first post",
      id: uuid(),
    },
  });
}

createPost();
