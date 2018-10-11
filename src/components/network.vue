<template>
  <vue-grid class='metamask-info'>
    <vue-grid-row v-if="!online">
      <vue-grid-item>
        <p> {{
          $t('App.network.offline' /* Network Offline */) }}</p>
      </vue-grid-item>
    </vue-grid-row>
    <vue-button v-if="!online">Try reconnecting</vue-button>
  </vue-grid>
</template>

<script>
export default {
  props: ["online"],
  metaInfo: {
    title: "Network State",
    meta: [
      {
        name: "",
        content: ""
      }
    ]
  },
  name: "Network"
};
</script>

<style scoped>
</style>
