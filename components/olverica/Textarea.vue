<template>
  <fieldset 
    class="ol-field-defaults ol-field ol-field--textarea"
    :class="{
      'ol-field--focused': focused,
      'ol-field--active': active, 
      'ol-field--success': passed,
      'ol-field--error': failed}"
    @click="focus">

    <olverica-text-title
      :maxlength="maxlength"
      :entry="entry"
      :errors="errors"
      :label="title"/>

    <olverica-textarea-entry
      :focused.sync="focused"
      :entry.sync="entry"
      :placeholder="placeholder"
      :maxlength="maxlength"
      @submit="submit"
      @validate="check"/>

  </fieldset>
</template>

<script lang="ts">
import {Component, Mixins, Prop} from 'vue-property-decorator'
import TextField from '~/mixins/olverica/TextField'

@Component
export default class OlvericTextarea extends Mixins(TextField) {

  @Prop({type: String, default: 'textarea'})
  readonly name!: string;

}
</script>