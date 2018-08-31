import Web3 from 'web3';
import { address, ABI } from './constants/escrowContract';

let getContract = new Promise(function(resolve, reject) {
  let web3 = new Web3(window.web3.currentProvider);
  let escrowContract = web3.eth.contract(ABI);
  let escrowContractInstance = escrowContract.at(address);
  resolve(escrowContractInstance);
});

export default getContract;
