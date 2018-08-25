<template>
  <div id="app" :class="$style.app">
    <navbar/>
    <hello-metamask/>
    <router-view :class="$style.content"/>
    <travay-footer/>
  </div>
</template>

<script>
  import HelloMetamask from '@/components/hello-metamask'
  import Navbar from '@/components/navbar'
  import TravayFooter from '@/components/travay-footer'

export default {
  name: 'App',
  beforeCreate () {
    // console.log('registerWeb3 Action dispatched from app.vue')
    this.$store.dispatch('registerWeb3')
  },
  components: {
    'navbar': Navbar,
    'hello-metamask': HelloMetamask,
    'travay-footer': TravayFooter,
  }
}
</script>

<style lang="scss" module>
  /*@import "./theme";*/
  @import "./theme/reset";
  @import "./theme/typo";
  @import "./theme/global";
  @import url($google-font);

  .app {
    min-height:     100vh;
    display:        flex;
    flex-direction: column;
  }

  .content {
    flex: 1;
    margin-top: 80px;
  }

</style>
