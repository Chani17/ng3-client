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