import { createApp } from "vue";
import App from "./App.vue";
import './components/main.css';
import { createPinia } from 'pinia'
import router from './router';
import './assets/main.css'

createApp(App).use(router).use(createPinia()).mount("#app");