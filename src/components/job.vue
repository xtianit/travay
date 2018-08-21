<template>
  <h1>Job</h1>
</template>

<script>
  import {sponsorSubmitMixin} from "../mixins/sponsorSubmitMixin";

  export default {
    mixins: [sponsorSubmitMixin],
    metaInfo: {
      title: "Job",
      meta: [
        {
          name: "Details of a job",
          content: ""
        }
      ]
    },
    name: 'job'
  }
</script>

<style scoped>

</style>
