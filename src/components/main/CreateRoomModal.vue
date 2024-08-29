<template>
  <div class="createRoomModal">
    <input type="text" placeholder="방제목" id="title" ref="titleInput" />
    <input
      type="text"
      placeholder="비밀번호"
      id="password"
      v-if="isPrivate"
      ref="passwordInput"
    />
    <div>
      <input type="checkbox" @change="togglePrivate" /> 비밀방
    </div>
    <div class="buttonGroup">
      <button @click="createRoom">방 생성</button>
      <button @click="hideCreateRoomModal">닫기</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

export default {
  created() {},
  data() {
    return {
      isPrivate: false,
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      hideCreateRoomModal: "hideCreateRoomModal",
    }),
    async createRoom() {
      try {
        const titleInput = this.$refs.titleInput;
        const passwordInput = this.$refs.passwordInput;
        const title = titleInput ? titleInput.value : "";
        const password = passwordInput ? passwordInput.value : "";
        const userId = this.$store.getters.getLoginUserId;
        
        console.log(userId);
        
        // 요청 데이터 준비
        const requestData = { title, password, userId };

        // 서버에 POST 요청
        const response = await axios.post("http://nggg.com:8080/room", requestData);

        // 서버에서 반환된 방 ID
        const roomId = parseInt(response.data.roomId);

        this.$router.push(`/room/${roomId}`);
        console.log(title, password);
        this.hideCreateRoomModal();
      } catch (error) {
        console.error("방 생성 중 오류가 발생했습니다.", error);
      }
    },
    togglePrivate() {
      this.isPrivate = !this.isPrivate;
    },
  },
};
</script>

<style>
.createRoomModal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 20px;
  background-color: #FFF4D1; /* 베이지 계열 */
  border: 2px solid #A67F59; /* 갈색 */
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.createRoomModal input[type="text"] {
  background-color: #FFF4D1; /* 베이지 계열 */
  border: 2px solid #A67F59; /* 갈색 */
  color: #5A4A3B; /* 다크 브라운 */
  padding: 10px;
  border-radius: 10px;
  font-size: 16px;
  width: 100%;
  outline: none;
}

.createRoomModal input[type="text"]:focus {
  border-color: #F2C249; /* 노란색 계열 포커스 */
}

.createRoomModal input[type="checkbox"] {
  margin-right: 10px;
}

.createRoomModal .buttonGroup {
  display: flex;
  justify-content: center; /* 버튼들을 오른쪽 정렬 */
  gap: 10px; /* 버튼 사이 간격 5px */
}

.createRoomModal button {
  background-color: #A67F59; /* 갈색 */
  color: #FFF4D1; /* 베이지 텍스트 */
  border: none;
  padding: 10px;
  border-radius: 10px;
  font-size: 16px;
  width:100px; /* 버튼 너비 30px */
  text-align:center;
  cursor: pointer;
}

.createRoomModal button:hover {
  background-color: #5A4A3B; /* 다크 브라운 */
}

.createRoomModal button:focus {
  outline: none;
  box-shadow: 0 0 0 2px #F2C249; /* 노란색 계열 포커스 */
}

</style>