<template>
  <nav
    class="bg-gray-800 w-full h-20 shadow-md text-white p-4 items-center flex fixed justify-between"
  >
    <ul class="list-none flex">
      <NavItem url="/" title="홈" />
      <NavItem url="/military" title="전역카운터" />
    </ul>
    <ul class="list-none flex justify-self-end">
      <Btn
        name="로그인"
        :category="1"
        @click.native="signWithGoogle"
        v-if="$accessor.fireUser == null"
      />
      <Btn name="로그아웃" :category="2" @click.native="signOut" v-else />
    </ul>
  </nav>
</template>

<script lang='ts'>
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Navigation extends Vue {
  async signWithGoogle() {
    this.$fire.auth.setPersistence(
      this.$fireModule.auth.Auth.Persistence.SESSION
    )
    const provider = new this.$fireModule.auth.GoogleAuthProvider()
    this.$fire.auth.useDeviceLanguage()
    try {
      const snapshot = await this.$fire.auth.signInWithPopup(provider)
      this.$accessor.setFireUser(snapshot.user)
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