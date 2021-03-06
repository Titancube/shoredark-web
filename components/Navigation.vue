<template>
  <nav
    class="bg-gray-800 w-full h-20 shadow-md text-white p-4 items-center flex fixed justify-between"
  >
    <ul class="list-none flex">
      <NavItem url="/" title="홈" />
      <NavItem url="/military" title="전역카운터" />
    </ul>
    <ul class="list-none flex justify-self-end">
      <Btn name="로그인" :category="1" @click.native="signWithGoogle" />
    </ul>
  </nav>
</template>

<script lang='ts'>
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Navigation extends Vue {
  async signWithGoogle() {
    const provider = new this.$fireModule.auth.GoogleAuthProvider()
    this.$fire.auth.languageCode = 'korean'
    try {
      const snapshot = await this.$fire.auth.signInWithPopup(provider)
      this.$accessor.commit('setFireUser', snapshot.user)
    } catch (e) {
      console.log(e)
    }
  }
  signOut() {
    this.$fire.auth.signOut()
  }
}
</script>

<style scoped lang='postcss'>
</style>