<template>
  <div class="form-box">
    <div class="form-datafield">
      <h1 class="mb-2">추가</h1>
    </div>
    <div class="form-datafield">
      <h2>이름</h2>
      <input type="text" class="input-mil" v-model="name" />
    </div>
    <div class="form-datafield">
      <h2>전역일</h2>
      <input type="date" class="input-mil" v-model="dischargeDate" />
    </div>
    <div class="form-datafield">
      <h2>종류</h2>
      <select name="" id="" v-model="variant" class="text-black">
        <option value="" selected disabled hidden class="text-black">
          선택
        </option>
        <option value="육군">육군</option>
        <option value="해군">해군</option>
        <option value="공군">공군</option>
        <option value="공익">공익</option>
        <option value="상근">상근</option>
      </select>
    </div>
    <div class="form-datafield">
      <Btn name="추가" :category="1" @click.native="uploadSoldier" />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class MilAdd extends Vue {
  name: string = ''
  dischargeDate: string = ''
  variant: string = ''

  async uploadSoldier() {
    const conditions = [this.name, this.dischargeDate, this.variant]
    if (conditions.includes('')) {
      alert('빠진 부분 없이 작성해주세요')
      return false
    } else {
      try {
        await this.$fire.firestore.collection('Retire').doc(this.name).set({
          name: this.name,
          dischargeDate: this.dischargeDate,
          variant: this.variant,
          status: true,
        })

        alert(`
    등록되었습니다

    이름: ${this.name}
    전역일: ${this.dischargeDate}
    종류: ${this.variant}
    `)
      } catch (e) {
        alert(e)
      }
    }
  }
}
</script>