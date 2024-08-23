<template>
  <div class="container">
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
@import './assets/base.css';

.container {
  margin: 0 auto;
  border: 15px solid transparent; /* 기본 보더는 투명하게 설정 */
  border-image-source: url('./assets/giraffe-pattern.jpg'); /* 기린 무늬 패턴 이미지 */
  border-image-slice: 30; /* 이미지를 30 픽셀 단위로 잘라서 사용 */
  border-image-repeat: round; /* 이미지를 보더 전체에 반복 */
  border-image-width: 15px; /* 보더 이미지의 두께 */
}
</style>
