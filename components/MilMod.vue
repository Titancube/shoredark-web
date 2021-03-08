<template>
  <div class="form-box">
    <div class="form-datafield">
      <h1 class="mb-2">수정</h1>
    </div>
    <div class="form-datafield">
      <h2>선택</h2>
      <select
        class="w-52 text-black"
        v-model="selectSoldier"
        @change="showSelected"
      >
        <option value="" disabled selected hidden>선택</option>
        <option :value="item.id" v-for="item in activeSoldiers" :key="item.id">
          {{ item.name }}
        </option>
      </select>
    </div>
    <div class="form-datafield">
      <h2>이름</h2>
      <input type="text" class="input-mil" v-model="nameToChange" />
    </div>
    <div class="form-datafield">
      <h2>전역일</h2>
      <input
        type="date"
        class="input-mil"
        v-model="selectedSoldier.dischargeDate"
      />
    </div>
    <div class="form-datafield">
      <h2>종류</h2>
      <select
        name=""
        id=""
        v-model="selectedSoldier.variant"
        class="text-black"
      >
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
      <Btn name="수정" :category="1" @click.native="uploadSoldier" />
      <Btn name="불러오기" :category="0" @click.native="getSoldiers" />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'nuxt-property-decorator'
import { format } from 'date-fns'

interface Soldier {
  id: string
  name: string
  dischargeDate: string
  variant: string
}

@Component
export default class MilMod extends Vue {
  activeSoldiers: Soldier[] = []
  selectedSoldier: Soldier = {
    id: '',
    name: '',
    dischargeDate: '',
    variant: '',
  }
  selectSoldier: string = ''
  nameToChange: string = ''

  mounted() {
    this.getSoldiers()
  }

  async getSoldiers() {
    this.activeSoldiers = []
    const r = await this.$fire.firestore.collection('Retire').get()
    try {
      r.forEach((doc) => {
        this.activeSoldiers.push({
          id: doc.id,
          name: doc.data().name,
          dischargeDate: format(
            doc.data().dischargeDate.toDate(),
            'yyyy-MM-dd'
          ),
          variant: doc.data().variant,
        })
      })
    } catch (e) {
      alert(e)
    }
  }

  get parseToDate(): Date {
    if (this.selectedSoldier) {
      return new Date(this.selectedSoldier.dischargeDate)
    } else {
      return new Date()
    }
  }

  async uploadSoldier() {
    if (this.selectedSoldier != null) {
      const ss = this.selectedSoldier
      const conditions = [this.nameToChange, ss.dischargeDate, ss.variant]
      if (conditions.includes('')) {
        alert('빠진 부분 없이 작성해주세요')
        return false
      } else {
        try {
          await this.$fire.firestore.collection('Retire').doc(ss.id).set(
            {
              name: this.nameToChange,
              dischargeDate: this.parseToDate,
              variant: ss.variant,
            },
            { merge: true }
          )

          alert(`
    수정되었습니다

    이름: ${ss.name}
    전역일: ${ss.dischargeDate}
    종류: ${ss.variant}
    `)
        } catch (e) {
          alert(`너는 수장이 아니로구나`)
        } finally {
          this.getSoldiers()
        }
      }
    }
  }

  async showSelected() {
    this.selectedSoldier = this.activeSoldiers.filter(
      (soldier) => soldier.id == this.selectSoldier
    )[0]
    this.nameToChange = this.selectedSoldier.name
  }
}
</script>