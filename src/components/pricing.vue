<template>
  <vue-grid>
    <vue-grid-row>

      <vue-grid-item>
        <h1>Always Transparent Pricing</h1>
      </vue-grid-item>

      <vue-grid-item>
        <br>
        <vue-panel>
          <vue-panel-header title="Best Deal" subtitle="You Got This"/>
          <vue-panel-body>
            <h2>2%</h2>
            <p>One-Time Percentage Fee of Total Salary in USD</p>
            <br>
            <p>You post a job and individuals directly apply or select your job. When you fund a job 2% of the toal
              amount is auto deducted and the worker receives the remaining 98%.</p>
          </vue-panel-body>
          <vue-panel-footer>
            <router-link to="createJob">
              <vue-button accent style="text-decoration: none; color: white;">
                {{$t('App.pricing.getStartedButton' /* Get Started */) }}
              </vue-button>
            </router-link>
          </vue-panel-footer>
        </vue-panel>
        <br>
      </vue-grid-item>

      <vue-grid-item>
        <vue-panel>
          <vue-panel-header title="Good Deal" subtitle="We do the work"/>
          <vue-panel-body>
            <h2>$30</h2>
            <p>USD Flat Fee</p>
            <br>
            <p>We post and recruit for your job position.</p>
            <br>
            <p>Ready to get started?</p>
            <br>
            <ol>
              <li>Send the $30 payment and the salary for the job via this link. Note that the 2% fee above still
                applies.</li>
              <li>Send us an email with your job details to travayht@gmail.com</li>
              <li>We'll notify you when the job is posted and there are candidates available for your job.</li>
            </ol>
            <p>Note: the one-time $30 fee is non-refundable.</p>
          </vue-panel-body>
          <vue-panel-footer>
          </vue-panel-footer>
        </vue-panel>
      </vue-grid-item>

    </vue-grid-row>
  </vue-grid>
</template>

<script>
  export default {
    name: "pricing"
  }
</script>

<style scoped>

</style>
