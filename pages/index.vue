<template>
  <main>
    <olverica-form
      @submit="request">

      <olverica-input/>

      <fieldset class="ol-field ol-field--textarea">
        <label class="ol-field__title">
          Title
          <span class="ol-field__counter ol-field__counter--show">110/180</span>
        </label>
      </fieldset>

      <olverica-radio-button/>

      <olverica-checkbox/>

      <olverica-switch/>

      <olverica-submit-button/>

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