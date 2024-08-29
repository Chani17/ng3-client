import NotFoundView from '@/components/common/NotFoundView.vue';
import GalleryView from '@/views/GalleryView.vue';
import GamePage from '@/views/GamePage.vue';
import LoginView from '@/views/LoginView.vue';
import MainPage from '@/views/MainPage.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';
import FollowPage from "@/views/FollowPage.vue";


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
      name: 'LoginView',
      component: LoginView,
    },
    {
      path: '/follow',
      name: 'FollowPage',
      component: FollowPage,
	},
	{
      path: '/main',
      name: 'MainPage',
      component: MainPage,
    },
    {
      path: '/room/:roomId',
      name: 'gamePage',
      component: GamePage,
      props: true,
    },
    {
      path: '/gallery/:userId',
      name: 'GalleryView',
      component: GalleryView,
      props: true
    },
    {
      path: '*',
      component: NotFoundView, // 이상한 주소를 입력했을때 와일드카드 경로로 404 페이지 연결
    },
  ],
});
