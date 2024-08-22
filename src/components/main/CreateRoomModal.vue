<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-content">
      <h2>방 만들기</h2>
      <input v-model="roomTitle" placeholder="방 제목을 입력하세요" />

      <!-- 비밀방 체크박스 -->
      <div class="checkbox">
        <input 
          type="checkbox" 
          id="privateRoom" 
          v-model="isPrivateRoom" 
        />
        <label for="privateRoom">비밀방</label>
      </div>

      <!-- 비밀번호 입력 (비활성화/활성화) -->
      <input 
        v-model="password" 
        :disabled="!isPrivateRoom" 
        placeholder="비밀방 체크 후 입력 가능합니다." 
      />
      <br />

      <button @click="createRoom">방 생성</button>
      <button @click="closeModal">닫기</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showModal: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      roomTitle: '',  // 방 제목
      password: '',   // 비밀번호
      isPrivateRoom: false,  // 비밀방 여부
    };
  },
  methods: {
    createRoom() {
      // 방 생성 로직 추가예정
      console.log(`방 제목: ${this.roomTitle}, 비밀방: ${this.isPrivateRoom ? '예' : '아니오'}, 비밀번호: ${this.password}`); // 체크용. 임시
      this.closeModal(); // 생성된 방 페이지 요청 로직 들어가야 하는 자리
    },
    closeModal() {
      this.$emit('close'); // 부모 컴포넌트로 모달 닫기 이벤트 전달
      this.resetForm();  // 폼 초기화
    },
    resetForm() {
      this.roomTitle = '';
      this.password = '';
      this.isPrivateRoom = false;
    }
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
  background: white;
  padding: 20px;
  width: 30vw;
}
</style>