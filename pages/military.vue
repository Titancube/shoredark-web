<template>
  <div class="container flex-wrap items-center">
    <MilAdd />
    <MilMod />
    <MilDel />
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class military extends Vue {}
</script>

<style lang='postcss'>
.form-datafield {
  @apply w-full flex flex-wrap mb-4;
}

.form-box {
  @apply w-2/3 border-blue-900 border-solid border p-4 shadow-lg m-8;
}

.input-mil {
  @apply bg-transparent border-b-2;
}

.input-mil:focus {
  @apply ring-4 outline-none;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  @apply w-full text-left;
}
</style>