<template>
  <fieldset class="ol-radio-template ol-controls">
    <button 
      class="ol-controls__radio"
      :class="{'ol-controls__radio--active': active}"
      @click="toggle">
    </button>

    <label class="">{{ title }}</label>
  </fieldset>
</template>


<script lang="ts">
import {Component, Inject, Prop} from 'vue-property-decorator'
import {Radio, RadioGroup} from '~/services/Radio'
import {Field, Form, isForm} from '~/services/types'
import Vue from 'vue'

@Component
export default class RadioButton extends Vue implements Radio {
  
  @Inject() 
  readonly $form!: Form|null;

  @Prop({type: Boolean, default: false})
  readonly default!: boolean; 

  @Prop({type: String, default: 'choose me!'})
  readonly title!: boolean; 
  
  @Prop({type: String, default: 'radio'})
  readonly name!: string; 

  @Prop({default: true})
  readonly value!: unknown

  private active: boolean = false;

  private group: RadioGroup|null = null;

  get form(): Form|null {
    let form = this.$form;
    return isForm(form) ? form : null;
  }

  mounted() {
    this.active = this.default;

    this.register();
  }

  disable() {
    this.active = false;
  }

  select() {
    this.active = true;
  }

  toggle() {
    if (!!!this.active)
      this.group?.select(this);
  }

  compute(): unknown {
    return this.value;
  }

  register() {
    if (this.form === null)
      return;
      
    let founded = this.form.find(this.name);
    
    // Creating new group
    if (founded === null) {
      this.group = new RadioGroup(this.name)
      this.form.register(this.group);
    }

    // Appending to existed
    else if (founded instanceof RadioGroup) {
      this.group = founded;
    }
    
    // Founded instance is not group so we cant append radio
    else throw Error('Cant register the radio')


    this.group!.append(this);
  }
}
</script>