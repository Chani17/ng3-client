<template>
  <div class="base_container">
    <ExitGameComponent></ExitGameComponent>
    <GameHeaderComponent></GameHeaderComponent>
  </div>
</template>

<script>
/*css import*/
import "@/assets/css/base_container.css"; //스케치북 모양 레이아웃 적용 위한 css

/*vue import*/
import ExitGameComponent from "@/components/game/ExitGameComponent.vue";
import GameHeaderComponent from "@/components/game/GameHeaderComponent.vue";
import axios from "axios";
import Swal from "sweetalert2";

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
          Swal.fire({
            icon: "error",
            title: "입장 불가!",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            text: response.data.message,
          });
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
            Swal.fire({
              icon: "warning",
              title: "입장 불가!",
              text: message,
            });
          } else if (status === 402) {
            Swal.fire({
              icon: "warning",
              title: "입장 불가!",
              text: message,
            });
          } else if (status === 403) {
            Swal.fire({
              icon: "error",
              title: "입장 불가!",
              text: message,
            });
          } else if (status === 404) {
            Swal.fire({
              icon: "error",
              title: "입장 불가!",
              text: message,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "입장 불가!",
              text: "알 수 없는 오류가 발생했습니다.",
            });
          }

          this.$router.push("/main");
        } else {
          Swal.fire({
            icon: "error",
            title: "Server Error",
            text: "서버에 연결할 수 없습니다. 다시 시도해주세요.",
          });
          this.$router.push("/main");
        }
      }
    },
  },
  components: {
    ExitGameComponent,
    GameHeaderComponent,
  },
};
</script>

<style scoped></style>
