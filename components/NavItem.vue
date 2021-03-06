<template>
  <NuxtLink :to="url">
    <li class="nav-list">{{ title }}</li>
  </NuxtLink>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class NavItem extends Vue {
  @Prop(String) title: string
  @Prop(String) url: string
}
</script>

<style scoped lang='postcss'>
.nav-list {
  @apply p-2 px-4 bg-blue-600 hover:bg-blue-400 duration-150 list-none mr-4 rounded-md;
}
</style>