<template>
  <fieldset 
    class="ol-field ol-field--input"
    :class="{
      'ol-field--focused': focused,
      'ol-field--active': active}"
    @click="focus">
    
    <i class="ol-field__icon ol-field__icon--email"></i>

    <div class="ol-field__wrapper">
      <olverica-input-status
        :countable="countable"
        :label="title"
        :errors="errors"/>

      <olverica-input-entry
        :placeholder="placeholder"
        :focused.sync="focused"
        :entry.sync="entry"
        :hidden="hidden"/>
    </div>

    <olverica-input-visibility
      v-if="hideable"
      v-model="hidden"/>

  </fieldset>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'
import {Form, Field} from '~/services/types' 

import {Rule, Max, Min} from '~/services/Rules' 

export default Vue.extend({
  
  inject: {
    $form: {default: undefined}
  },


  props: {
    countable: {type: Boolean as PropType<boolean>, default: true},

    hideable: {type: Boolean as PropType<boolean>, default: true},

    rules: {type: Array as PropType<Rule[]>, default: () => []},

    placeholder: {type: String as PropType<string>, default: 'placeholder'},

    title: {type: String as PropType<string>, default: 'Title'},

    type: {type: String as PropType<string>, default: 'email'},

    icon: {type: String as PropType<string>, default: 'account_circle'},
  },

  data() {
    return {
      name: '',
      focused: false,
      hidden: false,
      entry: '',

      errors: [] as string[]
    }
  },

  computed: {
    active(): boolean {
      return this.focused || Boolean(this.entry.length);
    },

    form(): Form|null {
      let injected = (this as any).$form;

      if (typeof injected === 'object' 
          && 'register' in injected 
          && 'submit' in injected)
          return injected;
        
        return null
    }
  },

  mounted() {
    this.register();
  },

  watch: {
    focused(value: boolean) {
      if (!!!value)
        this.validate();
    }
  },

  methods: {
    focus(): void {
      let el = this.$el.querySelector('input')
      if (el !== null)
        el.focus();
    },

    register() {
      if (this.form)
        this.form.register(this);
    },

    compute(): string {
      return this.entry
    },

    validate(): boolean {
      return false;
    }
  }
})
</script>