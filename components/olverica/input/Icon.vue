<template>
  <i 
    class="ol-field__icon"
    :class="'ol-field__icon--'+ type"/>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'

export default Vue.extend({
  props: {
    type: {type: String as PropType<string>, default: ''}
  }
})
</script>