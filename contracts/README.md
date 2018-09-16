# Escrow Smart Contract

## Build Contracts
```
cd contracts

rm -rf build

truffle migrate --network development

```

## Start Truffle command line

```
truffle console --network development
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

daiInstance.transfer("0xb06cef6b14dd249f5a0977f645436cc4f4095325", 20000000000000000000, {from: account1})


