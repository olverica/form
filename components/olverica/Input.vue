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
import {Field, Form, Rule, Validation, isForm} from '~/services/types' 
import {Component, Inject, Prop} from 'vue-property-decorator'
import {Validator} from '~/services/Validator';
import {Max, Min} from '~/services/Rules';
import Vue from 'vue'

@Component
export default class OlvericInput extends Vue implements Field{
  
  @Inject()
  readonly $form!: Form|null;

  @Prop({type: Boolean, default: true})
  readonly countable!: boolean;

  @Prop({type: Boolean, default: true})
  readonly hideable!: boolean;

  @Prop({type: Array, default: () => []})
  readonly rules!: Rule[];

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
    let form = (this as any).$form;
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
      new Max(4), new Min(2)
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