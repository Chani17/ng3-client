<template>
  <div class="base_container">
    <div class="follow-page">
      <div class="search-bar">
        <div class="search-icon"/>
        <input type="text" v-model="userSearch" class="search-input"/>
      </div>
      <div class="follow-list">
        <div v-for="user in getFilteredUsers" :key="user.id" class="user-card">
          <!-- 갤러리로 이동 -->
          <div class="user-info">
            <!-- 프로필 아바타 위치 -->
            <img :src="user.profile_image" class="profile-picture" />
            <h3>{{ user.nickname }}</h3>
            <p>❤️ {{ user.totalLikes }}</p>
          </div>
          <button v-if="!getFollowing(user.email)" @click.stop="followUser(user.email)" class="add-button">+</button>
          <button v-else @click.stop="unfollowUser(user.email)" class="remove-button">-</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/css/base_container.css";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "FollowPage",
  computed: {
    ...mapGetters(["getFilteredUsers", "getFollowing"]),
    userSearch: {
      get() {
        return this.$store.state.userSearch;
      },
      set(value) {
        this.$store.dispatch('searchUsers', value);
      },
    }
  },
  methods: {
    ...mapActions(["searchUsers", "followUser", "unfollowUser", "fetchFollowing"]),
  },
  created() {
    this.fetchFollowing();
  }
};
</script>

<style scoped>
.follow-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 75%;
  padding-top: 16vh;
}

.search-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 1vh;
  position: relative;
  width: 25vw;
}

.search-input {
  padding: 8px 8px 8px 40px;
  font-size: 16px;
  border-radius: 15px;
  border: 2px solid #a55905;
  background-color: transparent;
  width: 100%;
  box-sizing: border-box;
}

.search-icon {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 5%;
  left: 5px;
  background-color: transparent;
}

.search-icon::before {
  content: '';
  width: 15px;
  height: 15px;
  border: 2px solid #a55905;
  border-radius: 50%;
  position: absolute;
  top: 8px;
  left: 8px;
  box-sizing: border-box;
}

.search-icon::after {
  content: '';
  width: 10px;
  height: 2px;
  background-color: #a55905;
  position: absolute;
  top: 19px;
  left: 23px;
  transform: rotate(40deg);
  transform-origin: 0 0;
}

.follow-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 100%;
  overflow-y: auto;
}

.follow-list::-webkit-scrollbar {
  display: none;
}

.user-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70vw;
  margin: 20px;
}

.profile-picture {
  background-image: url('@/assets/image/profile.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-left: 1vw;
}

.user-info {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  background-color: #eddc8d;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: #a55905;
  padding: 10px;
}

.user-info h3 {
  padding-left: 2vw;
  flex-grow: 1;
  text-align: left;
}

.user-info p {
  padding-right: 2vw;
  flex-shrink: 0;
  text-align: right;
}

.add-button {
  background-color: #6cc751;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, transform 0.2s;
  margin-left: 1vw;
}

.add-button:hover {
  background-color: #4caf50;
  transform: scale(1.1);
}

.remove-button {
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, transform 0.2s;
  margin-left: 1vw;
}

.remove-button:hover {
  background-color: #ff5252;
  transform: scale(1.1);
}
</style>