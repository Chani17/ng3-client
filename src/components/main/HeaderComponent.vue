<template>
  <!--HeaderComponent.vue = 갤러리, 마이페이지, 팔로우 페이지로 갈 수 있게 해주는 컴포넌트입니다.-->
  <div class="headerContainer">
    <!--해당 페이지로 가기 위한 라우터 설정들-->
    <router-link to="#">갤러리 | </router-link>
    <router-link to="#">팔로우 | </router-link>
    <router-link to="#">마이페이지</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.headerContainer {
  border: 1px solid black;
  margin: 150px 60px;
  text-align: right;
}
</style>
