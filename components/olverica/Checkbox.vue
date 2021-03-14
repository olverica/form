<template>
  <fieldset class="ol-checkbox-defaults ol-controls">
    <button 
      class="ol-controls__checkbox"
      :class="{'ol-controls__checkbox--active': active}"
      @click="toggle">
    </button>

    <label class="ol-controls__title">{{ label }}</label>
  </fieldset>
</template>


<script lang="ts">
import Vue, {PropType} from 'vue'
import {Form, isForm} from '~/services/types' 


export default Vue.extend({
  
  inject: {
    $form: {default: undefined}
  },

  props: {
    default: {type: Boolean as PropType<boolean>, default: false},
    
    label: {type: String as PropType<string>, default: 'check me!'},

    name: {type: String as PropType<string>, default: 'checkbox'},
  },

  data() {
    return {
      active: false
    }
  },

  computed: {
    form(): Form|null {
      let form = (this as any).$form;
      return isForm(form) ? form : null;
    }
  },

  mounted() {
    this.active = this.default;

    this.register();
  },

  methods: {
    register() {
      this.form?.register(this);
    },

    valuable(): boolean {
      return true;
    },

    compute(): boolean {
      return this.active;
    },

    dirty(): boolean {
      return this.default !== this.active;
    },

    toggle() {
      this.active = !!!this.active;
    },
  }
})
</script>