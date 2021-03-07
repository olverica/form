<template>
  <span 
    class="ol-input__counter"
    :class="{'ol-input__counter--shown': shown}">

    {{ counter }}
  </span>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'

export default Vue.extend({
  props: {
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

    shown() {
      if (this.max < 0)
        return true;

      if (this.length / this.max > this.shownAt)
        return true;

      return false;
    }
  }
})
</script>