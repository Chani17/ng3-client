<template>
  <div>
    <h1>게임페이지 임시</h1>
    <p>방pk: {{ roomId }}</p>
    <p>비번: {{ password }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  created() {
    const roomId = parseInt(this.roomId);
    const password = this.password;
    // axios post 요청
    this.requestJoinGamePage(roomId, password);
  },
  props: {
    roomId: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
  },
  methods: {
    async requestJoinGamePage(roomId, password) {
      // 일반방이면 인원수제한 등 체크, 비번방이면 비번검증 및 등등 체크
      //   const response = await axios.post("/api/rooms/join", {
      //     roomId,
      //     password,
      //   });

      //   const response = {
      //     data: {
      //       message: "비밀번호가 틀립니다.",
      //     },
      //     status: 401,
      //   };

      //   const response = {
      //     data: {
      //       message: "방 참여인원이 초과되었습니다.",
      //     },
      //     status: 402,
      //   };

      const response = {
        data: {},
        status: 200,
      };

      if (response.status !== 200) {
        // 백엔드에서 예외 메세지를 data.message에 담아서 응답.
        alert(response.data.message);
        this.$router.push("/main");
      }
    },
  },
};
</script>

<style></style>
