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
        <option
          :value="item.name"
          v-for="item in activeSoldiers"
          :key="item.name"
        >
          {{ item.name }}
        </option>
      </select>
    </div>
    <div class="form-datafield">
      <h2>이름</h2>
      <input type="text" class="input-mil" v-model="selectedSoldier.name" />
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
  name: string
  dischargeDate: string
  variant: string
}

@Component
export default class MilAdd extends Vue {
  activeSoldiers: Soldier[] = []
  selectedSoldier: Soldier | null = { name: '', dischargeDate: '', variant: '' }
  selectSoldier: string = ''

  mounted() {
    this.getSoldiers()
  }

  async getSoldiers() {
    this.activeSoldiers = []
    const r = await this.$fire.firestore.collection('Retire').get()
    try {
      r.forEach((doc) => {
        this.activeSoldiers.push({
          name: doc.id,
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

  get toDate(): Date | undefined {
    if (this.selectedSoldier) {
      return new Date(this.selectedSoldier.dischargeDate)
    } else {
      alert('허용되지 않은 접근입니다')
      return
    }
  }

  async uploadSoldier() {
    if (this.selectedSoldier != null) {
      const ss = this.selectedSoldier
      const conditions = [ss.name, ss.dischargeDate, ss.variant]
      if (conditions.includes('')) {
        alert('빠진 부분 없이 작성해주세요')
        return false
      } else {
        try {
          await this.$fire.firestore.collection('Retire').doc(ss.name).set(
            {
              name: ss.name,
              dischargeDate: this.toDate,
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

  showSelected() {
    this.selectedSoldier = this.activeSoldiers.filter(
      (soldier) => soldier.name == this.selectSoldier
    )[0]
  }
}
</script>