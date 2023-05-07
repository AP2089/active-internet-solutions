import { createRouter, createWebHistory } from 'vue-router';
import OrdersList from '@/pages/OrdersList.vue';

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  routes: [
    {
      name: 'OrdersList',
      path: '/',
      component: OrdersList
    }
  ]
});

export default router;
export * from 'vue-router'; 