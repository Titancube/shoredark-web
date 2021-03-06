<template>
  <div class="form-box">
    <div class="form-datafield">
      <h1 class="mb-2">삭제</h1>
    </div>
    <div class="form-datafield">
      <h2>이름</h2>
      <input
        type="text"
        class="bg-transparent focus:ring-4 focus:outline-none border-b-2"
      />
    </div>
    <div class="form-datafield">
      <Btn name="삭제" :category="2" />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class MilAdd extends Vue {}
</script>