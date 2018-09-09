<template>
  <vue-grid>
    <vue-grid-row>

      <vue-grid-item>
        <h1>Tip A Worker</h1>
        <form @submit.prevent="makeTipEscrow()">

          <vue-input
            name="receiver"
            id="receiver"
            required
            placeholder="Receiver"
            validation="required"
            v-model="form.receiver"/>

          <br>

          <vue-input
            name="sender"
            id="sender"
            required
            placeholder="Sender"

            v-model="form.sender"/>

          <br>

          <vue-input
            name="amount"
            id="amount"
            required
            placeholder="Amount in USD"
            validation="required"
            v-model="form.amount"/>

          <vue-button warn
                      :loading="isLoading"
                      @click="makeTipEscrow()">
            {{ $t('App.tip.sendTipButton' /* Send Tip */) }}
          </vue-button>

        </form>
      </vue-grid-item>


    </vue-grid-row>
  </vue-grid>
</template>

<script>
  import {NETWORKS} from "../util/constants/networks";
  import {mapState} from "vuex";
  import {store} from '../store/'
  import truffleContract from "truffle-contract";
  import EscrowContract from "../../contracts/build/contracts/Escrow.json";
  import DAIContract from "../../contracts/build/contracts/DAI.json";

  export default {
    name: "tip",
    data() {
      return {
        isLoading: false,
        form: {
          sender: this.$store.state.web3.coinbase,
          receiver: "0xa7c2662a534a0ae22e8b0f27d6a099e3b3971c6a",
          amount: "10"
        }
      };
    },
    methods: {
      async makeTipEscrow() {
        const Escrow = truffleContract(EscrowContract);
        const DAI = truffleContract(DAIContract);

        window.Escrow = Escrow;
        Escrow.setProvider(this.$store.state.web3.web3Instance().currentProvider);
        Escrow.defaults({from: this.$store.state.web3.web3Instance().eth.coinbase});
        DAI.setProvider(this.$store.state.web3.web3Instance().currentProvider);

        const EscrowInstance = await Escrow.deployed();
        const DAIInstance = await DAI.deployed();

        window.EscrowInstance = EscrowInstance;
        const pool = EscrowInstance.address;

        DAI.setProvider(this.$store.state.web3.web3Instance().currentProvider);
        DAI.defaults({from: this.$store.state.web3.web3Instance().eth.coinbase});

        const payment = this.form.amount * (10 ** 18);
        const sender = this.form.sender;
        const receiver = this.form.receiver;

        try {
          let receiver_balance_before = await DAIInstance.balanceOf(receiver);
          receiver_balance_before = receiver_balance_before.toNumber();

          await DAIInstance.approve(EscrowInstance.address, payment, {
            from: sender
          });

          const result = await EscrowInstance.tip(receiver, payment, {
            from: sender
          });

          let receiver_balance_after = await DAIInstance.balanceOf(receiver);
          receiver_balance_after = receiver_balance_after.toNumber();

          this.$nextTick(() => {
            setTimeout(() => {
              this.isLoading = false;

              EventBus.$emit('notification.add', {
                id: 1,
                title: this.$t("App.tip.tipSentTitle" /* Success! */),
                text: this.$t("App.tip.tipSentText" /* Your DAI transfer is complete! */)
              });
            }, 700);
          });

        } catch (err) {
          console.log(err);
        }
        console.log(result);
      }
    }
  };
</script>

<style scoped>

</style>
