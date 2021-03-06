<template>
  <button
    class="p-2 px-4 rounded-md m-1 focus:outline-none outline-none focus:ring-4 duration-150"
    :class="[
      category == 0
        ? 'bg-gray-700 hover:bg-gray-500'
        : category == 1
        ? 'bg-blue-700 hover:bg-blue-500'
        : 'bg-red-700 hover:bg-red-500',
    ]"
  >
    {{ name }}
  </button>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class Button extends Vue {
  @Prop(Number) category: number
  @Prop(String) name: string | number
}
</script>

<style scoped lang='postcss'>
</style>