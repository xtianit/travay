<template>
  <vue-grid>
    <vue-grid-row>

      <vue-grid-item>
        <h1>Always Transparent Pricing</h1>
        <p>We do not charge job seekers, but we do charge businesses who want to post a job.</p>
      </vue-grid-item>

      <vue-grid-item>
        <br>
        <vue-panel>
          <vue-panel-header title="Best Deal" subtitle="You Got This"/>
          <vue-panel-body>
            <h2>2%</h2>
            <p>One-Time Percentage Fee of Total Salary in USD</p>
            <br>
            <p>You post a job and individuals directly apply or select your job.</p>
          </vue-panel-body>
          <vue-panel-footer>
            <vue-button accent>
              <router-link style="text-decoration: none; color: white;" to="createJob">{{
                $t('App.pricing.getStartedButton' /* Get Started */) }}
              </router-link>
            </vue-button>
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
            <p>We post and recruit for your position.</p>
            <br>
            <p>Ready to get started?</p>
            <br>
            <ol>
              <li>Send payment via this link:</li>
              <li>Send us an email with your job details to travayht@gmail.com</li>
              <li>We'll notify you when the job is posted and there are candidates available.</li>
            </ol>
            <p>Note: this one-time is non-refundable.</p>
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
