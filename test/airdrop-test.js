/*const { expect } = require("chai");
const { ethers } = require("hardhat");

    let Token;
    let Airdrop;
    let hardhatAirdrop;
    let ownerBalance;
    let owner;
    let addr1;
    let addr2;
    let addrs;

beforeEach(async function () {
  //  Token = await ethers.getContractFactory("CryptoToken");
    Airdrop =  await ethers.getContractFactory("Airdrop");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    hardhatAirdrop = await Airdrop.deploy("0x70997970C51812dc3A010C7d01b50e0d17dc79C8");
    ownerBalance = await hardhatAirdrop.balanceOf(owner.address);
  });



  /*describe("Deployment Airdrop", function () {
    it("Should set the right owner", async function () {
      // Expects the owner variable stored in the contract to be equal to our Signer's owner.
      expect(await hardhatAirdrop.getOwner()).to.equal(owner.address);
    });
});*/

/*describe("Airdrop TokenAdress", function () {
    it("Deployment should assign the total supply of tokens to the totalSupply", async function () {
      
      console.log("Token Adress: " +  Token.address);
      console.log("Airdrop Addres: " + Airdrop.address);
      expect(await Token.address).to.equal(Airdrop.address);
    });
});*/

