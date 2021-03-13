<template>
  <button style="width: 100%; height: 20px">
    Confirm
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
      this.form?.submit();
    }
  }
})
</script>