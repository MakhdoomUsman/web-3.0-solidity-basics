const { ethers } = require("hardhat");
const { assert, expect } = require("chai");
describe("SimpleStorage", () => {
  let simpleStorageFactory, SimpleStorage;
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    SimpleStorage = await simpleStorageFactory.deploy();
  });
  it("Should Start with a favourite number of 0", async function () {
    const currentValue = await SimpleStorage.retrieve();
    const expectedValue = "0";
    assert.equal(currentValue.toString(), expectedValue);
  });
});
