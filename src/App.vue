<template>
  <div id="app">
    <navbar/>
    <hello-metamask/>
    <router-view />
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
    console.log('registerWeb3 Action dispatched from app.vue')
    this.$store.dispatch('registerWeb3')
  },
  components: {
    'navbar': Navbar,
    'hello-metamask': HelloMetamask,
    'travay-footer': TravayFooter,
  }
}
</script>

<style>

</style>
