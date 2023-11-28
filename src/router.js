import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';

import GenerateContent from './components/GenerateContent.vue';
import DynamicContent from './components/DynamicContent.vue';

const router = createRouter({
  history: createWebHistory(),
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/generate',
      name: 'GenerateContent',
      component: GenerateContent,
    },
    {
      path: '/articles/:topic',
      name: 'DynamicContent',
      component: DynamicContent,
      props: true,
    },
  ],
});

export default router;
