<template>
  <button @click="submit">
    C O N F I R M
  </button>
</template>

<script lang="ts">
import {Form, isForm} from '~/services/types' 

import Vue from 'vue'
export default Vue.extend({
  inject: {
    $form: {default: undefined}
  },

  computed: {
     form(): Form|null {
      let form = (this as any).$form;
      return isForm(form) ? form : null;
    }
  },

  methods: {
    submit() {
      console.log(123);

      this.form?.submit();
    }
  }
})
</script>

<style lang="sass" scoped>

button
  width: 100%
  height: 60px
  font-size: 20px
  border-radius: 20px
  background: #635f5f
  color: white 

</style>