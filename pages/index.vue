<template>
  <main>
    <olverica-form
      @submit="request">

      <olverica-input/>

      <fieldset class="ol-field-defaults ol-field ol-field--textarea">
        <label class="ol-field__title">
          Title
          <span class="ol-field__counter ol-field__counter--show">110/180</span>
        </label>
      </fieldset>

      <olverica-radio-button/>

      <olverica-checkbox/>

      <olverica-switch/>

      <olverica-submit-button/>

      <fieldset class="ol-field-defaults ol-field ol-field--select ol-field--active">
        <label class="ol-field__select_title">Select your option</label>
        <div class="ol-field__select_body">
          <span class="ol-field__select_option ol-field__select_option--selected">option L</span>
          <span class="ol-field__select_option">option G</span>
          <span class="ol-field__select_option">option B</span>
          <span class="ol-field__select_option">option T</span>
          <span class="ol-field__select_option">option Q</span>
          <span class="ol-field__select_option">option +</span>
        </div>
      </fieldset>

    </olverica-form>

    <code>{{ value }}</code>

  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import {Data} from 'services/types'
import {Component} from 'vue-property-decorator'

@Component
export default class IndexLayout extends Vue {
  
  private value: any = null;

  private request(data: Data, error: () => void) {
    let parsed = '';

    for (let [key, value] of Object.entries(data))
      parsed += `'${key}': ${value}\n`;

    this.value = parsed;
  }
}

</script>

<style lang="sass" scoped>
  
main
  width: 1200px
  margin: auto
  display: grid
  grid-template-columns: 1fr 1fr

code
  padding: 10px
  width: 100%
  min-height: 100%
  background: white
  white-space: pre

</style>