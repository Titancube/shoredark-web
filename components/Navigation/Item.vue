<template>
  <NuxtLink :to="url">
    <li>{{ title }}</li>
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