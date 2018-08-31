<template>
  <div :class="$style.sponsorModal">
    <vue-modal :show="show" @close="$emit('update:show', false)">
      <vue-button warn @click="$emit('update:show', false)">X</vue-button>
      <vue-input
        name="sponsorAmount"
        id="sponsorAmount"
        required
        placeholder="Enter Amount"
        validation="required"
        type="number"
        v-model="sponsorAmount" />

      <vue-button primary @click.prevent.stop="clickHandler">Sponsor</vue-button>
    </vue-modal>
  </div>
</template>

<script>
  export default {
    name: 'SponsorModal',
    props: {
      show: {
        type: Boolean,
        required: true,
        default: false
      },
      job: {
        type: Object,
        required: true,
        default: () => {}
      }
    },
    data() {
      return {
        sponsorAmount: ''
      };
    },
    computed: {},
    methods: {
      clickHandler() {
        this.$emit('sponsorSubmit', this.sponsorAmount);
        this.sponsorAmount = '';
      }
    }
  };
</script>

<style lang="scss" module>
  .sponsorModal {
    display: block;
  }
</style>
