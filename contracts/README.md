# Escrow Smart Contract

Main Network Contract: https://etherscan.io/address/0xfa1909f6fe2120e3aa4a63883776250ba5042b60#code

Ropsten Network Contract:

Ropsten DAI Token: 0xee3ea3cd9afd7cb2c476d44a70fc9ed4cd3ba438

## Build Contracts
```
cd contracts

rm -rf build

truffle migrate --network <development, ropsten, etc>

```

## Run tests

```
truffle test --network development
```

## Withdraw DAI from Contract in Console

```
truffle console --network ropsten

Escrow.deployed().then(ins => esc = ins)

web3.eth.getAccounts((err, accounts) => arb = accounts[8])

esc.withdrawDAI(arb, 2000000000000000000,{from:arb})
```

## Transfer DAI to an address in Console

```
truffle console --network ropsten

web3.eth.getAccounts((err, accounts) => account1 = accounts[0])

DAI.deployed().then(ins => daiInstance = ins)

daiInstance.transfer('<account>', <amount>000000000000000000, {from: account1})
```
