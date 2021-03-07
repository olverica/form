<template>
  <button
    class="ol-input__button material-icons"
    @click="toggle">

    {{ icon }}
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
    toggle() {
      this.$emit('input', !this.value);
    }
  }
})
</script>