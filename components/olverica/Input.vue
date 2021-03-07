<template>
  <fieldset 
    class="ol-field ol-field--input"
    :class="{
      'ol-field--focused': focused,
      'ol-field--active': active}"
    @click="onClick">
    
    <i class="ol-field__icon ol-field__icon--email"></i>

    <div class="ol-field__wrapper">
      <olverica-input-title
        :countable="countable"
        :label="title"/>

      <input 
        ref="input"
        class="ol-field__input" 

        v-model="entry"
        :placeholder="placeholder"
        :type="inputType"

        @focus="onFocus"
        @blur="onBlur">
    </div>

    <olverica-input-visibility
      v-if="hideable"
      v-model="hidden"/>

  </fieldset>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'
import {Form} from '~/services/Form' 
import {TextField} from '~/services/Fields' 

export default Vue.extend({
  inject: {
    form: { default: undefined }
  },

  props: {
    countable: {type: Boolean as PropType<boolean>, default: true},

    hideable: {type: Boolean as PropType<boolean>, default: true},

    placeholder: {type: String as PropType<string>, default: 'placeholder'},

    title: {type: String as PropType<string>, default: 'Title'},

    type: {type: String as PropType<string>, default: 'email'},

    icon: {type: String as PropType<string>, default: 'account_circle'},
  },

  data() {
    return {
      input: new TextField(),

      hidden: false,
      focused: false,

      entry: '',
    }
  },

  computed: {
    inputType(): string {
      return (this.hideable && this.hidden) ? 'password' : this.type;
    },

    active(): boolean {
      return this.focused || Boolean(this.entry.length);
    },
  },

  mounted() {
    let $this = this as any;

    if ($this.form instanceof Form)
      $this.form.register(this.input);
  },

  methods: {
    onFocus() {
      this.focused = true;
    },

    onBlur() {
      this.focused = false;
    },

    onClick() {
      if (this.focused || this.active)
        return;

      let input = this.$refs.input;
      if (input instanceof HTMLInputElement)
        input.focus();
    }
  }
})
</script>