<template>
  <div 
    class="ol-field__textarea"
    contenteditable

    :maxlength="maxlength"
    :value="entry"

    @blur="onblur"
    @focus="onfocus"
    @input="oninput"
    @paste="onpaste"
    @keypress="onkeypress">
  </div>
</template>

<script lang="ts">
import {Component, Prop, Watch} from 'vue-property-decorator'
import Vue from 'vue'

@Component
export default class Entry extends Vue {

  @Prop({type: Boolean , default: false})
  readonly focused!: boolean; 
  
  @Prop({type: String, default: ''})
  readonly entry!: string;
  
  @Prop({type: Number,  default: null})
  readonly maxlength!: number|null;

  private static readonly allowedKeys =  [
    {code: 'ArrowRight'}, 
    {code: 'ArrowDown'},  
    {code: 'ArrowLeft'}, 
    {code: 'ArrowUp'},
      
    {code: 'Backspace'},  
    {code: 'Ctrl'},
    {code: 'Enter'},
    {code: 'Tab'},
      
    {code: 'KeyC', ctrl: true}, 
    {code: 'KeyA', ctrl: true}
  ]

  get textarea(): HTMLElement {
    if (this.$el instanceof HTMLElement) 
      return this.$el;
      
    throw Error('Cant find textarea')
  }

  @Watch('focused')
  onFocusChanged(value: boolean) {
    if (value)
      this.textarea?.focus();
  }

  onfocus(): void {
    this.$emit('update:focused', true);
  }

  onblur(): void {
    this.$emit('validate');
    this.$emit('update:focused', false);
  }

  oninput(): void {
    this.$emit('update:entry', this.textarea.innerText);
  }

  onsubmit(event: KeyboardEvent): void {
    if (event.shiftKey)
      return;
    
    event.preventDefault();
    this.$emit('submit');
  }

  isAllowedKeyEvent(event: KeyboardEvent): boolean {
    for (let key of Entry.allowedKeys) {
      if (key.code !== event.code)
        continue

      if (key.ctrl && !!!event.ctrlKey) 
        continue;

      return true;
    }

    return false;
  }

  onkeypress(event: KeyboardEvent) {
    if (this.maxlength === null)
      return;

    if (this.isAllowedKeyEvent(event))
      return;

    let entry = this.textarea.innerText;
    if (entry.length < this.maxlength)
      return;

    event.preventDefault();
  }

  onpaste(event: ClipboardEvent) {
    if (this.maxlength === null)
      return;

    if (event.clipboardData === null)
      return event.preventDefault();

    let merged = 
      event.clipboardData.getData('Text') + this.textarea.innerText;

    if (merged.length > this.maxlength)
      return event.preventDefault();
  }
}
</script>