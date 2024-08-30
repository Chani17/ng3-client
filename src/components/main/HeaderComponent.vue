<template>
  <div class="headerContainer">
    <div class="router-box">
      <div class="homeLogoContainer">
        <img src="@/assets/image/home.png" link="#" class="homeLogo" />
      </div>
      <div class="linkContainer">
        <router-link :to="`/gallery/${loginUserId}`">갤러리 | </router-link>
        <router-link to="/follow">팔로우 | </router-link>
        <router-link to="/mypage">마이페이지</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters({
      loginUserId: 'getLoginUserId',
    }),
  },
};
</script>

<style scoped>
.headerContainer {
  border: none;
  margin: 0 60px;
  margin-top: 180px;
  margin-bottom: -20px;
}

.router-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 52px;
}

.homeLogoContainer {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.homeLogo {
  width: 70px;
  height: 70px;
  cursor: pointer;
}

.linkContainer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  flex: 1;
}

a {
  color: #333;
  text-decoration: none;
}
</style>
