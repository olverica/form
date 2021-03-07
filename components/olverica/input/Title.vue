<template>
  <label class="ol-field__title">
    {{ title }} 

    <olverica-input-counter
      v-if="countable"/>
  </label>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'

export default Vue.extend({
  props: {
    countable: {type: Boolean as PropType<boolean>, default: false},

    errors: {type: Array as PropType<string[]>, default: () => []},

    label: {type: String as PropType<string>, default: ''},
  },

  computed: {
    title() {
      return this.label;
    }
  }
})
</script>