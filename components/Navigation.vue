<template>
  <nav
    class="bg-gray-800 w-full h-20 shadow-md text-white p-4 items-center flex fixed"
  >
    <ul class="list-none flex">
      <NavItem url="/" title="홈" />
      <NavItem url="/military" title="전역카운터" />
    </ul>
  </nav>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class Navigation extends Vue {}
</script>

<style scoped lang='postcss'>
</style>