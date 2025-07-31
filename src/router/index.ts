import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LayoutPage',
      component: () => import('@/components/Templates/Layout/layout.vue'),
      redirect: to => {
        return { name: 'AccountPage' };
      },
      children: [
        {
          path: '',
          name: 'HomePage',
          component: () => import('@/views/Home/HomePage.vue')
        },
      ]
    }
  ],
})

export default router;
