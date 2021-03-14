<template>
  <input 
    ref="input"
    class="ol-field__input" 

    :value="entry"
    :type="inputType"

    @blur="onblur"
    @focus="onfocus"
    @input="oninput"
    @keyup.enter.stop="submit">
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'

export default Vue.extend({
  props: {
    focused: {type: Boolean as PropType<boolean>, default: false},

    hidden: {type: Boolean as PropType<boolean>, default: false},

    entry: {type: String as PropType<string>, default: ''},

    type: {type: String as PropType<string>, default: 'text'},
  },
  
  data() {
    return { 
      blurTimeout:  null as NodeJS.Timeout|null,
      blurDelay: 200
    }
  },

  computed: {
    inputType(): string {
      return this.hidden ? 'password' : this.type;
    }
  },

  methods: {
    preventBluring(): void {
      if (this.blurTimeout === null)
        return;
        
      clearTimeout(this.blurTimeout);
      this.blurTimeout = null;
    },

    onfocus(): void {
      this.preventBluring();
      this.$emit('update:focused', true);
    },

    onblur(): void {
      this.preventBluring();
      this.$emit('validate');
        
      this.blurTimeout = setTimeout(() => 
        this.$emit('update:focused', false), this.blurDelay);
    },

    oninput(event: InputEvent): void {
      let value = '';

      if (event.target instanceof HTMLInputElement)
        value = event.target.value;

      this.$emit('update:entry', value);
    },

    submit(): void {
      this.$emit('submit');
    } 
  }
})
</script>