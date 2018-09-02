<template>
  <vue-grid>
    <vue-grid-row>
      <vue-grid-item><h1>Home</h1></vue-grid-item>
    </vue-grid-row>
    <vue-grid-row>
      <vue-grid-item>

      </vue-grid-item>
    </vue-grid-row>
  </vue-grid>
</template>

<script>
  import {store} from '../store';

  export default {
    metaInfo: {
      title: "Travay",
      meta: [
        {
          name: "Travay",
          content: "Job Market of Haiti"
        }
      ]
    },
    name: 'home',
    data: function () {
      return {
        amount: null
      }
    },
    methods: {
      // deposit (event) {
      //   console.log('contract instance', this.$store.state.contractInstance());
      //   this.$store.state.contractInstance().deposit(event.target.innerHTML, {
      //     gas: 300000,
      //     value: this.$store.state.web3.web3Instance().toWei(this.amount, 'ether'),
      //     from: this.$store.state.web3.coinbase
      //   }, (error, result) => {
      //     if (error) {
      //       console.log(error)
      //     }
      //   })
      // }
    },
    mounted () {
      console.log('dispatching getContractInstance');
      this.$store.dispatch('getContractInstance');
    }
  }
</script>
