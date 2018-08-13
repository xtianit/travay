<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <!--<h1>{{ $t("App.home.title") /* Home Page */ }}</h1>-->
        <!--<button type="button" class="btn btn-primary" @click="sendGridTest()">Sendgrid</button>-->
        <my-button>Story</my-button>
      </div>
    </div>
  </div>
</template>

<script>

  import MyButton from '../stories/TravayButton'
  export default {
    name: 'home',
    components: {MyButton},
    methods: {
      sendGridTest () {
        const sgMail = require('@sendgrid/mail')
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
          to: 'farah@electricfeel.co',
          from: 'test@example.com',
          subject: 'Sending with SendGrid is Fun',
          text: 'and easy to do anywhere, even with Node.js',
          html: '<strong>and easy to do anywhere, even with Node.js</strong>'
        }
        sgMail.send(msg)
      }
    }
  }
</script>

<style scoped>

</style>


