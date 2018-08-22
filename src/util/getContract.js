import Web3 from 'web3';
// https://itnext.io/create-your-first-ethereum-dapp-with-web3-and-vue-js-part-3-dc4f82fba4b4
import { address, ABI } from './constants/escrowContract';

let getContract = new Promise(function(resolve, reject) {
  let web3 = new Web3(window.web3.currentProvider);
  let escrowContract = web3.eth.contract(ABI);
  let escrowContractInstance = escrowContract.at(address);
  resolve(escrowContractInstance);
});

export default getContract;
