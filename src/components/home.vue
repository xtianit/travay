<template>
  <div class="container">
    <div class="row">
      <div class="col">

        <h1>Home</h1>

        <form @submit.prevent="deposit">
          <label>Deposit
            <input
              v-model="amount"
              type="number"
              min=".01">
          </label>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import { store } from '../store';

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
      deposit (event) {
        let vm = this;
        console.log('DEPOSITING USD: $', this.amount)
        this.$store.state.contractInstance().deposit(event.target.innerHTML, {
          gas: 300000,
          value: vm.this.$store.state.web3.web3Instance().toWei(this.amount, 'ether'),
          from: vm.this.$store.state.web3.coinbase
        }, (error, result) => {
          if (error) {
            console.log(error)
          }
        })
      }
    },
    mounted () {
      console.log('dispatching getContractInstance')
      this.$store.dispatch('getContractInstance')
    }
  }
</script>
