<template>
  <footer id="sticky-footer">&copy; {{ year }} Acme Corp.</footer>
</template>

<script>
  export default {
    name: 'travay-footer',
    computed: {
      year: function() {
        return this.year = new Date().getFullYear();
      }
    }
  }
</script>

<style scoped>
  #sticky-footer {
    width: 100%;
    padding: 5px;
    background: rgba(0, 0, 0, .25);
    color: white;
    font-weight: bold;
    font-size: 15px;
    text-align: center;
    position: fixed; /*Here's what sticks it*/
    bottom: 0; /*to the bottom of the body*/
    left: 0; /*and to the left of the body.*/

    /*EFFECTS*/
    transition: .33s linear;
  }
</style>
