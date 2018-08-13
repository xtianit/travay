<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h1>Components</h1>
        <!--<h1>{{ $t("App.home.title") /* Home Page */ }}</h1>-->
      </div>
    </div>
  </div>
</template>

<script>
  import VueButton from '../stories/VueButton'

  export default {
    name: 'components',
    components: {VueButton},
  }
</script>

<style scoped>

</style>
