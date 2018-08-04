<template>
  <div>
 <hello-metamask/>
 <home />
</div>
</template>
<script>
import HelloMetamask from '@/components/hello-metamask'
import Home from '@/components/home'

export default {
  name: 'travay',
  beforeCreate () {
    console.log('registerWeb3 Action dispatched from travay.vue')
    this.$store.dispatch('registerWeb3')
  },
  components: {
    'hello-metamask': HelloMetamask,
    'home': Home
  }
}
</script>
<style scoped>
</style>
