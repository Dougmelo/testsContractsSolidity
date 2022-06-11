const { expect } = require("chai");
const { ethers } = require("hardhat");

    let Token2;
    let Airdrop;
    let hardhatAirdrop;
    let hardhatCryptoToken;
    let ownerBalance;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function () {
      [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
      Token2 = await ethers.getContractFactory("CryptoToken");
      Airdrop =  await ethers.getContractFactory("Airdrop");
      hardhatCryptoToken = await Token2.deploy(1000);
      hardhatAirdrop = await Airdrop.deploy(hardhatCryptoToken.address);
      ownerBalance = await hardhatCryptoToken.balanceOf(owner.address);
      console.log("carteira valor: " + ownerBalance);
    });

    describe("Airdrop TokenAdress", function () {
      it("Deployment should assign the total supply of tokens to the totalSupply", async function () {
           expect(await hardhatCryptoToken.address).to.equal( await hardhatAirdrop.getTokenAddress());
      });
    });

    describe("Subscribe function", function () {
      it("Deployment should assign the total supply of tokens to the totalSupply", async function () {
          await hardhatAirdrop.subscribe(addr1.address);
          expect(await hardhatAirdrop.getSubscribed(addr1.address)).to.equal(true);
      });
    });

    describe("Execult", function () {
      it("Deployment should assign the total supply of tokens to the totalSupply", async function () {
          await hardhatAirdrop.subscribe(addr1.address);
          await hardhatAirdrop.subscribe(addr2.address);
          await hardhatCryptoToken.transfer(hardhatAirdrop.address, 100);
          await hardhatAirdrop.execute();
          expect(await hardhatCryptoToken.balanceOf(addr1.address)).to.equal(50);
          expect(await hardhatCryptoToken.balanceOf(addr2.address)).to.equal(50);
      });
   });




