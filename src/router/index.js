import { createRouter, createWebHistory } from "vue-router";
import HomePage from '@/pages/HomePage.vue';
import AuthBlog from '@/components/AuthBlog.vue';
import AuthRecepies from '@/components/AuthRecepies.vue';
import ReceptPage from '@/components/ReceptPage.vue';
import AuthPage from '@/pages/AuthPage.vue';

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/AuthBlog", name: "Blog", component: AuthBlog },
  { path: "/AuthRecepies", name: "Recepies", component: AuthRecepies },
  { path: "/auth", name: "AuthPage", component: AuthPage },
  { path: "/recept/:id", name: "ReceptPage", component: ReceptPage },
];

const router = createRouter({
  routes: routes,
  history: createWebHistory(import.meta.env.BASE_URL),
})

export default router;