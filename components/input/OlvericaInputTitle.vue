<template>
  <label class="ol-input__title">
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

    label: {type: String as PropType<string>, default: ''},

    errors: {type: Array as PropType<string[]>, default: () => []} 
  },

  computed: {
    title() {
      return this.label;
    }
  }
})
</script>