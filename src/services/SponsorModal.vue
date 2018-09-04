<template>
  <div :class="$style.sponsorModal">
    <vue-modal :show="show" @close="$emit('update:show', false)">
      <vue-button warn @click="$emit('update:show', false)">X</vue-button>
      <vue-input
        name="sponsorAmount"
        id="sponsorAmount"
        required
        placeholder="Enter Amount"
        validation="required"
        type="number"
        v-model="sponsorAmount"/>

      <vue-button primary @click.prevent.stop="clickHandler">Sponsor</vue-button>
    </vue-modal>
  </div>
</template>

<script>
  import {store} from '../store';
  import truffleContract from "truffle-contract";
  import EscrowContract from "../../contracts/build/contracts/Escrow";
  import DAIContract from "../../contracts/build/contracts/DAI";

  export default {
    name: 'SponsorModal',
    props: {
      show: {
        type: Boolean,
        required: true,
        default: false
      },
      job: {
        type: Object,
        required: true,
        default: () => {
        }
      }
    },
    data() {
      return {
        sponsorAmount: ''
      };
    },
    computed: {},
    methods: {
      clickHandler() {
        this.$emit('sponsorSubmit', this.sponsorAmount);
        this.sponsorAmount = '';
        this.sponsorAmountToEscrow();
      },
      async sponsorAmountToEscrow() {
        const Escrow = truffleContract(EscrowContract);
        const DAI = truffleContract(DAIContract);

        window.Escrow = Escrow;
        Escrow.setProvider(this.$store.state.web3.web3Instance().currentProvider);
        Escrow.defaults({from: this.$store.state.web3.web3Instance().eth.coinbase});
        const EscrowInstance = await Escrow.deployed();

        window.EscrowInstance = EscrowInstance;
        const pool = EscrowInstance.address;
        console.log('Contract Address: ', pool);

        DAI.setProvider(this.$store.state.web3.web3Instance().currentProvider);
        DAI.defaults({from: this.$store.state.web3.web3Instance().eth.coinbase});

        const JobID = 0;
        const payment = 10 * 18;

        try {
          await DAIInstance.transfer(pool, payment);

          await DAIInstance.approve(EscrowInstance.address, payment);

          let escrow_balance_before = await DAIInstance.balanceOf(
            EscrowInstance.address
          );
          escrow_balance_before = escrow_balance_before.toNumber();

          await EscrowInstance.register({from: sponsor});
          const result = await EscrowInstance.sponsorDAI(JobID, payment, {
            from: sponsor
          });

          let escrow_balance_after = await DAIInstance.balanceOf(
            EscrowInstance.address
          );
          escrow_balance_after = escrow_balance_after.toNumber();

        } catch (err) {
          console.log(false, err);
        }
        console.log(result);
      }
    }
  };
</script>

<style lang="scss" module>
  .sponsorModal {
    display: block;
  }
</style>
