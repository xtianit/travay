const Escrow = artifacts.require("./Escrow.sol");
const DAI = artifacts.require("./DAI.sol");
const decimals = 18;
const decimalConversion = 10 ** decimals;

contract("Escrow Contract", accounts => {
  it("Escrow contract is deployed", async () => {
    const EscrowInstance = await Escrow.deployed();
    assert.notEqual(EscrowInstance.address, "");
  });

  it("Fake DAI token contract is deployed", async () => {
    const DAIInstance = await DAI.deployed();
    assert.notEqual(DAIInstance.address);
  });

  it("Tranfer DAI to Escrow contract", async () => {
    const sender = accounts[0];

    const DAIInstance = await DAI.deployed();
    const EscrowInstance = await Escrow.deployed();

    try {
      await DAIInstance.transfer(EscrowInstance.address, 100 * 10 ** 18);

      const escrowBalance = await DAIInstance.balanceOf(EscrowInstance.address);
      assert.equal(
        escrowBalance.toNumber() / 10 ** 18,
        100,
        `Balance should be 100`
      );
    } catch (err) {
      assert(false, err);
    }
  });

  it("Register User", async () => {
    const EscrowInstance = await Escrow.deployed();

    try {
      const result = await EscrowInstance.register({ from: accounts[0] });

      assert.equal(
        result.logs[0].args.address_Registered,
        accounts[0],
        `Registered address should be ${accounts[0]}`
      );

      const userExists = await EscrowInstance.registeredUsers(accounts[0]);
      assert(userExists, "Address is not registered");
    } catch (err) {
      assert(false, err);
    }
  });

  it("Create Job with registered user", async () => {
    const manager = accounts[0];
    const EscrowInstance = await Escrow.deployed();
    const DAIInstance = await DAI.deployed();

    const description = "Need an Ethereum developer";
    const salary = 100 * 10 ** 18;

    try {
      await DAIInstance.approve(EscrowInstance.address, salary, {
        from: manager
      });
      const result = await EscrowInstance.createJob(description, salary, 5, {
        from: manager
      });

      // console.log(result.logs[0].args.salary.toNumber() / 10 ** 18);
      assert.equal(result.logs[0].args.manager, manager);

      const job = await EscrowInstance.getJob(
        result.logs[0].args.JobID.toNumber()
      );

      assert.equal(job[0], result.logs[0].args.description);
    } catch (e) {
      assert(false);
    }
  });

  it("Create Job with unregistered user", async () => {
    const manager = accounts[1];
    const EscrowInstance = await Escrow.deployed();
    const DAIInstance = await DAI.deployed();

    const salary = 100 * 10 ** 18;
    try {
      await DAIInstance.transfer(manager, salary, { from: accounts[0] });

      await DAIInstance.approve(EscrowInstance.address, salary, {
        from: manager
      });
    } catch (err) {
      assert(false, err);
    }
    const description = "Need an Ethereum developer";

    try {
      const result = await EscrowInstance.createJob(description, salary, 5, {
        from: manager
      });
      assert(false);
    } catch (e) {
      assert(true);
    }
  });

  it("Create Job with salary zero", async () => {
    const manager = accounts[0];
    const EscrowInstance = await Escrow.deployed();
    const DAIInstance = await DAI.deployed();

    const salary = 0;

    try {
      await DAIInstance.transfer(manager, salary, { from: accounts[0] });

      await DAIInstance.approve(EscrowInstance.address, salary, {
        from: manager
      });
    } catch (err) {
      assert(false, err);
    }
    const description = "Need an Ethereum developer";

    try {
      const result = await EscrowInstance.createJob(description, salary, 5, {
        from: manager
      });
      assert(false);
    } catch (e) {
      assert(true);
    }
  });

  it("Claim job by an unegistered worker", async () => {
    const worker = accounts[1];
    const EscrowInstance = await Escrow.deployed();
    const DAIInstance = await DAI.deployed();

    const JobID = 0;

    try {
      const result = await EscrowInstance.claimJob(JobID, { from: worker });
      assert(false);
    } catch (err) {
      assert(true);
    }
  });

  it("Claim Job with an ID less than 0", async () => {
    const worker = accounts[2];
    const EscrowInstance = await Escrow.deployed();
    const DAIInstance = await DAI.deployed();

    const JobID = -1;

    try {
      await EscrowInstance.claimJob(JobID, { from: worker });
      assert(false);
    } catch (err) {
      assert(true);
    }
  });

  it("Claim job by a registered worker", async () => {
    const worker = accounts[1];
    const EscrowInstance = await Escrow.deployed();
    const DAIInstance = await DAI.deployed();

    const JobID = 0;

    try {
      await EscrowInstance.register({ from: worker });
      const result = await EscrowInstance.claimJob(JobID, { from: worker });

      assert.equal(result.logs[0].args.worker, worker);
    } catch (err) {
      assert(false, err);
    }
  });

  it("Claim Job as an unregistered evaluator", async () => {
    const evaluator = accounts[2];
    const EscrowInstance = await Escrow.deployed();
    const DAIInstance = await DAI.deployed();

    const JobID = 0;

    try {
      await EscrowInstance.setEvaluator(JobID, { from: evaluator });
      assert(false);
    } catch (err) {
      assert(true);
    }
  });

  it("Claim Job as a registered evaluator", async () => {
    const evaluator = accounts[2];
    const EscrowInstance = await Escrow.deployed();
    const DAIInstance = await DAI.deployed();

    const JobID = 0;

    try {
      await EscrowInstance.register({ from: evaluator });

      const result = await EscrowInstance.setEvaluator(JobID, {
        from: evaluator
      });
      assert.equal(result.logs[0].args.evaluator, evaluator);
    } catch (err) {
      assert(false, err);
    }
  });

  it("Cancel Job by the manager", async () => {
    const manager = accounts[0];
    const EscrowInstance = await Escrow.deployed();
    const DAIInstance = await DAI.deployed();

    try {
      let balance_manager_before = await DAIInstance.balanceOf(manager);
      balance_manager_before =
        balance_manager_before.toNumber() / decimalConversion;

      const salary = 100 * decimalConversion;

      const twoPecentOfSalary = (salary * (1 / 50)) / decimalConversion;
      await DAIInstance.approve(EscrowInstance.address, salary, {
        from: manager
      });
      const description = "Need an Ethereum developer";

      await EscrowInstance.createJob(description, salary, 5, { from: manager });

      const JobID = 1;
      const result = await EscrowInstance.cancelJob(JobID, { from: manager });
      assert.equal(result.logs[0].args.JobID, JobID);

      let balance_manager_after = await DAIInstance.balanceOf(manager);
      balance_manager_after =
        balance_manager_after.toNumber() / decimalConversion;

      assert.equal(
        (balance_manager_before - twoPecentOfSalary).toFixed(0),
        balance_manager_after.toFixed(0)
      );

      const Job = await EscrowInstance.getJob(JobID);
      assert.equal(Job[4].toNumber(), 3);
    } catch (err) {
      assert(false, err);
    }
  });

  it("Cancel job by the arbitrator", async () => {
    const manager = accounts[0];
    const arbitrator = accounts[8];

    const EscrowInstance = await Escrow.deployed();
    const DAIInstance = await DAI.deployed();

    try {
      let balance_manager_before = await DAIInstance.balanceOf(manager);
      balance_manager_before =
        balance_manager_before.toNumber() / decimalConversion;

      const salary = 100 * decimalConversion;
      const twoPecentOfSalary = (salary * (1 / 50)) / decimalConversion;

      await DAIInstance.approve(EscrowInstance.address, salary, {
        from: manager
      });
      const description = "Need an Ethereum developer";

      await EscrowInstance.createJob(description, salary, 5, { from: manager });

      const JobID = 2;
      const result = await EscrowInstance.cancelJob(JobID, {
        from: arbitrator
      });
      assert.equal(result.logs[0].args.JobID, JobID);

      let balance_manager_after = await DAIInstance.balanceOf(manager);
      balance_manager_after =
        balance_manager_after.toNumber() / decimalConversion;

      assert.equal(
        (balance_manager_before - twoPecentOfSalary).toFixed(0),
        balance_manager_after.toFixed(0)
      );

      const Job = await EscrowInstance.getJob(JobID);
      assert.equal(Job[4].toNumber(), 3);
    } catch (err) {
      assert(false, err);
    }
  });

  it("Worker provides proof of work", async () => {
    const worker = accounts[1];

    const EscrowInstance = await Escrow.deployed();

    const JobID = 0;

    try {
      const result = await EscrowInstance.provideProofOfWork(JobID, {
        from: worker
      });

      assert.equal(result.logs[0].args.proofProvided, true);
    } catch (err) {
      assert(false, err);
    }
  });

  it("Evaluator confirms proof of work", async () => {
    const evaluator = accounts[2];

    const EscrowInstance = await Escrow.deployed();

    const JobID = 0;
    try {
      const result = await EscrowInstance.confirmProofOfWork(JobID, {
        from: evaluator
      });

      assert.equal(result.logs[0].args.proofVerified, true);
    } catch (err) {
      assert(false, err);
    }
  });

  it("Manager approves payment", async () => {
    const manager = accounts[0];

    const EscrowInstance = await Escrow.deployed();

    const JobID = 0;
    const salary = 98 * decimalConversion;
    const payment = salary / 5;

    try {
      const result = await EscrowInstance.approvePayment(JobID, {
        from: manager
      });

      assert.equal(result.logs[0].args.amount.toNumber(), payment);
    } catch (err) {
      assert(false, err);
    }
  });

  it("Worker claims payment", async () => {
    const worker = accounts[1];

    const EscrowInstance = await Escrow.deployed();
    const DAIInstance = await DAI.deployed();

    try {
      let worker_balance_before = await DAIInstance.balanceOf(worker);
      worker_balance_before = worker_balance_before.toNumber();

      const JobID = 0;

      const Job = await EscrowInstance.getJob(JobID);
      const payment = Job[7].toNumber();

      const result = await EscrowInstance.claimPayment(JobID, { from: worker });
      assert.equal(payment, result.logs[0].args.amount);

      let worker_balance_after = await DAIInstance.balanceOf(worker);
      worker_balance_after = worker_balance_after.toNumber();

      assert.equal(worker_balance_before + payment, worker_balance_after);
    } catch (err) {
      assert(false, err);
    }
  });

  it("Check job status", async () => {
    const EscrowInstance = await Escrow.deployed();

    const JobID = 0;
    try {
      const Job = await EscrowInstance.getJob(JobID);
      assert.equal(Job[4].toNumber(), 1, "Job status should be inProgress");
    } catch (err) {
      assert(fasle, err);
    }
  });

  it("Job completes with all milestones paid", async () => {
    const manager = accounts[0];
    const worker = accounts[1];
    const evaluator = accounts[2];

    const EscrowInstance = await Escrow.deployed();

    const JobID = 0;
    try {
      for (let i = 0; i < 4; i++) {
        await EscrowInstance.provideProofOfWork(JobID, {
          from: worker
        });

        await EscrowInstance.confirmProofOfWork(JobID, {
          from: evaluator
        });

        await EscrowInstance.approvePayment(JobID, {
          from: manager
        });

        await EscrowInstance.claimPayment(JobID, { from: worker });
      }

      const Job = await EscrowInstance.getJob(JobID);
      assert.equal(Job[4].toNumber(), 2);
    } catch (err) {
      assert(false, err);
    }
  });

  it("Manager pays to evaluator of his job", async () => {
    const manager = accounts[0];
    const evaluator = accounts[2];

    const EscrowInstance = await Escrow.deployed();
    const DAIInstance = await DAI.deployed();
    try {
      let evaluator_balance_before = await DAIInstance.balanceOf(evaluator);
      evaluator_balance_before = evaluator_balance_before.toNumber();

      const JobID = 0;
      const payment = 10 * decimalConversion;

      await DAIInstance.approve(EscrowInstance.address, payment, {
        from: manager
      });

      const result = await EscrowInstance.payToEvaluator(JobID, payment, {
        from: manager
      });

      assert.equal(result.logs[0].args.manager, manager);

      let evaluator_balance_after = await DAIInstance.balanceOf(evaluator);
      evaluator_balance_after = evaluator_balance_after.toNumber();

      assert.equal(evaluator_balance_before + payment, evaluator_balance_after);
    } catch (err) {
      assert(false, err);
    }
  });

  it("Make Tip", async () => {
    const sender = accounts[0];
    const receiver = accounts[4];

    const EscrowInstance = await Escrow.deployed();
    const DAIInstance = await DAI.deployed();
    try {
      let receiver_balance_before = await DAIInstance.balanceOf(receiver);
      receiver_balance_before = receiver_balance_before.toNumber();

      const payment = 10 * decimalConversion;

      await DAIInstance.approve(EscrowInstance.address, payment, {
        from: sender
      });

      const result = await EscrowInstance.tip(receiver, payment, {
        from: sender
      });
      assert.equal(result.logs[0].args.to, receiver);

      let receiver_balance_after = await DAIInstance.balanceOf(receiver);
      receiver_balance_after = receiver_balance_after.toNumber();

      assert.equal(receiver_balance_before + payment, receiver_balance_after);
    } catch (err) {
      assert(false, err);
    }
  });

  it("Sponsor DAI", async () => {
    const pool = accounts[0];
    const sponsor = accounts[5];

    const EscrowInstance = await Escrow.deployed();
    const DAIInstance = await DAI.deployed();

    const JobID = 0;
    const payment = 10 * decimalConversion;
    try {
      await DAIInstance.transfer(sponsor, payment, { from: pool });

      await DAIInstance.approve(EscrowInstance.address, payment, {
        from: sponsor
      });

      let escrow_balance_before = await DAIInstance.balanceOf(
        EscrowInstance.address
      );
      escrow_balance_before = escrow_balance_before.toNumber();

      await EscrowInstance.register({ from: sponsor });
      const result = await EscrowInstance.sponsorDAI(JobID, payment, {
        from: sponsor
      });
      assert.equal(result.logs[0].args.sponsor, sponsor);

      let escrow_balance_after = await DAIInstance.balanceOf(
        EscrowInstance.address
      );
      escrow_balance_after = escrow_balance_after.toNumber();

      assert.equal(escrow_balance_before + payment, escrow_balance_after);
    } catch (err) {
      assert(false, err);
    }
  });

  it("Withdraw DAI", async () => {
    const arbitrator = accounts[8];
    const receiver = accounts[6];

    const EscrowInstance = await Escrow.deployed();
    const DAIInstance = await DAI.deployed();
    try {
      let receiver_balance_before = await DAIInstance.balanceOf(receiver);
      receiver_balance_before = receiver_balance_before.toNumber();

      const withdraw_amount = 20 * decimalConversion;

      const result = await EscrowInstance.withdrawDAI(
        receiver,
        withdraw_amount,
        {
          from: arbitrator
        }
      );
      assert.equal(result.logs[0].args.receiver, receiver);

      let receiver_balance_after = await DAIInstance.balanceOf(receiver);
      receiver_balance_after = receiver_balance_after.toNumber();

      assert.equal(
        receiver_balance_before + withdraw_amount,
        receiver_balance_after
      );
    } catch (err) {
      assert(false, err);
    }
  });

  it("Test DAI amount by sponsor", async () => {
    const sponsor = accounts[5];

    const EscrowInstance = await Escrow.deployed();

    const JobID = 0;
    const expected_amount = 10 * decimalConversion;

    try {
      const result = await EscrowInstance.get_Sponsored_Amount_in_Job_By_Address(
        JobID,
        sponsor
      );
      const returned_amount = result.toNumber();
      assert.equal(returned_amount, expected_amount);
    } catch (err) {
      assert(false, err);
    }
  });

  it("Test list of sponsors in a job", async () => {
    const sponsor = accounts[5];
    const EscrowInstance = await Escrow.deployed();

    const JobID = 0;

    try {
      const result = await EscrowInstance.get_Sponsors_list_by_Job(JobID);
      assert.equal(result[0], sponsor);
    } catch (err) {
      assert(false, err);
    }
  });

  it("Test Jobs by manager", async () => {
    const manager = accounts[0];

    const EscrowInstance = await Escrow.deployed();

    try {
      const result = await EscrowInstance.JobsByManager(manager, 0);
      assert.equal(result.toNumber(), 0);
    } catch (err) {
      assert(false, err);
    }
  });

  it("Test Jobs by worker", async () => {
    const worker = accounts[1];

    const EscrowInstance = await Escrow.deployed();

    try {
      const result = await EscrowInstance.JobsByWorker(worker, 0);
      assert.equal(result.toNumber(), 0);
    } catch (err) {
      assert(false, err);
    }
  });
});
