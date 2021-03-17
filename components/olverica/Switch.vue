<template>
  <fieldset class="ol-switch-template ol-controls">
    <button 
      class="ol-controls__switch"
      :class="{'ol-controls__switch--active': active}"
      @click="toggle">
    </button>

    <label class="">{{ title }}</label>
  </fieldset>
</template>


<script lang="ts">
import {Component, Prop, Mixins} from 'vue-property-decorator'
import ControlField from '~/mixins/olverica/ControlField';

@Component
export default class OlvericaSwitch extends Mixins(ControlField){
  @Prop({type: String, default: 'switch me!'}) 
  readonly title!: string;

  @Prop({type: String, default: 'switch'})
  readonly name!: string; 
}
</script>