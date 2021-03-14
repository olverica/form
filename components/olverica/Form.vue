<template>
  <form @submit.prevent="">
    <slot/>
  </form>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'
import {Data, Field, isValidatable} from '@/services/types'

export default Vue.extend({

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
        throw Error(`Field with name ${field.name} has already been registered`)
      
      this.fields.push(field);
    },

    detach(field: Field): void {
      let index = this.fields.indexOf(field);
      if (index !== -1)
        throw Error(`Cant find field`)

      this.fields.splice(index, 1);
    },

    dirty(): boolean {
      for (let field of this.fields) {
        if (field.dirty())
          return true;
      }

      return false;
    },

    handleError(): void {
      
    },

    validate(): boolean {
      let validated = true;

      for (let field of this.fields) {
        if (!!!isValidatable(field)) 
          continue

        if (!!!field.validate())
          validated = false;
      }
  
      return validated;
    },
    

    collect(): Data {
      let data: Data = {};

      for (let field of this.fields) {
        if (!!!field.valuable())
          continue;

        let name = field.name;
        if (data[name])
          throw Error(`Value with name ${name} has already been added`)   

        let value = field.compute();
        data[name] = value;
      }

      return data;
    },

    submit(): void {
      if (!!!this.validate())
        return;

      let data = this.collect();

      this.$emit('submit', data, this.handleError);
    },
  }
})
</script>

<style lang="sass" scoped> 
  
  form
    display: grid
    gap: 20px

</style>