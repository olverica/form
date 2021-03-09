<template>
  <form @submit.prevent="">
    <slot/>
  </form>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'
import {Field, Request} from '@/services/types'

export default Vue.extend({
  props: {
    request: {type: Function as PropType<Request|null>, default: null},
  },

  data () {
    return {
      fields: [] as Field[]
    }
  },

  provide(): any {
    return {
      $form: this
    }
  },


  methods: {
    contains(target: Field): boolean {
      for (let field of this.fields) {
        if (field.name === target.name)
          return true;
      }

      return false;
	  },

    register(field: Field): void {
      if (this.contains(field))
        throw Error(`Field with name ${field.name} has been already registered`)
      
      this.fields.push(field);
    },

    detach(field: Field): void {
      let index = this.fields.indexOf(field);
      if (index !== -1)
        throw Error(`Cant find field`)

      this.fields.splice(index, 1);
    },

    validate(): boolean {
      return false;
    },

    submit() {

    }
  }
})
</script>