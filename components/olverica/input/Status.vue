<template>
  <label class="ol-field__title">
    {{ title }} 

    <span 
      class="ol-field__counter"
      :class="{'ol-field__counter--show': shown}">

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
  readonly max!: number;

  private shownAt = 0.8;

  get length(): number {
    return this.entry.length;
  }

  get counter(): string {
    return this.max > 0 ? 
      `${this.length}/${this.max}` : `${this.length}`;
  }

  get shown(): boolean {
    if (this.max < 0)
      return true;

    if (this.length / this.max > this.shownAt)
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