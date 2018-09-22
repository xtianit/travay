<template>
  <vue-grid>
    <vue-grid-row>
      <vue-grid-item>
        <h1>Travay</h1>
        <p>{{ $t('App.core.description' /* The Long-Term Jobs Market of Haiti */)}}</p><br>
          <p>{{ $t('App.home.sameDayJobs' /* Same Day Jobs Marketplace */) }}</p>
          <!--<li>{{ $t('App.home.sameDayJobsDescription' /* Travay provides a citizen driven, long-term jobs market,-->
            <!--helping-->
            <!--to provide to economic mobility. */) }}</li>-->
      </vue-grid-item>
    </vue-grid-row>
    <vue-grid-row>
      <vue-grid-item>
        <!--<h2>{{ $t('App.home.earn' /* Earn Stable Income */) }}</h2>-->
      </vue-grid-item>
    </vue-grid-row>
    <vue-grid-row>
      <vue-grid-item>
        <h2>{{ $t('App.home.receivePayments' /* Receive Instant Payments */) }}</h2>
        <p>{{ $t('App.home.jobsPaidInCrypto' /* Jobs Paid in Cryptocurrency */) }}</p>
        <!--<p>{{ $t('App.home.crypto' /* Cryptocurrency Payment = Instant Access to Your Money. */) }}</p>-->
      </vue-grid-item>
    </vue-grid-row>
    <vue-grid-row>
      <vue-grid-item>
        <h2>{{ $t('App.home.howDoesItWork' /* How Does It Work? */) }}</h2>
        <ol>
          <li>{{ $t('App.home.register' /* Register by signing in */) }}</li>
          <li>{{ $t('App.home.findAndClaim' /* Find a job your want and click claim */) }}</li>
          <li>{{ $t('App.home.whenCompleteInstructions' /* When work is complete, upload your proof of work and click
            complete job */) }}</li>
          <li>{{ $t('App.home.mangerApproves' /* Your Job Manager will approve work and issue payment */) }}</li>
        </ol>
      </vue-grid-item>
    </vue-grid-row>
    <vue-grid-row>
      <vue-grid-item>
        <h2>{{ $t('App.home.getStartedFast' /* How to Get Started Fast */) }}</h2>

        <p>{{ $t('App.home.noExperienceNeed' /* Find a job, claim it with no experience needed! */) }}</p>
        <br>
        <ol>
          <li>{{ $t('App.getStarted.installBrowser' /* Install */) }} <a
            href="https://play.google.com/store/apps/details?id=org.mozilla.firefox&hl=fr" target="_blank">Firefox</a>
            {{ $t('App.getStarted.browser' /* browser */) }}
          </li>
          <li>{{ $t('App.getStarted.installExtension' /* extension */) }} <a
            href="https://addons.mozilla.org/en-US/firefox/addon/ether-metamask"
                                                                  target="_blank">MetaMask</a>.
          </li>
          <li>{{ $t('App.getStarted.step2' /* Log into Travay with your Gmail Account. Don't have one? Sign up
            */) }} <a
            href="https://accounts.google.com/signup/v2/webcreateaccount?continue=https%3A%2F%2Faccounts.google.com%2FManageAccount&hl=fr&flowName=GlifWebSignIn&flowEntry=SignUp"
            target="_blank">{{ $t('App.getStarted.here' /* here */) }}</a>.
          </li>
          <li>
            {{ $t('App.getStarted.startJob' /* Pick a job and start work immediately! */) }}
          </li>
        </ol>
        <p>{{ $t('App.getStarted.note' /* Note: Travay is only available with Android and Firefox. */) }}</p>
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
