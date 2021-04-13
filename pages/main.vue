<template>
  <div>test</div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class main extends Vue {
  layout() {
    return 'main'
  }
}
</script>

<style scoped lang='postcss'>
</style>