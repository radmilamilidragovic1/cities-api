<script setup>
import NavBar from '@/components/NavBar.vue'
import { RouterView } from 'vue-router'
import '@/styles/body.css'
import AuthTost from '@/components/AuthTost.vue'
</script>

<template>
  <NavBar/>
  <router-view />
  <AuthTost/>
</template>

<style scoped>
</style>