<template>
  <div class="createRoomModal">
    <input type="text" placeholder="방제목" id="title" />
    <input type="text" placeholder="비밀번호" id="password" v-if="isPrivate" />
    <input type="checkbox" @change="togglePrivate" />비밀방
    <button @click="createRoom">방 생성</button>
    <button @click="hideModal">닫기</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

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
      hideModal: "hideModal",
    }),
    createRoom() {
      const title = document.getElementById("title");
      const password = document.getElementById("password");

      if (title && password) {
        const title = title.value;
        let password = password.value;

        if (password.length < 1 || password === null) {
          password.value = "";
        }
        console.log(title, password);
      } else {
        console.error("Title 또는 Password 요소를 찾을 수 없습니다.");
      }
      console.log(title, password);

      // axios post 리퀘 날려야 함 (방번호 pk 응답으로 받아야 함)
      // const response = await axios.post("/api/rooms/", { title, password });

      // 받은 방 번호로 라우팅
      // this.$router.push(`/rooms/${response.data.pk}`);
      this.hideModal();
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
