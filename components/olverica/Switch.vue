<template>
  <fieldset class="ol-switch-defaults ol-controls">
    <button 
      class="ol-controls__switch"
      :class="{'ol-controls__switch--active': active}"
      @click="toggle">
    </button>

    <label class="">{{ label }}</label>
  </fieldset>
</template>


<script lang="ts">
import {Component, Inject, Prop} from 'vue-property-decorator'
import {Form, isForm} from '~/services/types'
import Vue from 'vue'

@Component
export default class OlvericaSwitch extends Vue {
  
  @Inject() 
  readonly $form!: Form|null;

  @Prop({type: Boolean, default: false})
  readonly default!: boolean; 

  @Prop({type: String, default: 'switch me!'}) 
  readonly label!: boolean; 

  @Prop({type: Boolean, default: false})
  readonly name!: 'switch'; 

  private active: boolean = false;

  get form(): Form|null {
    let form = (this as any).$form;
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