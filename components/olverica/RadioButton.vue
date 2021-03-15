<template>
  <fieldset class="ol-radio-defaults ol-controls">
    <button 
      class="ol-controls__radio"
      :class="{'ol-controls__radio--active': active}"
      @click="toggle">
    </button>

    <label class="">{{ label }}</label>
  </fieldset>
</template>


<script lang="ts">
import {Component, Inject, Prop} from 'vue-property-decorator'
import {Field, Form, isForm} from '~/services/types'
import Vue from 'vue'

@Component
export default class RadioButton extends Vue implements Field {
  
  @Inject() 
  readonly $form!: Form|null;

  @Prop({type: Boolean, default: false})
  readonly default!: boolean; 

  @Prop({type: String, default: 'choose me!'})
  readonly label!: boolean; 
  
  @Prop({type: String, default: 'radio'})
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