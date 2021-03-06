<template>
  <fieldset class="ol-input ol-input--active ol-input--focused">
    <i class="ol-input__icon material-icons">{{ icon }}</i>

    <div class="ol-input__inner">
      <label class="ol-input__title">
        {{ title }} 

        <span v-if="countable" class="ol-input__counter">
          {{ counter }}
        </span>
      </label>

      <input 
        class="ol-input__field" 
        :placeholder="placeholder"
        :type="inputType">
    </div>

    <button
      class="ol-input__button material-icons"
      @click="toggleVisibility">

      {{ visibilityIcon }}
    </button>
    
  </fieldset>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'
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
      visible: false
    }
  },

  computed: {
    counter(): string {
      return '0/666';
    },

    inputType(): string {
      return (this.hideable && !!!this.visible) ? 'password' : this.type;
    },

    visibilityIcon(): string {
      return this.visible ? 'visibility_off' : 'remove_red_eye';
    }
  },

  mounted() {
    this.form?.register(this.input);
  },

  methods: {
    toggleVisibility() {
      this.visible = !!!this.visible;
    }
  }
})
</script>