<template>
  <div class="loading-parent">
      <loading
          :active.sync="isLoading"
          :can-cancel="false"
          :is-full-page="fullPage">
      </loading>
      <vue-grid>
        <vue-grid-row>

          <vue-grid-item>
            <h1>{{ $t('App.tip.tipPageTitle' /* Tip Anyone! */) }}</h1>
            <p>{{ $t('App.tip.tipPageDescription' /* Send cryptocurrency (DAI) to anyone. For a job well done, for a
              service, for rent, food and more. Remember that $1 DAI is equal to $1 USD. */) }}</p>
            <br>

            <form @submit.prevent="makeTipEscrow()">

              <vue-input
                name="receiver"
                id="receiver"
                required
                :placeholder="$t('App.tip.receiverPlaceholderText') /* Receiver */"
                validation="required"
                v-model="form.receiver"/>
              <p><em>{{ $t('App.tip.receiverDescription' /* Paste in the ethereum address of the person who should receive
                your DAI. Remember this is irreversible so make sure you have the right address. */) }}</em></p>

              <br>

              <vue-input
                name="amount"
                id="amount"
                required
                :placeholder="$t('App.tip.AmountPlaceholderText') /* Amount in USD */"
                validation="required"
                v-model="form.amount"/>
              <p><em>{{ $t('App.tip.amountDescription' /* Enter how much you would like to send in USD. */) }}</em></p>

              <br>

              <vue-button primary style="color: white;"
                          :loading="isLoading"
                          @click="makeTipEscrow()">
                {{ $t('App.tip.sendTipButton' /* Send Tip */) }}
              </vue-button>

            </form>
          </vue-grid-item>


        </vue-grid-row>
      </vue-grid>
    </div>
</template>

<script>
  import {NETWORKS} from "../util/constants/networks";
  import {mapActions, mapGetters, mapMutations, mapState} from 'vuex';
  import {store} from '../store/'
  import * as types from '../store/types'
  import truffleContract from "truffle-contract";
  import EscrowContract from "../../contracts/build/contracts/Escrow.json";
  import DAIContract from "../../contracts/build/contracts/DAI.json";
  import Loading from 'vue-loading-overlay';

  export default {
    name: "tip",
    components: {
      Loading
    },
    data() {
      return {
        isLoading: false,
        fullPage: true,
        form: {
          receiver: "",
          amount: ""
        }
      };
    },
    methods: {
      ...mapActions({
        openNetworkModal: types.OPEN_NETWORK_MODAL
      }),
      async makeTipEscrow() {

        if (this.$store.state.web3.networkId !== "3") {
          this.openNetworkModal();
          return;
        }

        const self = this;
        self.isLoading = true;

        return new Promise(async (resolve, reject) => {

          const Escrow = truffleContract(EscrowContract);
          const DAI = truffleContract(DAIContract);

          console.log('1')
          window.Escrow = Escrow;
          Escrow.setProvider(this.$store.state.web3.web3Instance().currentProvider);
          Escrow.defaults({from: this.$store.state.web3.web3Instance().eth.coinbase});
          DAI.setProvider(this.$store.state.web3.web3Instance().currentProvider);
          console.log('2')

          const EscrowInstance = await Escrow.deployed();
          const DAIInstance = await DAI.deployed();
          console.log('3')

          window.EscrowInstance = EscrowInstance;
          const pool = EscrowInstance.address;

          DAI.setProvider(this.$store.state.web3.web3Instance().currentProvider);
          DAI.defaults({from: this.$store.state.web3.web3Instance().eth.coinbase});
          console.log('4')

          web3.eth.getAccounts(async (error, accounts) => {

            const payment = this.form.amount * (10 ** 18);
            const receiver = this.form.receiver;
            const sender = accounts[0];

            console.log('tip amount', payment);

            try {
              let receiver_balance_before = await DAIInstance.balanceOf(receiver);
              receiver_balance_before = receiver_balance_before.toNumber();

              await DAIInstance.approve(EscrowInstance.address, "1000000000000000000", {
                from: sender
              });

              const result = await EscrowInstance.tip(receiver, payment, {
                from: sender
              });

              let receiver_balance_after = await DAIInstance.balanceOf(receiver);
              receiver_balance_after = receiver_balance_after.toNumber();

              this.$nextTick(() => {
                setTimeout(() => {
                  self.isLoading = false;

                  EventBus.$emit('notification.add', {
                    id: 1,
                    title: this.$t("App.tip.tipSentTitle" /* Success! */),
                    text: this.$t("App.tip.tipSentText" /* Your DAI transfer is complete! */)
                  });
                }, 800);
              });
              self.clearForm();
            } catch (error) {
              self.isLoading = false;
              reject(error);
            }
          })
        })
      },
      clearForm() {
        Object.keys(this.form).forEach(key => {
          this.form[key] = '';
        });
      },
    }
  };
</script>

<style scoped>
.loading-parent {
  position: relative;
}
</style>
