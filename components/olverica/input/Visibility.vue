<template>
  <button
    class="ol-field__button"
    :class="{
      'ol-field__button--shown': value,
      'ol-field__button--hidden': !!!value}"
      
    type="button"
    @click="toggle">
  </button>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import Vue from 'vue'

@Component
export default class Visibility extends Vue {
  
  @Prop({type: Boolean, default: false})  
  readonly value!: boolean

  get icon(): string {
    return this.value ? 'remove_red_eye' : 'visibility_off';
  }

  toggle(event: any) {
    this.$emit('input', !this.value);
  }
}
</script>