<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-content">
      <h2>방 만들기</h2>
      <input v-model="roomTitle" placeholder="방 제목을 입력하세요." />
      <div class="checkbox-group">
      </div>
      <input
      v-model="password"
      :disabled="!isPrivateRoom"
      placeholder="비밀방 체크 후 입력 가능합니다."
      />
      <div id="private-room"> <input type="checkbox" v-model="isPrivateRoom">비밀방 </div>
      <div class="button-group">
        <button @click="createRoom">방 생성</button>
        <button @click="closeModal">닫기</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      roomTitle: "", // 방 제목
      password: "", // 비밀번호
      isPrivateRoom: false, // 비밀방 여부
    };
  },
  methods: {
    createRoom() {
      console.log(
        `방 제목: ${this.roomTitle}, 비밀방: ${
          this.isPrivateRoom ? "예" : "아니오"
        }, 비밀번호: ${this.password}`
      );
      this.closeModal();
    },
    closeModal() {
      this.$emit("close");
      this.resetForm();
    },
    resetForm() {
      this.roomTitle = "";
      this.password = "";
      this.isPrivateRoom = false;
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #f5f5dc;
  padding: 20px;
  width: 30vw;
  max-width: 500px;
  border: 3px solid #a67f59;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1.5vh; /* 요소 간의 간격 */
}

h2 {
  color: #a67f59;
  margin: 0; /* 제목의 기본 마진 제거 */
}

.modal-content input {
  background-color: #fff4d1;
  border: 2px solid #a67f59;
  color: #5a4a3b;
  padding: 10px;
  border-radius: 30px;
  font-size: 16px;
  width: 95%; /* 너비를 95%로 설정 */
  outline: none;
}

.modal-content input:focus {
  border-color: #f2c249;
}
.modal-content input[type="checkbox"] {
  width: 5%;
}

#private-room {
  display: flex;
}

button {
  background-color: #f9e79f;
  border: none;
  color: #8e735b;
  padding: 10px 15px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #f7dc6f;
}

.button-group {
  display: flex;
  justify-content: flex-end; /* 버튼들을 오른쪽 정렬 */
  gap: 10px; /* 버튼 간의 간격 */
}
</style>
