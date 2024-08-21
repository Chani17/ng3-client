<template>
  <div class="footer">
    <h3>방 목록</h3>
    <div class="room-list">
      <div 
        class="room-box" 
        v-for="(room, index) in rooms" 
        :key="index"
      >
        <div class="room-title">{{ room.title }}</div>
        <div class="user-list">
          <div v-for="(user, userIndex) in room.users" :key="userIndex">
            {{ user.nickname }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rooms: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style>
.footer {
  padding: 20px;
}

.room-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 100%;
  margin-top: 10px;
}

.room-box {
  width: 45%;
  height: auto; /* 높이를 자동으로 조절 */
  border: 1px solid black;
  display: flex;
  flex-direction: column; /* 방 제목과 유저 목록을 세로로 배치 */
  margin: 10px;
  padding: 10px;
}

.room-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.user-list {
  display: flex;
  flex-direction: column;
}
</style>
