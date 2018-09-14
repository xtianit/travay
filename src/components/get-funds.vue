<template>
  <vue-grid>
    <vue-grid-row>

      <vue-grid-item>
        <h1>Fund Your Crypto Wallet</h1>
      </vue-grid-item>

      <vue-grid-item>
        <h2>Have Ether and need DAI?</h2>
        <ol>
          <li>Click the button below</li>
          <li>Select the first option "MetaMask."</li>
          <li>Make sure you are on the "Main Network"</li>
          <li>Accept the prompts from MetaMask.</li>
        </ol>
        <br>
        <vue-button primary @click.prevent="buy()">Buy DAI</vue-button>
      </vue-grid-item>

      <vue-grid-item>
        <h2>Have Ether and need DAI?</h2>
        <ol>
          <li>Click the button below</li>
          <li>Select the first option "MetaMask."</li>
          <li>Make sure you are on the "Main Network"</li>
          <li>Accept the prompts from MetaMask.</li>
        </ol>
        <br>
        <vue-button primary @click.prevent="buy()">Buy DAI</vue-button>
      </vue-grid-item>

    </vue-grid-row>
  </vue-grid>
</template>

<script>
  export default {
    name: "get-funds",
    methods: {
      buy() {
        AirSwap.Trader.render({
          env: 'sandbox',
          mode: 'buy',
          token: '0xc778417e063141139fce010982780140aa0cd5ab',
          amount: 5 * (10 ** 4),
          onCancel: function () {
            console.info('Trade was canceled.');
          },
          onComplete: function (transactionId) {
            console.info('Trade complete. Thank you, come again.');
          }
        }, 'body');
      }
    }
  }
</script>

<style scoped>

</style>
