const { ethers } = require("ethers");
const { contractAbi } = require("../contract ");
require("dotenv").config();

let provider;
let wallet;
let contract;

// Initialize blockchain components on demand
const initializeBlockchain = () => {
  try {
    if (!provider) {
      provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    }
    if (!wallet) {
      wallet = new ethers.Wallet(process.env.PRIVATE_KYE, provider);
    }
    if (!contract) {
      contract = new ethers.Contract(
        process.env.CONTRACT_ADDRESS,
        contractAbi,
        wallet
      );
    }
    return { provider, wallet, contract };
  } catch (err) {
    console.error("Blockchain initialization error:", err.message);
    throw new Error("Failed to initialize blockchain components: " + err.message);
  }
};

const mintCertificate = async (data) => {
  try {
    const { contract: contractInstance } = initializeBlockchain();

    const tx = await contractInstance.mintCertificate(
      process.env.WALLET_ADDRESS,
      data.reraPermit,
      data.propertyId,
      data.developerName,
      data.projectName,
      data.location,
      data.unitType,
      data.brokerCompany,
      data.listingId,
      data.verificationDate,
      data.verificationHash,
      data.tokenUri,
      data.expiresAt
    );
    const receipt = await tx.wait();

    return receipt;
  } catch (err) {
    console.error("Minting Error:", err);
    throw err;
  }
};

module.exports = { mintCertificate };