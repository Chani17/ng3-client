<template>
  <div class="footer">
    <h3>방 목록</h3>
    <div class="room-list">
      <div class="room-box" v-for="(room, index) in paginatedRooms" :key="index">
        <div class="room-title">{{ room.title }}</div>
        <!-- 비밀방 여부 표시 -->
        <div v-if="room.password !== ''" class="room-status">비밀방</div>
        <div v-else class="room-status">공개방</div>
        <div class="room-status">진행 상태 : {{ room.status }}</div>
        <div class="user-count">{{ room.users.length }} 명 / 6</div>
      </div>
    </div>
    <div class="btn-cover">
      <button :disabled="pageNum === 0" @click="prevPage" class="page-btn">
        이전
      </button>
      <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
      <button
        :disabled="pageNum >= pageCount - 1"
        @click="nextPage"
        class="page-btn"
      >
        다음
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rooms: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      pageNum: 0,
      pageSize: 6,
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.rooms.length / this.pageSize);
    },
    paginatedRooms() {
      const start = this.pageNum * this.pageSize;
      const end = start + this.pageSize;
      return this.rooms.slice(start, end);
    },
  },
  methods: {
    nextPage() {
      if (this.pageNum < this.pageCount - 1) {
        this.pageNum += 1;
      }
    },
    prevPage() {
      if (this.pageNum > 0) {
        this.pageNum -= 1;
      }
    },
  },
  watch: {
    rooms() {
      this.pageNum = 0; // rooms가 변경될 때 pageNum을 초기화
    },
  },
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

.btn-cover {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.page-btn {
  margin: 0 10px;
}

.page-count {
  font-weight: bold;
}
</style>
