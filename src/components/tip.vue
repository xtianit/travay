<template>
  <vue-grid>
    <vue-grid-row>

      <vue-grid-item>
        <h1>{{ $t('App.tip.tipPageTitle' /* Tip Anyone! */) }}</h1>
        <p>{{ $t('App.tip.tipPageDescription' /* Send cryptocurrency (DAI) to anyone. For a job well done, for a
          service, for rent, food and more. */) }}</p>

        <br>

        <form @submit.prevent="makeTipEscrow()">

          <vue-input
            name="receiver"
            id="receiver"
            required
            placeholder="Receiver"
            validation="required"
            v-model="form.receiver"/>
          <p><em>{{ $t('App.tip.receiverDescription' /* Paste in the ethereum address of the person who should receive
            your DAI. Remember this is irreversible so make sure you have the right address. */) }}</em></p>

          <br>

          <vue-input
            name="amount"
            id="amount"
            required
            placeholder="Amount in USD"
            validation="required"
            v-model="form.amount"/>
          <p><em>{{ $t('App.tip.amountDescription' /* Enter how much you would like to send in USD. */) }}</em></p>

          <br>

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

        web3.eth.getAccounts(async (err, accounts) => {

          const payment = this.form.amount * (10 ** 18);
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
        })
      }
    }
  };
</script>

<style scoped>

</style>
