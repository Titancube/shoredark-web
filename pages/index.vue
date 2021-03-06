<template>
  <div class="container items-center text-center w-2/3 md:w-full">
    <div>
      <h1 class="w-2/3">Shoredark Control Panel</h1>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class MilAdd extends Vue {}
</script>

<style lang="postcss">
.container {
  @apply m-auto my-0 min-h-screen flex justify-center pt-20 w-full pb-2;
}
</style>
