<template>
  <input 
    ref="input"
    class="ol-field__input" 

    :maxlength="maxlength"
    :type="inputType"
    :value="entry"

    @blur="onblur"
    @focus="onfocus"
    @input="oninput"
    @keyup.enter.stop="submit">
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import Vue from 'vue'

@Component
export default class Entry extends Vue {

  @Prop({type: Boolean , default: false})
  readonly focused!: boolean; 

  @Prop({type: Boolean, default: false})
  readonly  hidden!: boolean;
  
  @Prop({type: String, default: 'text'})
  readonly type!: string;

  @Prop({type: String, default: ''})
  readonly entry!: string;
  
  @Prop({type: Number,  default: null})
  readonly maxlength!: number|null;


  private blurTimeout: NodeJS.Timeout|null = null;

  private blurDelay = 200;

  get inputType(): string {
    return this.hidden ? 'password' : this.type;
  }

  preventBluring(): void {
    if (this.blurTimeout === null)
      return;
      
    clearTimeout(this.blurTimeout);
    this.blurTimeout = null;
  }

  onfocus(): void {
    this.preventBluring();
    this.$emit('update:focused', true);
  }

  onblur(): void {
    this.preventBluring();
    this.$emit('validate');
      
    this.blurTimeout = setTimeout(() => 
      this.$emit('update:focused', false), this.blurDelay);
  }

  oninput(event: InputEvent): void {
    let value = '';

    if (event.target instanceof HTMLInputElement)
      value = event.target.value;

    this.$emit('update:entry', value);
  }

  submit(): void {
    this.$emit('submit');
  } 
}
</script>