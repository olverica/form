<template>
  <button
    class="ol-field__button ol-field__button--shown"
    type="button"
    @click="toggle">
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: { type: Boolean, default: false}
  },

  computed: {
    icon(): string {
      return this.value ? 'remove_red_eye' : 'visibility_off';
    }
  },

  methods: {
    toggle(event: any) {
      this.$emit('input', !this.value);
    }
  }
})
</script>