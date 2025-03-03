import { createRouter, createWebHistory } from 'vue-router';
import IndexView from '../views/index.vue';

import { mainStore } from '../stores/main.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/about.vue'),
    },
    {
      path: '/admin',
      // name: 'admin',
      component: () => import('../views/admin.vue'), 
      children: [
        { path: 'index', component: () => import('../views/index.vue') },
        { path: 'articles/index', component: () => import('../views/articles/index.vue') },
        { path: 'articles/add', component: () => import('../views/articles/add.vue') },
        { path: 'articles/edit', component: () => import('../views/articles/edit.vue') },
        { path: 'articles/:id',component: () => import('../views/articles/edit.vue'),},
        {
          path: 'categories/index',
          component: () => import('../views/categories/index.vue')
        },
        {
          path: 'categories/add',
          component: () => import('../views/categories/add.vue')
        },
        { path: 'pages/index', component: () => import('../views/pages/index.vue') },
        { path: 'tags/index', component: () => import('../views/tags/index.vue') },

        { path: 'users/index', component: () => import('../views/users/index.vue') },
        { path: 'users/logs', component: () => import('../views/users/logs.vue') },
        { path: 'users/captcha', component: () => import('../views/users/captcha.vue') },

        { path: 'assets', component: () => import('../views/assets.vue') }
      ], 
    },
  ],
})


router.beforeEach(async (to, from) => {
  let store = mainStore();
  let isAuthenticated = store.user.id;

  if ( !isAuthenticated && to.name !== 'login') {
    return { name: 'login' }
  }
});


export default router
