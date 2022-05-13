import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(
  "https://data-seed-prebsc-1-s1.binance.org:8545/"
);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY); // private key fee wallet
const signer = wallet.connect(provider);

const ABI = ["function approve(address,uint256) external returns (bool)"];

const SPENDER_CONTRACT_ADDRESS = "0xb8e729cc6a4596676cbb67dd0f7bb4f1f3c77004";

const TOKEN_ADDRESS = "0xDAbb42B832EaF33a26cB4e92cD2c7e18364094ad";

const tokenContract = new ethers.Contract(TOKEN_ADDRESS, ABI, signer);

const approve = async () => {
  try {
    await tokenContract.approve(
      SPENDER_CONTRACT_ADDRESS,
      ethers.constants.MaxUint256
    );
  } catch (err) {
    console.error(err);
  }
};
approve();
