<template>
  <form @submit.prevent="">
    <slot/>
  </form>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'
import {Form} from '~/services/Form' 

export default Vue.extend({
  props: {
    request: {
      default: null,
      type: Function as PropType<() => void | null>
    },
  },

  data () {
    return {
      form: new Form()
    }
  },

  provide() {
    return {
      form: this.form
    }
  },

  methods: {
    submit() {
      this.form.submit();
    }
  }
})
</script>