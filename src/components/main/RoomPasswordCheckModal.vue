<template>
  <div class="passwordCheckModalContainer">
    <div class="modal-content">
      <h3>비밀번호 입력</h3>
      <input
        type="password"
        placeholder="비밀번호를 입력하세요."
        @change="changeInputPassword"
      />
      <button @click="checkPassword">확인</button>
      <button @click="hidePasswordCheckModal">취소</button>
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
        const roomId = parseInt(this.getNowRoom);
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
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}
</style>
