<template>
  <fieldset class="ol-checkbox-defaults ol-controls">
    <button 
      class="ol-controls__checkbox"
      :class="{'ol-controls__checkbox--active': active}"
      @click="toggle">
    </button>

    <label class="ol-controls__title">{{ title }}</label>
  </fieldset>
</template>



<script lang="ts">
import {Component, Inject, Prop, Mixins} from 'vue-property-decorator'
import ControlField from '~/mixins/olverica/ControlField';

@Component
export default class Checkbox extends Mixins(ControlField) {
  @Prop({type: String, default: 'check me!'})
  readonly title!: string; 

  @Prop({type: String, default: 'checkbox'})
  readonly name!: string; 
}
</script>