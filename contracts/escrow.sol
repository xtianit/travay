// Try: https://medium.com/@s_van_laar/how-to-build-an-escrow-contract-with-an-ethereum-erc20-token-bfc4825b0dd7

// https://medium.com/@pranav.89/smart-contracting-simplified-escrow-in-solidity-ethereum-b19761e8fe74

// https://ropsten.etherscan.io/address/0xd61f9331ce61eb27e0ab7d9b9bc75402ea5db7f8

pragma solidity ^0.4.11;

contract Escrow {
    uint balance;
    address public manager;
    address public worker;
    address private escrow;
    uint private start;
    bool managerOk;
    bool workerOk;

function Escrow(address manager_address, address worker_address) public {
        // this is the constructor function that runs ONCE upon initialization
        manager = manager_address;
        worker = worker_address;
        escrow = msg.sender;
        start = now; //now is an alias for block.timestamp, not really "now"
    }

    function accept() public {
        if (msg.sender == manager){
            managerOk = true;
        } else if (msg.sender == worker){
            workerOk = true;
        }
        if (managerOk && workerOk){
            payBalance();
        } else if (managerOk && !workerOk && now > start + 30 days) {
            // Freeze 30 days before release to manager. The customer has to remember to call this method after freeze period.
            selfdestruct(manager);
        }
    }

    function payBalance() private {
        // we are sending ourselves (contract creator) a fee
        escrow.transfer(this.balance / 100);
        // send worker the balance
        if (worker.send(this.balance)) {
            balance = 0;
        } else {
            throw;
        }
    }

    function deposit() public payable {
        if (msg.sender == manager) {
            balance += msg.value;
        }
    }

    function cancel() public {
        if (msg.sender == manager){
            managerOk = false;
        } else if (msg.sender == worker){
            workerOk = false;
        }
        // if both manager and worker would like to cancel, money is returned to manager
        if (!managerOk && !workerOk){
            selfdestruct(manager);
        }
    }

    function kill() public constant {
        if (msg.sender == escrow) {
            selfdestruct(manager);
        }
    }
}
