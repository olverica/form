<template>
  <fieldset class="ol-radio-defaults ol-controls">
    <button 
      class="ol-controls__radio"
      :class="{'ol-controls__radio--active': active}"
      @click="toggle">
    </button>

    <label class="">{{ title }}</label>
  </fieldset>
</template>


<script lang="ts">
import {Component, Prop, Mixins} from 'vue-property-decorator'
import ControlField from '~/mixins/olverica/ControlField';
import {Radio, RadioGroup} from '~/services/Radio'

@Component
export default class RadioButton extends Mixins(ControlField) implements Radio {
  
  @Prop({type: String, default: 'choose me!'})
  readonly title!: string; 
  
  @Prop({type: String, default: 'radio'})
  readonly name!: string; 

  @Prop({default: true})
  readonly value!: unknown


  private group: RadioGroup|null = null;

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

