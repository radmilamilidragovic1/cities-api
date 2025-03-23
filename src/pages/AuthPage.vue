<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppAuthForm from '@/components/AppAuthForm.vue'
import "@/components/main.css"

const router = useRouter()

const currentRoute = router.currentRoute.value.path

const userName = ref(localStorage.getItem('userName') || null)

onMounted(() => {
  if (userName.value) {
    router.push('/')
  }
})

const handleUserLogin = (name) => {
  localStorage.setItem('userName', name)
  userName.value = name
  router.push('/')
}

const handleUserLogout = () => {
  localStorage.removeItem('userName')
  userName.value = null
  router.push('/auth')
}

const isSignUpModalVisible = ref(false)
const isAnimating = ref(false)

const openSignUpModal = () => {
  isAnimating.value = true
  isSignUpModalVisible.value = true
}

const closeSignUpModal = () => {
  isSignUpModalVisible.value = false
  isAnimating.value = false
}
</script>

<template>
  <div class="page">
    <nav class="nav">
      <img src="@/logo.jpg"alt="Cites logo" class="logo"/>
      <div v-if="userName && currentRoute === '/'">
        <span>Dobrodošli, {{ userName }}</span>
        <button @click="handleUserLogout" class="logout-btn">Log Out</button>
      </div>
    </nav>
<style lang="css"scoped>
.page {
  height:100%;
  background-image: var(--gradient-bg),url('@/src/imaages/42mix.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
    
}

</style>
    <div class="flex justify-center" v-if="!userName">
      <AppAuthForm @user-logged-in="handleUserLogin" @open-sign-up-modal="openSignUpModal" />
    </div>

    <div v-if="isSignUpModalVisible" class="modal-overlay" @click.self="closeSignUpModal">
      <div class="modal" :class="{ 'modal-animate': isAnimating }" @animationend="isAnimating = false">
        <h2 class="modal-title">Sign Up</h2>
        <AppAuthForm @user-logged-in="handleUserLogin" />
        <div class="modal-actions">
          <button type="button" class="modal-close-btn" @click="closeSignUpModal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
</style>