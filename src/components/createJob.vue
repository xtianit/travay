<template>
<h1>Create Job</h1>
</template>

<script>
  import {sponsorSubmitMixin} from "../mixins/sponsorSubmitMixin";

  export default {
    mixins: [sponsorSubmitMixin],
    metaInfo: {
      title: "Post a Job",
      meta: [
        {
          name: "Post a Job",
          content: "Posting a job in Travay."
        }
      ]
    },
    name: 'createJob'
  }
</script>

<style scoped>

</style>
