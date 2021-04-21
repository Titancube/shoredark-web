<template>
  <div
    class="bg-gray-800 w-full shadow-md text-white p-4 items-center flex fixed justify-between"
  >
    <div id="hamburger-box" class="cursor-pointer" @click="openMenu">
      <div
        id="hamburger"
        class="w-6 ring-1 ring-white"
        :class="{ open: isMenuOpen }"
      ></div>
    </div>

    <!-- Mobile Dropdown -->
    <transition name="open">
      <div
        v-if="isMenuOpen"
        class="absolute w-3/4 md:w-80 top-20 h-screen left-0 z-30"
      >
        <ul class="bg-gray-800 h-full">
          <nuxt-link to="/home">
            <li class="nav-list">홈</li>
          </nuxt-link>
          <ol
            class="nav-list cursor-pointer"
            @click="openAdmin"
            v-if="$accessor.fireUser"
          >
            Admin
          </ol>
          <ol v-if="$accessor.fireUser && isAdminMenuOpen">
            <nuxt-link v-for="am in adminMenus" :key="am.title" :to="am.url">
              <li class="nav-list child">
                {{ am.title }}
              </li>
            </nuxt-link>
          </ol>
        </ul>
      </div>
    </transition>

    <ul class="list-none flex justify-self-end">
      <AtomsBtn
        name="로그인"
        :category="1"
        @click.native="signWithGoogle"
        v-if="$accessor.fireUser == null"
        :key="1"
      />
      <AtomsBtn
        name="로그아웃"
        :category="0"
        @click.native="signOut"
        v-else
        :key="0"
      />
    </ul>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'nuxt-property-decorator'

interface Menu {
  title: string
  url: string
}

@Component
export default class Navigation extends Vue {
  menus: Menu[] = [{ title: '스튜디오 - 예약', url: '/studio/reservation' }]
  adminMenus: Menu[] = [
    { title: '전역카운터', url: '/military' },
    { title: '스튜디오 - 관리', url: '/studio/admin' },
  ]
  isMenuOpen: boolean = false
  isAdminMenuOpen: boolean = false

  // Google sign-in & sign-out
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
    }
  }

  signOut() {
    this.$fire.auth.signOut()
    this.$router.push('/')
  }

  openMenu(): void {
    this.isMenuOpen = !this.isMenuOpen
  }

  openAdmin(): void {
    this.isAdminMenuOpen = !this.isAdminMenuOpen
  }
}
</script>

<style scoped lang='postcss'>
#hamburger-box {
  @apply relative px-2 py-4;
}

#hamburger {
  @apply relative;
  transition: all 0.15s;
}

#hamburger::before,
#hamburger::after {
  @apply absolute w-6 ring-1;
  content: '';
}

#hamburger:before {
  @apply -top-2;
}

#hamburger:after {
  @apply top-2;
}

#hamburger.open {
  @apply ring-0;
  transform: rotate(90deg);
}

#hamburger.open::before {
  @apply top-0;
  transform: rotate(-45deg);
}

#hamburger.open::after {
  @apply top-0;
  transform: rotate(45deg);
}

.open-enter-active {
  transition: all 0.3s;
}

.open-leave-active {
  transition: all 0.15s;
}
.open-enter,
.open-leave-to {
  opacity: 0;
  transform: translate(-30%, 0%);
}

.open-move {
  transition: all 0.3s;
}

.nav-list {
  @apply w-full p-4 hover:bg-gray-700 duration-75 list-none;
}

.nav-list.child {
  @apply pl-8 bg-gray-900 hover:bg-gray-700;
}

ul ol,
ul li {
  @apply border-gray-600;
  border-bottom: 1px solid;
}

ol > a:nth-last-child(1) > li {
  border-bottom: 0px;
}
</style>