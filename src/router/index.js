import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import MainPage from '@/views/MainPage.vue';
import GamePage from '@/views/GamePage.vue';
import NotFoundView from '@/components/common/NotFoundView.vue';

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
    {
      path: '*',
      component: NotFoundView, // 이상한 주소를 입력했을때 와일드카드 경로로 404 페이지 연결
    },
  ],
});
