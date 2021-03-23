<template>
  <button
    class="p-2 px-4 rounded-md m-1 focus:outline-none outline-none focus:ring-4 duration-150"
    :class="setButtonColor"
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

  get setButtonColor() {
    switch (this.category) {
      default:
      case 0:
        return ['bg-gray-700', 'hover:bg-gray-500']
      case 1:
        return ['bg-blue-700', 'hover:bg-blue-500']
      case 2:
        return ['bg-red-700', 'hover:bg-red-500']
    }
  }
}
</script>

<style scoped lang='postcss'>
</style>