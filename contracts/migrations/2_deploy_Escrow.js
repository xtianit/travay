const Escrow = artifacts.require("./Escrow.sol");
const DAI = artifacts.require("./DAI.sol");

//const DAI_COIN_ADDRESS = "0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359";
const ARBITRATOR = "0xB06cEF6B14dd249f5a0977F645436cC4f4095325"; // DUMMY ADDRESS FOR ARBITRATOR/ TO BE CHANGED

module.exports = (deployer, network, accounts) => {
  deployer.deploy(DAI, {from:accounts[0]}).then(() => {
    return deployer.deploy(Escrow, DAI.address, accounts[8], {from: accounts[0]});
  });
};
