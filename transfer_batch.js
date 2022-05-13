import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(
  "https://data-seed-prebsc-1-s1.binance.org:8545/"
);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY); // private key fee wallet
const signer = wallet.connect(provider);

const ABI = ["function batchTokensTransfer(address,address[],uint256[])"];

const CONTRACT_ADDRESS = "0xb8e729cc6a4596676cbb67dd0f7bb4f1f3c77004";

const TOKEN_ADDRESS = "0xDAbb42B832EaF33a26cB4e92cD2c7e18364094ad";

const transferContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

const transfer = async () => {
  try {
    await transferContract.batchTokensTransfer(
      TOKEN_ADDRESS,
      ["0x626939e224FbD56F5DE5b244dC04f8a1cEF40613"],
      [ethers.utils.parseEther("1")]
    );
  } catch (err) {
    console.error(err);
  }
};
transfer();
