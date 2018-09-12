<template>
  <vue-grid>
    <vue-grid-row>
      <vue-grid-item>
        <h1>Fund Your Crypto Wallet</h1>

        <h2>Have Ether and need DAI?</h2>
        <ul>
          <li>Click the button below</li>
          <li>Select the first option "MetaMask."</li>
          <li>Accept the prompts from MetaMask.</li>
        </ul>
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
          token: '0x6f2d6ff85efca691aad23d549771160a12f0a0fc',
          amount: 5 * (10 ** 4),
          onCancel: function () {
            console.info('Trade was canceled.');
          },
          onComplete: function (transactionId) {
            console.info('Trade complete. Thank you, come again.');
          }
        }, 'body');
      }
    },
    sell() {
      AirSwap.Trader.render({
        env: 'sandbox',
        mode: 'sell',
        token: '0x1515fb6a2de836472943bb64e7cc02102d5967ed',
        onCancel: function () {
          console.info('Trade was canceled.');
        },
        onComplete: function (transactionId) {
          console.info('Trade complete. Thank you, come again.');
        }
      }, 'body');
    }
  }
  // 0x6f2d6ff85efca691aad23d549771160a12f0a0fc

  // DAI 0x1515fb6a2de836472943bb64e7cc02102d5967ed
</script>

<style scoped>

</style>
