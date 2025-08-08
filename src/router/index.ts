import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LoaderPage',
      component: () => import('@/components/Templates/Loader/Loader.vue'),
    },
    {
      path: '/home',
      name: 'LayoutPage',
      component: () => import('@/components/Templates/Layout/layout.vue'),
      redirect: to => {
        return { name: 'HomePage' };
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

router.beforeEach((to, from, next) => {
  const loaderScreen = sessionStorage.getItem('loaderScreen');
  if (to.name !== 'LoaderPage' && !loaderScreen) {
    sessionStorage.setItem('loaderScreen', 'true');
    next({ name: 'LoaderPage' });
  } else {
    next();
  }
});


export default router;
