<template>
  <fieldset 
    class="ol-field ol-field--input"
    :class="{
      'ol-field--focused': focused,
      'ol-field--active': active, 
      'ol-field--success': passed,
      'ol-field--error': failed}"
    @click="focus">
    
    <olverica-input-icon
      :type="icon || type"/>

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
import {Form, Rule, Validation, isForm} from '~/services/types' 


export default Vue.extend({
  
  inject: {
    $form: {default: undefined}
  },

  props: {
    countable: {type: Boolean as PropType<boolean>, default: true},

    hideable: {type: Boolean as PropType<boolean>, default: true},

    rules: {type: Array as PropType<Rule[]>, default: () => []},

    placeholder: {type: String as PropType<string>, default: 'placeholder'},
    
    default: {type: String as PropType<string>, default: ''},

    title: {type: String as PropType<string>, default: 'Title'},

    type: {type: String as PropType<string>, default: 'email'},

    name: {type: String as PropType<string>, default: 'field'},

    icon: {type: String as PropType<string>, default: ''},
  },

  data() {
    return {
      entry: '',

      config: null,
      validator: new Validator(),

      hidden: false,
      focused: false,
    }
  },

  computed: {
    form(): Form|null {
      let form = (this as any).$form;
      return isForm(form) ? form : null;
    },

    active(): boolean {
      return this.focused || Boolean(this.entry.length);
    },

    failed(): boolean {
      return this.validator.state === Validation.Failed;
    },

    passed(): boolean {
      return this.validator.state === Validation.Passed;
    },

    errors(): string[] {
      return this.validator.errors;
    },

    warnings(): string[] {
      return this.validator.warnings;
    },
  },

  mounted() {
    this.entry = this.default;

    this.restrict();
    this.register();
  },

  methods: {
    focus(): void {
      let el = this.$el.querySelector('input')
      el?.focus();
    },

    restrict() {
      this.validator.rules =  [
        new Max(4), new Min(2)
      ];
    },

    register() {
      this.form?.register(this);
    },

    compute(): string {
      return this.entry
    },

    dirty(): boolean {
      return this.default !== this.entry;
    },

    validate(): Validation {
      return this.validator.check(this.entry);
    },

    check() {
      return this.entry.length ? 
        this.validate(): this.validator.clear();
    },
  }
})
</script>