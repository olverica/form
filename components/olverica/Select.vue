<template>
  <fieldset 
    class="ol-field-template ol-field ol-field--select"
    :class="{'ol-field--active': active,
             'ol-field--focus': active,
             'ol-field--error': failed}"

    v-click-outside="blur"
    tabindex="0"

    @click="toggle"
    @keyup.enter.stop="submit">

    <label class="ol-field__title">{{ label }}</label>
  
    <div 
      class="ol-field__select"
      @mouseover="onMouseOver"
      @mouseleave="onMouseLeave">

      <div class="ol-field__wrapper">
        <span 
          class="ol-field__option--placeholder"
          @click="select(-1)">

          select your option
        </span>

        <span 
          v-for="({label}, index) of this.map"
          :key="index"

          class="ol-field__option"
          :class="{'ol-field__option--selected': isSelected(index)}"
          
          @click="select(index)">
          
          {{ label }}
        </span>
      </div>

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
  
  private mouseOver = false;

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

  onMouseOver() {
    this.mouseOver = true;
  }

  onMouseLeave() {
    this.mouseOver = false;
  }

  isSelected(index: number): boolean {
    return !!!this.mouseOver && this.selected === index;
  }
  
  select(index: number) {
    this.selected = index;
  }

  toggle(): void {
    this.active = !!!this.active;
  }

  blur() {
    this.active = false;
  }

  focus() {
    if (this.$el instanceof HTMLElement)
      this.$el.focus();

    this.active = true;
  }

  register() {
    this.form?.register(this);
  }

  submit() {
    this.blur();
    this.form?.submitField(this);
  }

  validate(): boolean {
    this.validated = true;
    return !!!this.failed;
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