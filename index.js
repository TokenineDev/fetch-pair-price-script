import { Contract, ethers, constants } from "ethers";
import Big from "big.js";
import fs from "fs";

const FACTORY_ABI = JSON.parse(fs.readFileSync("./abi/factory_abi.json"));
const PAIR_ABI = JSON.parse(fs.readFileSync("./abi/pair_abi.json"));

const FACTORY_ADDRESS = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";
const TOKEN_0_ADDRESS = "0x2170Ed0880ac9A755fd29B2688956BD959F933F8"; // ETH
const TOKEN_1_ADDRESS = "0xe9e7cea3dedca5984780bafc599bd69add087d56"; // BUSD

const provider = new ethers.providers.JsonRpcProvider(
  "https://bsc-dataseed.binance.org/"
);

const fetchPairData = async () => {
  // get pair form factory
  const contract = new Contract(FACTORY_ADDRESS, FACTORY_ABI, provider);
  const pairAddress = await contract.getPair(TOKEN_0_ADDRESS, TOKEN_1_ADDRESS);
  if (pairAddress === constants.AddressZero) {
    console.log("No pair");
    return;
  }

  const pairContract = new Contract(pairAddress, PAIR_ABI, provider);
  const [reserves0, reserves1] = await pairContract.getReserves();

  // convert to big number
  const reservers0big = new Big(reserves0.toString());
  const reservers1big = new Big(reserves1.toString());

  // calculate rate
  const priceToken0 = reservers1big.div(reservers0big);
  const priceToken1 = reservers0big.div(reservers1big);

  // check token0 token1 order
  const token0 = await pairContract.token0();
  const tag0 =
    token0.toLowerCase() === TOKEN_0_ADDRESS.toLowerCase()
      ? "Token0:Token1"
      : "Token1:Token0";
  const tag1 =
    token0.toLowerCase() !== TOKEN_0_ADDRESS.toLowerCase()
      ? "Token0:Token1"
      : "Token1:Token0";

  console.log(`Price (${tag0}):`, priceToken0.toString());
  console.log(`Price (${tag1}):`, priceToken1.toString());
};

fetchPairData();
