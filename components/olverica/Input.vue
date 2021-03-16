<template>
  <fieldset 
    class="ol-field-defaults ol-field ol-field--input"
    :class="{
      'ol-field--focused': focused,
      'ol-field--active': active, 
      'ol-field--success': passed,
      'ol-field--error': failed}"
    @click="focus">
    
    <olverica-input-icon
      :type="icon || type"/>

    <div class="ol-field__wrapper">
      <olverica-text-title
        :maxlength="maxlength"
        :countable="countable"
        :entry="entry"
        :errors="errors"
        :label="title"/>

      <olverica-input-entry
        :focused.sync="focused"
        :entry.sync="entry"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :hidden="hidden"
        @validate="check"/>
    </div>

    <olverica-input-visibility
      v-if="hideable"
      v-model="hidden"/>

  </fieldset>
</template>

<script lang="ts">
import {Rule, Field, Form, isForm, Validatable} from '~/services/types' 
import {Component, Inject, Prop} from 'vue-property-decorator'
import {Validation, Validator} from '~/services/Validator'
import {Min} from '~/services/Rules';
import Vue from 'vue'

@Component
export default class OlvericInput extends Vue implements Field, Validatable {
  
  @Inject()
  readonly $form!: Form|null;

  @Prop({type: Number, default: null})
  readonly maxlength!: number|null;

  @Prop({type: Array, default: () => []})
  readonly rules!: Rule[];

  @Prop({type: Boolean, default: true})
  readonly countable!: boolean;

  @Prop({type: Boolean, default: true})
  readonly hideable!: boolean;

  @Prop({type: String, default: ''})
  readonly placeholder!: string;
  
  @Prop({type: String, default: ''})
  readonly default!: string;

  @Prop({type: String, default: 'Title'})
  readonly title!: string;

  @Prop({type: String, default: ''})
  readonly type!: string;

  @Prop({type: String, default: 'field'})
  readonly name!: string;

  @Prop({type: String, default: ''})
  readonly icon!: string;

  private validator = new Validator();
  
  private focused = false;

  private hidden = false;

  private entry = '';

  get form(): Form|null {
    let form = this.$form;
    return isForm(form) ? form : null;
  }

  get active(): boolean {
    return this.focused || Boolean(this.entry.length);
  }

  get failed(): boolean {
    return this.validator.state === Validation.Failed;
  }

  get passed(): boolean {
    return this.validator.state === Validation.Passed;
  }

  get errors(): string[] {
    return this.validator.errors;
  }

  get warnings(): string[] {
    return this.validator.warnings;
  }

  mounted() {
    this.entry = this.default;

    this.restrict();
    this.register();
  }

  focus(): void {
    let el = this.$el.querySelector('input')
    el?.focus();
  }

  restrict() {
    this.validator.rules =  [
      new Min(2)
    ];
  }

  register() {
    this.form?.register(this);
  }

  valuable(): boolean {
    return Boolean(this.entry.length)
  }

  compute(): string {
    return this.entry;
  }

  dirty(): boolean {
    return this.default !== this.entry;
  }

  validate(): boolean {
    let validated = this.validator.check(this.entry);

    return validated === Validation.Passed 
      ? true : false
  }

  check() {
    return this.entry.length ? 
      this.validate(): this.validator.clear();
  }
}
</script>