<template>
  <div class="footer">
    <h3>방 목록</h3>
    <div class="room-list">
      <div class="room-box" v-for="(room, id) in paginatedRooms" :key="id">
        <div class="room-title">{{ room.title }}</div>
        <div class="game-status">진행 상태: {{ room.status }}</div>
        <div class="room-box-footer">
          <div class="user-count">👥 {{ room.users.length }} / 6 명</div>
          <!-- 비밀방 여부 표시 -->
          <div v-if="room.password !== ''" class="room-privacy">🔒</div>
        </div>
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

<style scoped>
.room-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 100%;
  margin-top: 10px;
}

.room-box {
  width: 48%; /* 화면에 두 개씩 맞추기 위해 조정 */
  border-radius: 10px; /* 둥근 모서리 */
  background-color: #fff5cc; /* 밝은 노란색 배경 */
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 효과 */
  color: #8e735b; /* 갈색 텍스트 */
  padding: 15px;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer; /* 마우스를 올렸을 때 포인터로 변경 */
}

.room-box:hover {
  transform: scale(1.03); /* 호버 시 살짝 확대 */
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.2); /* 호버 시 그림자 강화 */
}

.room-title {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 8px;
}

.room-privacy {
  font-weight: bold;
  color: #d98880; /* 밝은 빨간색 */
  margin-bottom: 5px;
}

.game-status {
  font-weight: bold;
  color: #82ae46; /* 녹색 */
  margin-top: 5px;
}

.room-box-footer {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  color: #f4d03f; /* 노란색 */
  margin-top: 10px;
}

.btn-cover {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.page-btn {
  background-color: #f9e79f; /* 부드러운 노란색 */
  border: none;
  padding: 8px;
  margin: 0 10px;
  color: #8e735b; /* 갈색 텍스트 */
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.page-btn:hover {
  background-color: #f7dc6f; /* 호버 시 더 진한 노란색 */
}

.page-btn:disabled {
  background-color: #d5dbdb; /* 비활성화된 버튼 색상 */
  color: #aab7b8; /* 비활성화된 버튼 텍스트 색상 */
}

.page-count {
  font-weight: bold;
  color: #8e735b; /* 갈색 텍스트 */
}
</style>
