import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const username = ref(localStorage.getItem('userName') || null)
  const isLoggedIn = ref(!!username.value)

  function login(user) {
    username.value = user;
    isLoggedIn.value = true;
    localStorage.setItem('userName', user);
  }

  function logout() {
    username.value = null;
    isLoggedIn.value = false;
    localStorage.removeItem('userName');
  }

  return { username, isLoggedIn, login, logout }
})