<template>
  <div class="passwordCheckModalContainer">
    <div class="modal-content">
      <h3>비밀번호 입력</h3>
      <input type="password"
        placeholder="비밀번호를 입력하세요."
        @change="changeInputPassword"
      />
      <div class="buttonGroup">
        <button @click="checkPassword">확인</button>
        <button @click="hidePasswordCheckModal">취소</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      inputPassword: "",
    };
  },
  computed: {
    ...mapGetters({
      getNowRoom: "getNowRoom",
    }),
  },
  methods: {
    ...mapActions({
      hidePasswordCheckModal: "hidePasswordCheckModal",
    }),
    changeInputPassword(event) {
      this.inputPassword = event.target.value;
    },
    async checkPassword() {
      try {
        const roomId = this.getNowRoom.toString();
        const inputPassword = this.inputPassword;

        this.$router.push({
          name: "gamePage",
          params: {
            roomId: roomId,
            password: inputPassword,
          },
        });
      } catch (error) {
        console.error("방 확인 중 오류 발생:", error);
      }
    },
  },
};
</script>

<style scoped>
.passwordCheckModalContainer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #FFF4D1; /* 베이지 계열 */
  padding: 20px;
  border-radius: 20px;
  border: 2px solid #A67F59; /* 갈색 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 400px; /* createRoomModal과 동일한 너비 */
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-align: center;
}

.modal-content h3 {
  margin: 0 0 10px 0;
  color: #5A4A3B; /* 다크 브라운 */
}

.modal-content input[type="password"] {
  background-color: #FFF4D1; /* 베이지 계열 */
  border: 2px solid #A67F59; /* 갈색 */
  color: #5A4A3B; /* 다크 브라운 */
  padding: 10px;
  border-radius: 10px;
  font-size: 16px;
  width: 100%;
  outline: none;
}

.modal-content input[type="password"]:focus {
  border-color: #F2C249; /* 노란색 계열 포커스 */
}

.modal-content .buttonGroup {
  display: flex;
  justify-content: center; /* 버튼들을 가운데 정렬 */
  gap: 5px; /* 버튼 사이 간격 5px */
}

.modal-content button {
  background-color: #A67F59; /* 갈색 */
  color: #FFF4D1; /* 베이지 텍스트 */
  border: none;
  padding: 10px;
  border-radius: 10px;
  font-size: 16px;
  width: 100px; /* 버튼 너비 100px */
  cursor: pointer;
}

.modal-content button:hover {
  background-color: #5A4A3B; /* 다크 브라운 */
}

.modal-content button:focus {
  outline: none;
  box-shadow: 0 0 0 2px #F2C249; /* 노란색 계열 포커스 */
}
</style>
