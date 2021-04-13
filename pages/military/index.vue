<template>
  <div class="container flex-wrap">
    <section class="w-full p-12">
      <h1>전역카운터</h1>
      <fieldset
        class="w-full flex flex-wrap items-center p-4 mt-12 mb-4 ring-1 duration-150"
        :class="addSoldier.id ? 'ring-green-300' : 'ring-gray-500 '"
      >
        <transition name="push" mode="out-in">
          <legend
            v-if="addSoldier.id"
            key="1"
            class="bg-gray-900 px-4 text-xl font-bold text-green-300 md:block hidden"
          >
            수정 모드
          </legend>
          <legend
            v-else
            key="2"
            class="bg-gray-900 px-4 text-xl font-bold text-gray-500 md:block hidden"
          >
            신규 등록
          </legend>
        </transition>
        <legend
          class="bg-gray-900 px-4 text-xl font-bold md:hidden"
          :class="addSoldier.id ? 'text-green-300' : 'text-gray-500'"
        >
          {{ addSoldier.id ? '수정 모드' : '신규 등록' }}
        </legend>
        <div
          class="flex justify-between items-center w-full md:px-2 md:py-2 md:w-1/4 mb-4 md:mb-0"
        >
          <label for="name" class="mr-2 font-bold text-lg">이름</label>
          <input
            type="text"
            name="name"
            id="name"
            class="input-mil w-2/3"
            v-model="addSoldier.name"
          />
        </div>
        <div
          class="flex justify-between items-center w-full md:px-2 md:py-2 md:w-1/4 mb-4 md:mb-0"
        >
          <label for="variant" class="mr-2 font-bold text-lg">분류</label>
          <select
            name="variant"
            id="variant"
            class="input-mil w-2/3"
            v-model="addSoldier.variant"
          >
            <option value="" disabled selected hidden>선택</option>
            <option value="육군" class="input-mil">육군</option>
            <option value="해군" class="input-mil">해군</option>
            <option value="공군" class="input-mil">공군</option>
            <option value="공익" class="input-mil">공익</option>
            <option value="상근" class="input-mil">상근</option>
          </select>
        </div>
        <div
          class="flex justify-between items-center w-full md:px-2 md:py-2 md:w-1/4 mb-4 md:mb-0"
        >
          <label for="diacharge" class="mr-2 font-bold text-lg">전역일</label>
          <input
            type="date"
            name="diacharge"
            id="diacharge"
            class="input-mil w-2/3"
            v-model="addSoldier.dischargeDate"
          />
        </div>
        <div class="flex items-center w-full md:px-2 md:py-2 md:w-1/4">
          <button
            class="outline-none focus:outline-none w-full md:w-auto py-1 px-4 text-sm bg-blue-600 font-bold rounded-sm"
            @click="uploadSoldier"
          >
            {{ addSoldier.id ? '수정' : '추가' }}
          </button>
          <button
            v-if="addSoldier.id"
            class="outline-none focus:outline-none w-full md:w-auto py-1 px-4 text-sm ml-1 bg-gray-800 font-bold rounded-sm"
            @click="cancelModify"
          >
            취소
          </button>
        </div>
      </fieldset>
      <fieldset class="w-full p-4 mt-12 mb-4 ring-1 ring-gray-500">
        <legend class="bg-gray-900 px-4 text-xl font-bold text-gray-500">
          복무중인 인원
        </legend>
        <table class="w-full">
          <thead>
            <tr>
              <td class="w-2/3 md:w-1/4 text-gray-500">이름</td>
              <td class="md:w-1/4 hidden md:table-cell text-gray-500">분류</td>
              <td class="md:w-1/4 hidden md:table-cell text-gray-500">
                전역일
              </td>
              <td class="w-1/3 md:w-1/4 text-gray-500">작업</td>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="s in activeSoldiers"
              :key="s.id"
              :class="{ 'bg-green-800': addSoldier.id === s.id }"
            >
              <td class="w-2/3 md:w-1/4">{{ s.name }}</td>
              <td class="md:w-1/4 hidden md:table-cell">{{ s.variant }}</td>
              <td class="md:w-1/4 hidden md:table-cell">
                {{ s.dischargeDate }}
              </td>
              <td class="w-1/3 md:w-1/4">
                <button
                  class="outline-none focus:outline-none py-1 px-4 text-sm bg-blue-600 rounded-sm my-1 md:my-0"
                  @click="
                    modifySoldier(s.id, s.name, s.dischargeDate, s.variant)
                  "
                >
                  수정
                </button>
                <button
                  class="outline-none focus:outline-none py-1 px-4 text-sm bg-red-600 rounded-sm my-1 md:my-0"
                  @click="deleteSoldier(s.id, s.name)"
                >
                  삭제
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </fieldset>
    </section>
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
export default class military extends Vue {
  activeSoldiers: Soldier[] = []
  addSoldier: Soldier = {
    id: '',
    name: '',
    dischargeDate: '',
    variant: '',
  }

  layout() {
    return 'main'
  }

  mounted() {
    this.getSoldiers()
  }

  // Get soldiers from firestore
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

  // Return parsed data of dischargeDate as Date
  get toDate(): Date {
    return new Date(this.addSoldier.dischargeDate)
  }

  // Modify soldier
  modifySoldier(
    id: string,
    name: string,
    dischargeDate: string,
    variant: string
  ) {
    this.addSoldier = {
      id,
      name,
      dischargeDate,
      variant,
    }
  }

  // Cancel modify
  cancelModify(): void {
    this.addSoldier = {
      id: '',
      name: '',
      dischargeDate: '',
      variant: '',
    }
  }

  // Add a soldier
  async uploadSoldier() {
    const conditions = [
      this.addSoldier.name,
      this.addSoldier.dischargeDate,
      this.addSoldier.variant,
    ]
    if (conditions.includes('')) {
      alert('빠진 부분 없이 작성해주세요')
      return false
    } else {
      try {
        if (!this.addSoldier.id) {
          await this.$fire.firestore.collection('Retire').add({
            name: this.addSoldier.name,
            dischargeDate: this.toDate,
            variant: this.addSoldier.variant,
          })
        } else {
          await this.$fire.firestore
            .collection('Retire')
            .doc(this.addSoldier.id)
            .update({
              name: this.addSoldier.name,
              dischargeDate: this.toDate,
              variant: this.addSoldier.variant,
            })
        }

        alert(`
    등록되었습니다

    이름: ${this.addSoldier.name}
    전역일: ${this.addSoldier.dischargeDate}
    종류: ${this.addSoldier.variant}
    `)
      } catch (e) {
        alert(`너는 수장이 아니로구나`)
      } finally {
        this.cancelModify()
        this.getSoldiers()
      }
    }
  }

  // Delete soldier
  async deleteSoldier(id: string, name: string) {
    if (
      confirm(`
    삭제하시겠습니까?
    
    ${name}
    `)
    ) {
      try {
        await this.$fire.firestore.collection('Retire').doc(id).delete()
        alert('삭제되었습니다')
      } catch (e) {
        alert(`너는 수장이 아니로구나`)
      } finally {
        this.getSoldiers()
      }
    }
  }

  // Block access if account is not Titancube
  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: { $accessor: { fireUser: any } }) => {
      if (!vm.$accessor.fireUser) {
        alert('권한이 없습니다')
        next('/')
      }
    })
  }
}
</script>

<style lang='postcss'>
.form-datafield {
  @apply w-full flex flex-wrap mb-4;
}

.form-box {
  @apply w-2/3 border-blue-900 border-solid border p-4 shadow-lg m-8;
}

.input-mil {
  @apply bg-transparent border-b-2 outline-none;
}

.input-mil:focus {
  @apply ring-4 outline-none;
}

option {
  @apply bg-transparent text-black;
}

thead > tr > td {
  @apply p-2 pb-4 font-bold text-lg;
}

tbody > tr > td {
  @apply p-2 text-lg;
}

tbody > tr {
  @apply border-t-2 border-gray-800 duration-150;
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

::-webkit-calendar-picker-indicator {
  filter: invert(1);
}

.push-enter-active,
.push-leave-active {
  transition: all 0.05s;
}

.push-enter {
  transform: translate(0, -10px);
  opacity: 0;
}
.push-leave-to {
  transform: translate(0, 10px);
  opacity: 0;
}
</style>