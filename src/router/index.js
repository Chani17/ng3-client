import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginView from '@/views/LoginView.vue';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history', //URL링크에서 #제거
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: LoginView,
    },
  ],
});

import Vue from 'vue';
import Router from 'vue-router';
import GalleryPage from '@/components/pages/GalleryPage.vue';
import FollowPage from '@/components/pages/FollowPage.vue';
import MyPage from '@/components/pages/MyPage.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/gallery',
      name: 'Gallery',
      component: GalleryPage,
    },
    {
      path: '/follow',
      name: 'Follow',
      component: FollowPage,
    },
    {
      path: '/mypage',
      name: 'MyPage',
      component: MyPage,
    },
  ],
});