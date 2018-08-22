<template>
  <div class='metamask-info'>
  <div v-if="isInjected">
    <p id="has-metamask"><i aria-hidden="true" class="fa fa-check"></i> Metamask installed</p>
    <p >Network: {{ network }}</p>
    <p>Account: {{ coinbase }}</p>
    <p>Balance: {{ balance }} Wei // {{ ethBalance }} Eth</p>
  </div>
    <div v-else id="no-metamask">
    <p><i aria-hidden="true" class="fa fa-times"></i> Please Unlock Metamask</p>
    </div>
  </div>
</template>

<script>
import { NETWORKS } from "../util/constants/networks";
import { mapState } from "vuex";

export default {
  metaInfo: {
    title: "Metamask and Travay",
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
}
#has-metamask {
  color: green;
}
#no-metamask {
  color: red;
}
</style>
