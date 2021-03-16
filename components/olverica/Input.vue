<template>
  <fieldset 
    class="ol-field-defaults ol-field ol-field--input"
    :class="{
      'ol-field--focused': focused,
      'ol-field--active': active, 
      'ol-field--success': passed,
      'ol-field--error': failed}"
    @click="focus">
    
    <olverica-input-icon
      :type="icon || type"/>

    <div class="ol-field__wrapper">
      <olverica-text-title
        :maxlength="maxlength"
        :entry="entry"
        :errors="errors"
        :label="title"/>

      <olverica-input-entry
        :focused.sync="focused"
        :entry.sync="entry"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :hidden="hidden"
        @validate="check"/>
    </div>

    <olverica-input-visibility
      v-if="hideable"
      v-model="hidden"/>

  </fieldset>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import TextField from '~/mixins/olverica/TextField'

@Component
export default class OlvericInput extends TextField {

  @Prop({type: Boolean, default: true})
  readonly hideable!: boolean;

  @Prop({type: String, default: ''})
  readonly type!: string;

  @Prop({type: String, default: 'input'})
  readonly name!: string;

  @Prop({type: String, default: ''})
  readonly icon!: string;

  private hidden = false;

  focus() {
    // To prevent errors in events order
    this.$el.querySelector('input')?.focus();
  }
}
</script>