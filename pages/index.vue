<template>
  <main>
    <olverica-form
      @submit="request">

      <olverica-input
        :maxlength="12"/>
        
      <olverica-textarea
        :maxlength="5"/>

      <olverica-radio
        :title="'Prop'"
        :value="1"/>

      <olverica-radio
        :title="'Data'"
        :value="2"/>

      <olverica-radio
        :title="'Meth'"
        :value="3"/>

      <olverica-checkbox/>

      <olverica-switch/>

      <olverica-select
        :map="selecProps"/>

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

  private value = '';

  private selecProps = [
    {label: 'I am senslessssssssss', value: 1},
    {label: 'I am senslessssssss', value: 2},
    {label: 'I am senslessssss', value: 3},
    {label: 'I am senslessss', value: 4},
  ]

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