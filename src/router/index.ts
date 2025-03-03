// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';

const HomeView = () => import('../views/HomeView.vue');
const AboutView = () => import('../views/AboutView.vue');
const ConsultView = () => import('../views/ConsultView.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/consulta', name: 'consulta', component: ConsultView }
  ]
});

export default router;