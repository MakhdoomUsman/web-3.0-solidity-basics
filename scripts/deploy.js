const { run, network } = require("hardhat");
// require("@nomicfoundation/hardhat-ethers");
async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying Contract...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  // await simpleStorage.deployed();
  // await simpleStorage.deployTransaction.wait(6);
  console.log("Depoyed ", await simpleStorage.getAddress());
  console.log("network", network.config);
  if (network.config.chainId == 11155111 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deploymentTransaction().wait(6);
    await verify(await simpleStorage?.getAddress(), []);
  }

  const currentValue = await simpleStorage.retrieve();
  console.log("Current Value ...", currentValue);
  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log("Update Value is ...", updatedValue);
  // await simpleStorage.deployed();
  //
}
async function verify(contractAddress, args) {
  console.log("Verifieying Contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("ALready Verifeid!");
    } else {
      console.log(e);
    }
  }
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("runing type error", error);
    process.exit(1);
  });
