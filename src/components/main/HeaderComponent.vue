<template>
  <div class="headerContainer">
    <div class="router-box">
      <router-link to="#">갤러리 | </router-link>
      <router-link to="#">팔로우 | </router-link>
      <router-link to="#">마이페이지</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.headerContainer {
  border: none;
  margin: 0 60px;
  margin-top: 180px;
  margin-bottom: 20px;
}

.router-box {
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 10px;
  margin: 0 52px;
}

a {
  color: #333;
  text-decoration: none;
}
</style>
