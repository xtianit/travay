<template>
  <h1>Jobs</h1>
</template>

<script>
  import {sponsorSubmitMixin} from "../mixins/sponsorSubmitMixin";

  export default {
    mixins: [sponsorSubmitMixin],
    metaInfo: {
      title: "Jobs",
      meta: [
        {
          name: "Jobs",
          content: "Jobs in Travay."
        }
      ]
    },
    name: 'jobs'
  }
</script>

<style scoped>

</style>
