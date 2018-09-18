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
  import {mapActions, mapGetters, mapMutations, mapState} from 'vuex';
  import * as types from '../store/types'
  import {store} from '../store';

  export default {
    name: 'SwitchToMainNetModal',
    created() {
      this.updateMainnetModalState()
    },
    methods: {
       ...mapActions({
        openNetworkModal: types.OPEN_NETWORK_MODAL,
        closeNetworkModal: types.CLOSE_NETWORK_MODAL,
      }),
      ...mapMutations({
        updateMainnetModalState: types.SET_NETWORK_MODAL_OPEN
      })
    },
    computed: {
      ...mapGetters({
        show: types.IS_NETWORK_MODAL_OPEN
      }),
    }
  };
</script>

<style lang="scss" module>
  .switchToMainNetModal {
    display: block;
  }
</style>
