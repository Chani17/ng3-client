<template>
  <div class="createRoomModal">
    <input type="text" placeholder="방제목" id="title" ref="titleInput" />
    <input type="text" placeholder="비밀번호" id="password" v-if="isPrivate" ref="passwordInput"/>
    <input type="checkbox" @change="togglePrivate" />비밀방
    <button @click="createRoom">방 생성</button>
    <button @click="hideCreateRoomModal">닫기</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import axios from "axios";

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
        const roomId = 35; // 임시로 db에서 pk 보내줬다고 가정
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
  top: 30%;
  left: 30%;
  width: 600px;
  height: 400px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
</style>
