<template>
  <label class="ol-field__title">
    {{ title }} 

    <span 
      class="ol-field__counter"
      :class="{'ol-field__counter--shown': shown}">

      {{ counter }}
    </span>
  </label>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import Vue from 'vue'

@Component
export default class Status extends Vue {

  @Prop({type: Array, default: () => []})
  readonly errors!: string[];

  @Prop({type: String, default: ''})
  readonly label!: string;

  @Prop({type: String, default: ''})
  readonly entry!: string;

  @Prop({type: Number,  default: -1})
  readonly maxlength!: number;

  private shownAt = 0.7;

  get length(): number {
    return this.entry.length;
  }

  get counter(): string {
    return this.maxlength > 0 ? 
      `${this.length}/${this.maxlength}` : `${this.length}`;
  }

  get shown(): boolean {
    if (this.length / this.maxlength > this.shownAt)
      return true;

    return false;
  }

  get title(): string {
    if (this.errors.length)
      return this.errors[0];

    return this.label;
  }
}
</script>