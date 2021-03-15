<template>
  <fieldset class="ol-checkbox-defaults ol-controls">
    <button 
      class="ol-controls__checkbox"
      :class="{'ol-controls__checkbox--active': active}"
      @click="toggle">
    </button>

    <label class="ol-controls__title">{{ label }}</label>
  </fieldset>
</template>



<script lang="ts">
import {Component, Inject, Prop} from 'vue-property-decorator'
import {Field, Form, isForm} from '~/services/types'
import Vue from 'vue'

@Component
export default class Checkbox extends Vue implements Field{
  
  @Inject() 
  readonly $form!: Form|null;

  @Prop({type: Boolean, default: false})
  readonly default!: boolean; 

  @Prop({type: String, default: 'check me!'})
  readonly label!: boolean; 

  @Prop({type: String, default: 'checkbox'})
  readonly name!: string; 

  private active: boolean = false;

  get form(): Form|null {
    let form = this.$form;
    return isForm(form) ? form : null;
  }

  mounted() {
    this.active = this.default;

    this.register();
  }

  register() {
    this.form?.register(this);
  }

  valuable(): boolean {
    return true;
  }

  compute(): boolean {
    return this.active;
  }

  dirty(): boolean {
    return this.default !== this.active;
  }

  toggle() {
    this.active = !!!this.active;
  }
}
</script>