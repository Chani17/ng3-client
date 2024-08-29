<template>
  <div class="inRoomUsersContainer">
    <div v-for="user in users" :key="user.id" class="user">
      <!-- <div>{{ user.email }}</div> pk 가져와짐 -->
      <div class="userInfoGroupContainer1">
        <img :src="user.profile_image" style="width: 50px; height: 50px" />
        <div class="userInfoGroupContainer2">
          <div>3 point</div> <!-- 실제 값으로 렌더링해야함 -->
          {{ user.nickname }}
          <button>follow</button>
        </div>
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
.userInfoGroupContainer1 {
  border: 1px solid black;
  height: 65px;
  width: 180px;
  display: flex;
}

.userInfoGroupContainer2 {
    margin-left: 5px;
  margin-top: 3px;
  flex-direction: row;
}
</style>
