<template>
  <div>
    <hello-metamask/>
    <navbar />
    <home />
    <footer />
</div>
</template>
<script>
import HelloMetamask from "@/components/hello-metamask";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Home from "@/components/home";

export default {
  name: "travay",
  beforeCreate() {
    console.log("registerWeb3 Action dispatched from travay.vue");
    this.$store.dispatch("registerWeb3");
  },
  components: {
    "hello-metamask": HelloMetamask,
    "home": Home,
    "navbar": Navbar,
    "footer": Footer
  }
};
</script>

<style scoped>
</style>
