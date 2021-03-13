<template>
  <component :is="tag">
    <slot  
      :warnings="warnings"
      :errors="errors"
      :failed="failed"
      :passed="passed"/>
  </component>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'
import {Rule, Validation} from '~/services/types' 

export default Vue.extend({
  props: { 
    tag: {type: [String, Object] as PropType<string|object>, default: 'div'},
    
    rules: {type: Array as PropType<Rule[]>, default: []}
  },

  data() {
    return {
      warnings: [] as string[],
      errors: [] as string[],
      state: Validation.Unknown
    }
  },

  methods: {
     check(value: any): Validation {
        this.warnings = [];
        this.errors = [];

        // traversing rules
        let pushError =  this.errors.push.bind(this.errors);
        let pushWarning = this.warnings.push.bind(this.warnings);
        
        for (let rule of this.rules)
            rule.check(value, pushError, pushWarning);
        
        this.state = this.errors.length ?
            Validation.Failed : Validation.Passed;

        return this.state;
    },

    clear() {
        this.warnings = [];
        this.errors = [];

        this.state = Validation.Unknown;
    }
  }
})
</script>