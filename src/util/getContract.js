import Web3 from 'web3';
// https://itnext.io/create-your-first-ethereum-dapp-with-web3-and-vue-js-part-3-dc4f82fba4b4
import { address, ABI } from './constants/escrowContract';
// import { address, ABI } from './constants/colonyNetworkContract';

let getContract = new Promise(function(resolve, reject) {
  let web3 = new Web3(window.web3.currentProvider);
  let escrowContract = web3.eth.contract(ABI);
  let escrowContractInstance = escrowContract.at(address);
  console.log(escrowContract);
  console.log(escrowContractInstance);
  resolve(escrowContractInstance);

  // let colonyNetworkContract = web3.eth.contract(ABI);
  // let colonyNetworkContract = colonyNetworkContract.at(address);
  // console.log(colonyNetworkContract);
  // console.log(colonyNetworkContractInstance);
  // resolve(colonyNetworkContractInstance);
});

export default getContract;
