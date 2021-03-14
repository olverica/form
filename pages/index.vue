<template>
  <main>
    <olverica-form
      @submit="request">

      <olverica-input/>

      <fieldset class="ol-field ol-field--textarea">
        <label class="ol-field__title">Comment<span class="ol-field__counter">0/180</span></label>
      </fieldset>


      <olverica-radio-button/>

      <olverica-checkbox/>

      <olverica-submit-button/>

    </olverica-form>

    <code>
      {{ value }}
    </code>

  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import {Data} from 'services/types'

export default Vue.extend({
  data() {
    return {
      value: null as any
    }
  },

  methods: {
    request(data: Data, error: () => void) {
      this.value = JSON.stringify(data);
    }
  }
})
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
  word-break: break-all

</style>