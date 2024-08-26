import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import MainPage from '@/views/MainPage.vue';
import GamePage from '@/views/GamePage.vue';

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
    {
      path: '/main',
      component: MainPage,
    },
    {
      path: '/game/:roomId',
      component: GamePage,
    },
  ],
});
