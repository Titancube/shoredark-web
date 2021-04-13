<template>
  <div class="container flex-wrap">
    asdf
    <AtomsBtn name="Check Auth Status" @click.native="checkAuth()" />
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class admin extends Vue {
  layout() {
    return 'main'
  }

  checkAuth() {
    console.log(this.$accessor.fireUser.uid)
  }
}
</script>

<style scoped lang='postcss'>
</style>