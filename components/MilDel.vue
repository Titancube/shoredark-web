<template>
  <div class="form-box">
    <div class="form-datafield">
      <h1 class="mb-2">삭제</h1>
    </div>
    <div class="form-datafield">
      <h2>선택</h2>
      <select
        class="w-52 text-black"
        v-model="selectSoldier"
        @change="showInConsole"
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
      <Btn name="삭제" :category="2" @click.native="deleteSoldier" />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class MilAdd extends Vue {
  activeSoldiers: { name: string }[] = []
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
        })
      })
    } catch (e) {
      alert(e)
    }
  }

  showInConsole() {
    console.log(this.selectSoldier)
  }

  async deleteSoldier() {
    if (
      confirm(`
    삭제하시겠습니까?
    
    ${this.selectSoldier}
    `)
    ) {
      try {
        await this.$fire.firestore
          .collection('Retire')
          .doc(this.selectSoldier)
          .delete()
        alert('삭제되었습니다')
      } catch (e) {
        alert(`삭제 중 문제가 발생했습니다.
        
        ${e}`)
      }
    }
  }
}
</script>