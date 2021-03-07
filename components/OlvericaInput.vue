<template>
  <fieldset class="ol-input ol-input--active ol-input--focused">
    <i class="ol-input__icon material-icons">{{ icon }}</i>

    <div class="ol-input__inner">
      <olverica-input-title
        :countable="countable"
        :label="title"/>

      <input 
        class="ol-input__field" 
        :placeholder="placeholder"
        :type="inputType">
    </div>

    <olverica-input-visibility
      v-if="hideable"
      v-model="hidden"/>

  </fieldset>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'
import {Form} from '~/services/Form' 
import {TextField} from '~/services/Fields' 

export default Vue.extend({
  inject: {
    form: { default: undefined }
  },

  data() {
    return {
      input: new TextField(),

      placeholder: 'placeholder',
      title: 'Title',
      type: 'email',
      icon: 'account_circle',

      countable: true,
      hideable: true,
      hidden: true
    }
  },

  computed: {
    inputType(): string {
      return (this.hideable && this.hidden) ? 'password' : this.type;
    }
  },

  mounted() {
    let $this = this as any;

    if ($this.form instanceof Form)
      $this.form.register(this.input);
  },

  methods: {

  }
})
</script>