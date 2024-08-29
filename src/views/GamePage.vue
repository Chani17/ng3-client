<template>
  <div class="base_container">
    <ExitGameComponent></ExitGameComponent>
    <GameHeaderComponent></GameHeaderComponent>
    <div class="gameComponentContainer">
      <div class="userReadyChatContainer">
        <InRoomUsersComponent :users="users"></InRoomUsersComponent>
        <ReadyGameComponent></ReadyGameComponent>
        <ChatRoomComponent></ChatRoomComponent>
      </div>
    </div>
  </div>
</template>

<script>
/*css import*/
import "@/assets/css/base_container.css"; //스케치북 모양 레이아웃 적용 위한 css

/*vue import*/
import ExitGameComponent from "@/components/game/ExitGameComponent.vue";
import GameHeaderComponent from "@/components/game/GameHeaderComponent.vue";
import InRoomUsersComponent from "@/components/game/InRoomUsersComponent.vue";
import ReadyGameComponent from "@/components/game/ReadyGameComponent.vue";
import ChatRoomComponent from "@/components/game/ChatRoomComponent.vue";

import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      users: [], // 유저 데이터 저장용 배열
    };
  },
  created() {
    const roomId = this.roomId;
    // const userId = this.$store.getters.getLoginUserId;
    const password = this.password;

    this.requestEnterGamePage(roomId, password);
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
    async requestEnterGamePage(roomId, password) {
      try {
        const userId = this.$store.getters.getLoginUserId;
        const response = await axios.post("http://localhost:8080/room/enter", {
          roomId,
          userId,
          password,
        });

        if (response.status === 200) {
          // 서버로부터 받은 유저 정보를 저장
          this.users = response.data.users;

          console.log(this.users);

          const targetPath = `/room/${roomId}`;
          if (this.$route.path !== targetPath) {
            this.$router.push(targetPath);
          }
        } else {
          // 에러 처리
          Swal.fire({
            icon: "error",
            title: "입장 불가!",
            text: response.data.message,
          });
          this.$router.push("/main");
        }
      } catch (error) {
        // 서버로부터 발생한 에러 처리
        if (error.response) {
          Swal.fire({
            icon: "error",
            title: "입장 불가!",
            text: error.response.data.message || "알 수 없는 오류가 발생했습니다.",
          });
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
    InRoomUsersComponent,
    ReadyGameComponent,
    ChatRoomComponent,
  },
};
</script>

<style scoped>
.gameComponentContainer {
  margin-top: 250px;
  width: 100%;
}
.userReadyChatContainer {
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 28px;
}
</style>