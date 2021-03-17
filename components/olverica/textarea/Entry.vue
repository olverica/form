<template>
  <p 
    contenteditable

    @blur="onblur"
    @focus="onfocus"

    @input="oninput"
    @paste="onpaste"
    @keypress="onkeypress"
    @keydown.enter="onEnterDown"
    @keyup.enter.stop="onEnterUp">
  </p>
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

  private $focused = false;

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
  onFocusChange(value: boolean) {
    if (value === this.$focused)
      return;
    
    if (value)  {
      this.textarea?.focus();
      this.moveCarret();
    }
    else
      this.textarea?.blur();
  } 

  moveCarret() {
    let range = new Range();
    let selection = document.getSelection();
    let text = this.textarea.firstChild;

    if (!!!selection || !!!text || !!!text.textContent)
      return;

    range.setStart(text, text.textContent.length);

    selection.removeAllRanges();
    selection.addRange(range);
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

  onEnterDown(event: KeyboardEvent): void {
    if (!!!event.shiftKey)
      event.preventDefault();
  }

  onEnterUp(event: KeyboardEvent) {
    if (!!!event.shiftKey)
      this.$emit('submit');
  }

  onblur(): void {
    this.$focused = false;
    this.$emit('validate');
    this.$emit('update:focused', false);
  }

  onfocus(): void {
    this.$focused = true;
    this.$emit('update:focused', true);
  }


  oninput(): void {
    this.$emit('update:entry', this.textarea.innerText);
  }
}
</script>