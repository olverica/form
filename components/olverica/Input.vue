<template>
  <fieldset 
    class="ol-field ol-field--input"
    :class="{
      'ol-field--focused': focused,
      'ol-field--active': active}"
    @click="onclick">
    
    <i class="ol-field__icon ol-field__icon--email"></i>

    <div class="ol-field__wrapper">
      <olverica-input-status
        :countable="countable"
        :label="title"/>

      <olverica-input-entry
        ref="input"
        :focused.sync="focused"
        :entry.sync="entry"
        :hidden="hidden"/>
    </div>

    <olverica-input-visibility
      v-if="hideable"
      v-model="hidden"/>

  </fieldset>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'
import {Form} from '~/services/Form' 
import {Rule} from '~/services/Rules' 
import {TextField} from '~/services/Fields' 


export default Vue.extend({
  
  inject: {
    form: {default: undefined}
  },

  props: {
    countable: {type: Boolean as PropType<boolean>, default: true},

    hideable: {type: Boolean as PropType<boolean>, default: true},

    rules: {type: Array as PropType<Rule[]>, default: () => []},

    placeholder: {type: String as PropType<string>, default: 'placeholder'},

    title: {type: String as PropType<string>, default: 'Title'},

    type: {type: String as PropType<string>, default: 'email'},

    icon: {type: String as PropType<string>, default: 'account_circle'},
  },

  data() {
    return {
      input: new TextField(),
      entry: '',

      focused: false,
      hidden: false,
    }
  },

  computed: {
    active(): boolean {
      return this.focused || Boolean(this.entry.length);
    },
  },

  mounted() {
    this.restrict();
    this.register();
  },

  methods: {
    register() {
      let $this = this as any;
      
      if ($this.form instanceof Form )
        $this.form.register(this.input);
    },

    restrict() {
      this.input.restrict(this.rules);
    },

    onclick() {
      if (this.focused || this.active)
        return;

      let input = (this.$refs.input as any).$el;
      input.focus();
    }
  }
})
</script>