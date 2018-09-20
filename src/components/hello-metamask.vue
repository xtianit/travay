<template>
  <vue-grid class='metamask-info'>

    <vue-grid-row v-if="isInjected">
      <vue-grid-item>
        <p id="has-metamask"><i aria-hidden="true" class="fa fa-check"></i> MetaMask {{
          $t('App.helloMetaMask.installed' /* Installed */) }}</p>
        <p v-if="network !== 'Main Net'"> {{
          $t('App.helloMetaMask.notMainNet') /* Not Main Net */}}</p>
        <p v-else></p>
        <p>{{ $t('App.helloMetaMask.account' /* Account */) }}: {{ coinbase }}</p>
        <!--<p>{{ $t('App.helloMetaMask.balance' /* Balance */) }}: {{ balance }} Wei // {{ ethBalance }} Eth</p>-->
      </vue-grid-item>
    </vue-grid-row>

    <vue-grid-row v-else id="no-metamask">
      <vue-grid-item>
        <p><i aria-hidden="true" class="fa fa-times"></i>{{ $t('App.helloMetaMask.unlockMetaMask' /* Please Unlock
          MetaMask */) }}</p>
      </vue-grid-item>
    </vue-grid-row>

    <!--TODO: show a warning if person is not on Main Net-->
    <!--<vue-grid-row>-->
        <!--<h4>{{ $t('App.helloMetaMask.unsupportedNetwork' /* This is an unsupported network. Please switch to the-->
          <!--Main Network. */) }}</h4>-->
    <!--</vue-grid-row>-->

  </vue-grid>
</template>

<script>
  import {NETWORKS} from "../util/constants/networks";
  import {mapState} from "vuex";

  export default {
    metaInfo: {
      title: "Metamask in Travay",
      meta: [
        {
          name: "",
          content: ""
        }
      ]
    },
    name: "hello-metamask",
    computed: mapState({
      isInjected: state => state.web3.isInjected,
      network: state => NETWORKS[state.web3.networkId],
      coinbase: state => state.web3.coinbase,
      balance: state => state.web3.balance,
      ethBalance: state => {
        if (state.web3.web3Instance !== null)
          return state.web3.web3Instance().fromWei(state.web3.balance, "ether");
      }
    })
  };
</script>

<style scoped>
  .metamask-info {
    text-align: center;
    margin-top: 50px;
  }

  #has-metamask {
    color: green;
  }

  #no-metamask {
    color: red;
  }
</style>
