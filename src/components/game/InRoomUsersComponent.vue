<template>
  <div class="inRoomUsersContainer">
    <div v-for="user in users" :key="user.id" class="user">
      <!-- <div>{{ user.email }}</div> pk 가져와집니다 -->
      <div class="userInfoGroupContainer">
        <img :src="user.profile_image" style="width: 50px; height: 50px" />
        {{ user.nickname }}
        <button>follow</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
.inRoomUsersContainer {
  height: 500px;
  width: 200px;
  border: 1px solid black;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.user {
  margin: 5px 0;
}
.userInfoGroupContainer {
    border: 1px solid black;
    height: 65px;
    width: 180px;
}
</style>
