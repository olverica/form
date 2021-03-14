<template>
  <i 
    class="ol-field__icon"
    :class="'ol-field__icon--'+ type"/>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import Vue from 'vue'

@Component
export default class Icon extends Vue {
  @Prop({type: String, default: ''})
  readonly type!: string;
}
</script>