<template>
  <fieldset 
    class="ol-field-defaults ol-field ol-field--select"
    :class="{'ol-field--active': active,
             'ol-field--error': failed,
             'ol-field--focused': active}"
    v-click-outside="hide"
    @click="toggle">

    <label class="ol-field__select_title">{{ label }}</label>
  
    <div 
      class="ol-field__select_body"
      @mouseover="focus"
      @mouseleave="blur">

      <span 
        class="ol-field__select_placeholder"
        @click="select(-1)">

        select your option
      </span>

      <span 
        v-for="({label}, index) of this.map"
        :key="index"

        class="ol-field__select_option"
        :class="{'ol-field__select_option--selected': isSelected(index)}"
        
        @click="select(index)">
        
        {{ label }}
      </span>
    </div>
  </fieldset>
</template>

<script lang="ts">
import {Field, Form, isForm, Validatable} from '~/services/types' 
import {Component, Inject, Prop} from 'vue-property-decorator'
import Vue from 'vue'


@Component
export default class OlvericaSelect extends Vue implements Field, Validatable {

  @Inject()
  readonly $form!: Form|null;

  @Prop({type: String, default: 'select'})
  readonly name!: string;

  @Prop({type: String, default: 'Select one option'})
  readonly title!: string;

  @Prop({type: Array, default: () => ([])} )
  readonly map!: {label: string, value: unknown}[]

  @Prop({type: Number, default: -1})
  readonly default!: number;

  @Prop({type: Boolean, default: false})
  readonly optinal!: boolean;

  private selected = -1;
  
  private focused = false;

  private active = false;

  private validated = false;

  get form(): Form|null {
    let form = this.$form;
    return isForm(form) ? form : null;
  }

  get failed(): boolean {
    return this.validated && !!!this.optinal && this.selected === -1;
  }

  get label(): string {
    if (this.selected <= -1 || this.selected >= this.map.length)
      return this.title;

    let item = this.map[this.selected];
    return item.label
  }

  mounted() {
    this.selected = this.default
    this.register();
  }

  isSelected(index: number): boolean {
    return !!!this.focused && this.selected === index;
  }
  
  select(index: number) {
    this.selected = index;
  }

  toggle(): void {
    this.active = !!!this.active;
  }

  hide() {
    this.active = false;
  }

  focus() {
    this.focused = true;
  }

  blur() {
    this.focused = false;
  }

  validate(): boolean {
    this.validated = true;
    return !!!this.failed;
  }

  register() {
    this.form?.register(this);
  }

  valuable(): boolean {
    if (this.optinal && this.selected === -1)
      return false;

    return true;
  }

  compute(): unknown {
    let item = this.map[this.selected]
    return item.value;
  }

  dirty(): boolean {
    return this.default === this.selected;
  }
}
</script>