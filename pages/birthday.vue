<template>
  <div class="container flex-wrap">
    <section class="w-full p-12">
      <h1>생일</h1>
      <fieldset
        class="w-full flex flex-wrap items-center p-4 mt-12 mb-4 ring-1 duration-150"
        :class="addBirthday.id ? 'ring-green-300' : 'ring-gray-500 '"
      >
        <transition name="push" mode="">
          <legend
            v-if="addBirthday.id"
            key="1"
            class="bg-gray-900 px-4 text-xl font-bold text-green-300 absolute transform -translate-y-10 md:block hidden"
          >
            수정 모드
          </legend>
          <legend
            v-else
            key="2"
            class="bg-gray-900 px-4 text-xl font-bold text-gray-500 absolute transform -translate-y-10 md:block hidden"
          >
            신규 등록
          </legend>
        </transition>
        <legend
          class="bg-gray-900 px-4 text-xl font-bold md:hidden"
          :class="addBirthday.id ? 'text-green-300' : 'text-gray-500'"
        >
          {{ addBirthday.id ? '수정 모드' : '신규 등록' }}
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
            v-model="addBirthday.name"
          />
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
            v-model="addBirthday.birthday"
          />
        </div>
        <div class="flex items-center w-full md:px-2 md:py-2 md:w-1/4">
          <button
            class="outline-none focus:outline-none w-full md:w-auto py-1 px-4 text-sm bg-blue-600 font-bold rounded-sm"
            @click="add"
          >
            {{ addBirthday.id ? '수정' : '추가' }}
          </button>
          <button
            v-if="addBirthday.id"
            class="outline-none focus:outline-none w-full md:w-auto py-1 px-4 text-sm ml-1 bg-gray-800 font-bold rounded-sm"
            @click="modCancel"
          >
            취소
          </button>
        </div>
      </fieldset>
      <fieldset class="w-full p-4 mt-12 mb-4 ring-1 ring-gray-500">
        <legend class="bg-gray-900 px-4 text-xl font-bold text-gray-500">
          모든 생일
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
              v-for="s in allBirthday"
              :key="s.id"
              :class="{ 'bg-green-800': addBirthday.id === s.id }"
            >
              <td class="w-2/3 md:w-1/4">{{ s.name }}</td>
              <td class="md:w-1/4 hidden md:table-cell">{{ s.variant }}</td>
              <td class="md:w-1/4 hidden md:table-cell">
                {{ s.birthday }}
              </td>
              <td class="w-1/3 md:w-1/4">
                <button
                  class="outline-none focus:outline-none py-1 px-4 text-sm bg-blue-600 rounded-sm my-1 md:my-0"
                  @click="mod(s.id, s.name, s.birthday, s.variant)"
                >
                  수정
                </button>
                <button
                  class="outline-none focus:outline-none py-1 px-4 text-sm bg-red-600 rounded-sm my-1 md:my-0"
                  @click="del(s.id, s.name)"
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
  birthday: string
}

@Component
export default class birthday extends Vue {
  allBirthday: Soldier[] = []
  addBirthday: Soldier = {
    id: '',
    name: '',
    birthday: '',
  }

  mounted() {
    this.get()
  }

  // Get soldiers from firestore
  async get() {
    this.allBirthday = []
    const r = await this.$fire.firestore.collection('Birthday').get()
    try {
      r.forEach((doc) => {
        this.allBirthday.push({
          id: doc.id,
          name: doc.data().name,
          birthday: format(doc.data().birthday.toDate(), 'yyyy-MM-dd'),
        })
      })
    } catch (e) {
      alert(e)
    }
  }

  // Return parsed data of birthday as Date
  get toDate(): Date {
    return new Date(this.addBirthday.birthday)
  }

  // Modify soldier
  mod(id: string, name: string, birthday: string) {
    this.addBirthday = {
      id,
      name,
      birthday,
    }
  }

  // Cancel modify
  modCancel(): void {
    this.addBirthday = {
      id: '',
      name: '',
      birthday: '',
    }
  }

  // Add a soldier
  async add() {
    const conditions = [this.addBirthday.name, this.addBirthday.birthday]
    if (conditions.includes('')) {
      alert('빠진 부분 없이 작성해주세요')
      return false
    } else {
      try {
        if (!this.addBirthday.id) {
          await this.$fire.firestore.collection('Birthday').add({
            name: this.addBirthday.name,
            birthday: this.toDate,
          })
        } else {
          await this.$fire.firestore
            .collection('Birthday')
            .doc(this.addBirthday.id)
            .update({
              name: this.addBirthday.name,
              birthday: this.toDate,
            })
        }

        alert(`
    등록되었습니다

    이름: ${this.addBirthday.name}
    생일: ${this.addBirthday.birthday}
    `)
      } catch (e) {
        alert(`너는 수장이 아니로구나`)
      } finally {
        this.modCancel()
        this.get()
      }
    }
  }

  // Delete soldier
  async del(id: string, name: string) {
    if (
      confirm(`
    삭제하시겠습니까?
    
    ${name}
    `)
    ) {
      try {
        await this.$fire.firestore.collection('Birthday').doc(id).delete()
        alert('삭제되었습니다')
      } catch (e) {
        alert(`너는 수장이 아니로구나`)
      } finally {
        this.get()
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
  position: absolute;
  transition: all 0.15s;
}

.push-enter {
  @apply -translate-y-12;
  opacity: 0;
}

.push-leave-to {
  @apply -translate-y-8;
  opacity: 0;
}
</style>