<template>
  <div>
    <h1>게임페이지 임시</h1>
    <p>방pk: {{ roomId }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  created() {
    const roomId = this.roomId;
    const password = this.password;
    // axios post 요청
    this.requestJoinGamePage(roomId, password);
  },
  props: {
    roomId: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
  },
  methods: {
    async requestJoinGamePage(roomId, password) {
      try {
        // 서버에 방 입장 요청을 보냄
        const response = await axios.post("http://localhost:8080/room/enter", {
          roomId,
          password,
        });

        // 상태 코드가 200이 아닌 경우, 에러로 처리
        if (response.status !== 200) {
          alert(response.data.message);
          this.$router.push("/main");
          return;
        } else if (response.status === 200) {
          // 중복된 탐색 방지
          const targetPath = `/room/${roomId}`;
          if (this.$route.path !== targetPath) {
            this.$router.push(targetPath);
          }
        }

        // 추가 로직 필요하면 여기에 
        
      } catch (error) {
        // 서버로부터 발생한 에러 처리
        if (error.response) {
          const status = error.response.status;
          const message = error.response.data.message;

          if (status === 401) {
            alert(message);
          } else if (status === 402) {
            alert(message);
          } else if (status === 403) {
            alert(message);
          } else if (status === 404) {
            alert(message);
          } else {
            alert("알 수 없는 오류가 발생했습니다.");
          }

          this.$router.push("/main");
        } else {
          alert("서버에 연결할 수 없습니다. 다시 시도해주세요.");
          this.$router.push("/main");
        }
      }
    },
  },
};
</script>

<style></style>
