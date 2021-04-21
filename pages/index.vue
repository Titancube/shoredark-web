<template>
  <div class="container items-center text-center w-2/3 md:w-full">
    <div>
      <img src="" alt="" />
      <AtomsBtn
        name="⭕"
        :category="0"
        @click.native="signWithGoogle()"
        class="rounded-full p-5 px-5"
      />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class StudioAdmin extends Vue {
  mounted() {
    this.checkUserStatus()
  }

  // Sign in with google
  async signWithGoogle() {
    this.$fire.auth.setPersistence(
      this.$fireModule.auth.Auth.Persistence.SESSION
    )
    const provider = new this.$fireModule.auth.GoogleAuthProvider()
    this.$fire.auth.useDeviceLanguage()
    try {
      await this.$fire.auth.signInWithPopup(provider)
    } catch (e) {
      console.log(e)
    } finally {
      this.checkUserStatus()
    }
  }

  // Sign out
  signOut() {
    this.$fire.auth.signOut()
    this.$router.push('/')
  }

  checkUserStatus() {
    if (this.$accessor.fireUser) {
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="postcss">
.container {
  @apply m-auto my-0 min-h-screen flex justify-center pt-20 w-full pb-2;
}
</style>
