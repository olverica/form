<template>
  <input 
    ref="input"
    class="ol-field__input" 

    v-model="entry"
    :placeholder="placeholder"
    :type="inputType"

    @blur="onblur"
    @focus="onfocus"
    @input="oninput">
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'

export default Vue.extend({
  props: {
    focused: {type: Boolean as PropType<boolean>, default: false},

    hidden: {type: Boolean as PropType<boolean>, default: false},

    placeholder: {type: String as PropType<string>, default: 'text'},

    entry: {type: String as PropType<string>, default: ''},

    type: {type: String as PropType<string>, default: 'text'},
  },

  computed: {
    inputType(): string {
      return this.hidden ? 'password' : this.type;
    },
  },

  methods: {
    onfocus(): void {
      this.$emit('update:focused', true);
    },

    onblur(): void {
      this.$emit('update:focused', false);
    },

    oninput(event: InputEvent): void {
      let value = '';

      if (event.target instanceof HTMLInputElement)
        value = event.target.value;

      this.$emit('update:entry', value);
    }
  }
})
</script>