<template>
  <div :class="$style.switchToMainNetModal">
    <vue-modal :show="show" @close="$emit('update:show', false)">
      <vue-button warn @click="$emit('update:show', false)">X</vue-button>

      <h1>Switch to Main Network</h1>

      <p>Please go to MetaMask and switch to the Main Network to process your transaction.</p>

    </vue-modal>
  </div>
</template>

<script>
  import {store} from '../store';

  export default {
    name: 'SwitchToMainNetModal',
    methods: {}
  };
</script>

<style lang="scss" module>
  .switchToMainNetModal {
    display: block;
  }
</style>
