<template>
  <fieldset 
    class="ol-field ol-field--input"
    :class="{
      'ol-field--focused': focused,
      'ol-field--active': active, 
      'ol-field--success': passed,
      'ol-field--error': failed}"
    @click="focus">
    
    <i class="ol-field__icon ol-field__icon--email"></i>

    <div class="ol-field__wrapper">
      <olverica-input-status
        :countable="countable"
        :label="title"
        :errors="errors"/>

      <olverica-input-entry
        :focused.sync="focused"
        :entry.sync="entry"
        :placeholder="placeholder"
        :hidden="hidden"
        @validate="check"/>
    </div>

    <olverica-input-visibility
      v-if="hideable"
      v-model="hidden"/>

  </fieldset>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'
import {Max, Min} from '~/services/Rules';
import {Validator} from '~/services/Validator';
import {Form, Rule, Validation} from '~/services/types' 


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

    name: {type: String as PropType<string>, default: 'field'},

    icon: {type: String as PropType<string>, default: 'account_circle'},
  },

  data() {
    return {
      entry: '',
      validator: new Validator(),
      validation: Validation.Unknown,

      hidden: false,
      focused: false,
      
      errors: [] as string[],
      warnings: [] as string[],
    }
  },

  computed: {
    failed(): boolean {
      return this.validation === Validation.Failed;
    },

    passed(): boolean {
      return this.validation === Validation.Passed;
    },

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
    this.restrict();
    this.register();
  },

  methods: {
    focus(): void {
      let el = this.$el.querySelector('input')
      if (el !== null)
        el.focus();
    },

    restrict() {
      this.validator.rules =  [
        new Max(4), new Min(2)
      ]
    },

    register() {
      this.form?.register(this);
    },

    compute(): string {
      return this.entry
    },

    check() {
      if (this.entry.length)
        return this.validate()

      this.validation = Validation.Unknown;
      this.warnings = [];
      this.errors = [];
    },

    validate(): Validation {
      this.warnings = [];
      this.errors = [];
  
      this.validation = 
        this.validator.check(this.entry, this.errors);

      return this.validation;
    }
  }
})
</script>