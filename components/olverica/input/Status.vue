<template>
  <label class="ol-input__title">
    {{ title }} 

    <span 
      class="ol-input__counter"
      :class="{'ol-input__counter--shown': shown}">

      {{ counter }}
    </span>
  </label>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'

export default Vue.extend({
  props: {
    errors: {type: Array as PropType<string[]>, default: () => []},

    label: {type: String as PropType<string>, default: ''},

    entry: {type: String as PropType<string>, default: ''},

    max: {type: Number as PropType<number>,  default: -1}
  },

  data() {
    return {
      shownAt: 0.8
    }
  },

  computed: {
    length(): number {
      return this.entry.length;
    },

    counter(): string {
      return this.max > 0 ? 
        `${this.length}/${this.max}` : `${this.length}`;
    },

    shown(): boolean {
      if (this.max < 0)
        return true;

      if (this.length / this.max > this.shownAt)
        return true;

      return false;
    },

    title(): string {
      return this.label;
    },
  }
})
</script>