<template>
  <vue-grid>
    <vue-grid-row>
      <vue-grid-item>
        <h1>Installing MetaMask</h1>
        <p><em>What is MetaMask?</em></p>
        <p>MetaMask is the easiest way to interact with decentralized web applications in a browser. It is a browser
          extension that connects to an Ethereum network.</p>
        <br>
        <p>To install MetaMask for <a href="https://play.google.com/store/apps/details?id=org.mozilla.firefox&hl=fr"
                                      target="_blank">FireFox</a>, go to the Firefox Add-ons page and click the Add to Firefox button.</p>
        <p>Remember that MetaMask only works in FireFox on mobile.</p>

        <h2>Setting up MetaMask</h2>
        <p>Click the MetaMask icon in your browser and this screen will appear:</p>
        <br>
        <img src="../../static/metamask-1.png" alt="MetaMask initial screen" height="1344" width="946">
        <br>
        <br>
        <p>Next, you'll receive 12 words. You must write them down before continuing.</p>
        <br>
        <img src="../../static/metamask-2.png" alt="MetaMask initial screen" height="1340" width="954">
        <br>
        <p>You'll see the menu that shows "Main Network"</p>
        <p>Remember that you need to be on the "Main Network" in order to process real transactions with real money
          and value. If you switch to any other network you will not be able to do real transactions.</p>
        <br>
        <img src="../../static/metamask-3.png" alt="MetaMask initial screen" height="1326" width="952">
        <br>
        <p>You are now all set!</p>
        <p>And this is what your transaction history page will look like:</p>
        <br>
        <img src="../../static/metamask-4.png" alt="MetaMask initial screen" height="1344" width="964">
        <br>
        <h2>Attribution</h2>
        <p>This set up guide was adapted from <a
          href="https://truffleframework.com/docs/truffle/getting-started/truffle-with-metamask#setting-up-metamask"
          target="_blank">
          Truffle</a>.</p>

      </vue-grid-item>
    </vue-grid-row>
  </vue-grid>
</template>

<script>
  export default {
    name: "set-up-metamask"
  }
</script>

<style scoped>

</style>
