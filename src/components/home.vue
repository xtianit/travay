<template>
  <vue-grid>
    <vue-grid-row>
      <vue-grid-item>
        <h1>Travay</h1>
        <p>{{ $t('App.core.description')}}</p>
      </vue-grid-item>
    </vue-grid-row>
    <vue-grid-row>
      <vue-grid-item>
        <h2>Earn Stable Income</h2>
        <p>Same Day Jobs Marketplace</p>
        <p>Travay provides a citizen driven, long-term jobs market, helping to provide to economic mobility.</p>
      </vue-grid-item>
    </vue-grid-row>
    <vue-grid-row>
      <vue-grid-item>
        <h2>Receive Instant Payments</h2>
        <p>Jobs Paid in Cryptocurrency</p>
        <p>Cryptocurrency Payment = Instant Access to Your Money.</p>
      </vue-grid-item>
    </vue-grid-row>
    <vue-grid-row>
      <vue-grid-item>
        <h2>How Does It Work?</h2>
        <ol>
          <li>Register by signing in</li>
          <li>Find a job your want and click claim</li>
          <li>When work is complete, upload your proof of work and click complete job</li>
          <li>Your Job Manager will approve work and issue payment</li>
        </ol>
      </vue-grid-item>
    </vue-grid-row>
    <vue-grid-row>
      <vue-grid-item>
        <h2>How to Get Started Fast</h2>
        <p>Find a job, claim it with no experience needed!</p>
        <br>
        <ol>
          <li>Visit this website in the <a
            href="https://play.google.com/store/apps/details?id=org.mozilla.firefox&hl=fr" target="_blank">Firefox</a>
            browser.
          </li>
          <li>Log into Travay with your Gmail Account. Don't have one? Sign up <a
            href="https://accounts.google.com/signup/v2/webcreateaccount?continue=https%3A%2F%2Faccounts.google.com%2FManageAccount&hl=fr&flowName=GlifWebSignIn&flowEntry=SignUp"
            target="_blank">here</a>.
          </li>
          <li>Install <a href="https://addons.mozilla.org/en-US/firefox/addon/ether-metamask"
                         target="_blank">MetaMask</a> Firefox extension.
          </li>
        </ol>
      </vue-grid-item>
    </vue-grid-row>
    <br>
  </vue-grid>
</template>

<script>
  export default {
    name: "home"
  }
</script>

<style scoped>

</style>
