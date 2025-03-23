<script setup>
import { ref, defineEmits } from 'vue'
import AppInput from './AppInput.vue'

const firstName = ref('')
const password = ref('')
const showPassword = ref(false)
const isSignUpModalVisible = ref(false)
const signUpName = ref('')
const signUpPassword = ref('')
const isLoggedIn = ref(false)
const emit = defineEmits(['user-logged-in'])

const handleLogin = () => {
  if (firstName.value && password.value) {
    localStorage.setItem('userName', firstName.value)
    isLoggedIn.value = true
    emit('user-logged-in', firstName.value)
    alert(`Prijavljeni ste kao: ${firstName.value}`)
  }
}

const handleLogout = () => {
  localStorage.removeItem('userName')
  firstName.value = ''
  password.value = ''
  isLoggedIn.value = false
  alert('Odjavili ste se')
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const openSignUpModal = () => {
  isSignUpModalVisible.value = true
}

const closeSignUpModal = () => {
  isSignUpModalVisible.value = false
}

const registerUser = () => {
  console.log('User registered with:', signUpName.value, signUpPassword.value)

  isSignUpModalVisible.value = false

  firstName.value = signUpName.value
  password.value = signUpPassword.value
}
</script>

<template>
  <form v-if="!isLoggedIn" class="form pa-x1" @submit.prevent="handleLogin">
    <button type="button" class="sign-up-btn" @click="openSignUpModal">Sign Up</button>
    <h2 class="title mb-md" style="text-align: center">Sign in</h2>

    <AppInput id="firstName" v-model="firstName" label="First Name" />

    <div style="position: relative;">
      <AppInput
        id="password"
        v-model="password"
        :type="showPassword ? 'text' : 'password'"
        label="Password"
      />
      <button
        type="button"
        @click="togglePasswordVisibility"
        class="toggle-password-btn"
      >
        {{ showPassword ? 'HIDE' : 'SHOW' }}
      </button>
    </div>

    <button type="submit" class="sign-in-btn">Sign In</button>
  </form>

  <div v-if="isLoggedIn">
    <p>Dobrodošli, {{ firstName }}!</p>
    <button type="button" @click="handleLogout">Logout</button>
  </div>

  <div v-if="isSignUpModalVisible" class="modal-overlay">
    <div class="modal">
      <h2 class="modal-title">Sign Up</h2>
      <AppInput id="signUpName" v-model="signUpName" label="Name" />
      <AppInput id="signUpPassword" v-model="signUpPassword" label="Password" type="password" />
      <div class="modal-actions">
        <button type="button" class="modal-close-btn" @click="closeSignUpModal">Cancel</button>
        <button type="button" class="modal-submit-btn" @click="registerUser">Register</button>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>

* {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
  padding: 0;
}
.form {
  margin: 300px auto;
  background-image: linear-gradient(135deg, #ff7f00, #ff4500);
  width: 600px;
  max-width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2), 0 8px 40px rgba(0, 0, 0, 0.1);
  padding: 32px;
  backdrop-filter: blur(8px);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  text-align: center;
}
.title {
  font-size: 36px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 16px;
}
.toggle-password-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.toggle-password-btn:hover {
  background-color: rgba(255, 255, 255, 0.4);
  border-color: rgba(255, 255, 255, 0.5);
}
.toggle-password-btn:focus {
  outline: none;
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.6);
}
.sign-in-btn {
  display: block;
  width: 100%;
  margin-top: 24px;
  padding: 12px 0;
  font-size: 16px;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
  background: linear-gradient(to right, #ff7f00, #ff4500);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.sign-in-btn:hover {
  background: linear-gradient(to right, #ff4500, #ff7f00);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
}
.sign-in-btn:focus {
  outline: none;
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.6);
}
.sign-up-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
  background: linear-gradient(to right, #ff7f00, #ff4500);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.sign-up-btn:hover {
  background: linear-gradient(to right, #ff4500, #ff7f00);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
}
.sign-up-btn:focus {
  outline: none;
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.6);
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal {
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 400px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}
.modal-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
}
.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}
.modal-close-btn,
.modal-submit-btn {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.modal-close-btn {
  background: #ff4500;
}
.modal-close-btn:hover {
  background: #ff7f00;
}
.modal-submit-btn {
  background: #ff7f00;
}
.modal-submit-btn:hover {
  background: #ff4500;
}
</style>