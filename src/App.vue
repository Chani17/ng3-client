<template>
  <div style="width: 1024px; margin: 0 auto; border: 1px solid navy">
    <router-view v-if="isRoute"></router-view> <!-- / 를 제외한 라우트 페이지 렌더링 -->
    <main-page v-else></main-page> <!-- 기본적으로 / 경로 -->
  </div>
</template>

<script>
import MainPage from './components/pages/MainPage.vue';

export default {
  name: 'App',
  components: { MainPage },
  computed: {
    isRoute() {
      // 현재 경로가 라우트 페이지인지 확인, 루트 ("/") 페이지 아니면 isRoute()가 true
      return this.$route.path !== '/'; 
    }
  }
};
</script>

<style>
@import '@/assets/base.css';

div {
  color: #2c3e50;
}
</style>
