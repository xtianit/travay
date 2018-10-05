<template>
  <vue-grid class='firefox-info'>

    <vue-grid-row v-if="isNotFirefox">
      <vue-grid-item>
        <p>{{ $t('App.helloFirefox.switchToFirefox' /* You are not currently using the Firefox
           browser. To use this application you must switch to FireFox */) }}</p>
      </vue-grid-item>
    </vue-grid-row>
    
  </vue-grid>
</template>

<script>
  export default {
    metaInfo: {
      title: "Firefox in Travay",
      meta: [
        {
          name: "",
          content: ""
        }
      ]
    },
    name: "hello-firefox",
    computed: {
      isNotFirefox: function () {
        // Refs: https://stackoverflow.com/a/9851769
        return typeof InstallTrigger === 'undefined';
      }
    }
  };
</script>

<style scoped>
  .firefox-info {
    text-align: center;
    margin-top: 50px;
  }
</style>
