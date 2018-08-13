<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h1>Components</h1>
        <!--<h1>{{ $t("App.home.title") /* Home Page */ }}</h1>-->
        <!--<button type="button" class="btn btn-primary" @click="sendGridTest()">Sendgrid</button>-->
        <travay-button>Story</travay-button>
      </div>
    </div>
  </div>
</template>

<script>
  import TravayButton from '../stories/VueButton'

  export default {
    name: 'components',
    components: {TravayButton},
  }
</script>

<style scoped>

</style>
