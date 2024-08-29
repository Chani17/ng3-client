<template>
  <div class="roomListContainer">
    <div class="list-box">
      <div class="room-list">
        <div
          v-for="room in getRooms"
          :key="room.id"
          class="roomBox"
          @click="handleRoomClick(room)"
        >
          <div>{{ room.title }}</div>
          <div>진행 상태 : {{ room.state }}</div>
          <div class="roomBoxFooter">
            <div>{{ room.users.length }} / 6</div>
            <div v-if="room.password">🔒</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pagingButtonGroup">
      <button @click="decreasePage" :disabled="getPage === 0">이전</button>
      {{ getPage + 1 }} / {{ getTotalPageCount || 1 }}
      <button
        @click="increasePage"
        :disabled="getPage >= getTotalPageCount - 1"
      >
        다음
      </button>
    </div>

    <RoomPasswordCheckModal v-if="getShowPasswordCheckModal" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import RoomPasswordCheckModal from "@/components/main/RoomPasswordCheckModal.vue";
import Swal from "sweetalert2";

export default {
  computed: {
    ...mapGetters({
      getRooms: "getRooms",
      getPage: "getPage",
      getTotalPageCount: "getTotalPageCount",
      getShowPasswordCheckModal: "getShowPasswordCheckModal",
    }),
  },
  methods: {
    ...mapActions({
      increasePage: "increasePage",
      decreasePage: "decreasePage",
      setNowRoom: "setNowRoom",
      checkRoomPassword: "checkRoomPassword",
      showPasswordCheckModal: "showPasswordCheckModal",
      hidePasswordCheckModal: "hidePasswordCheckModal",
    }),
    handleRoomClick(room) {
      const roomId = room.id;
      const roomState = room.state;

      if (roomState == "START") {
        Swal.fire({
            icon: "warning",
            title: "입장 불가!",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            text: "게임 진행 중으로 입장할 수 없습니다.",
          });
        return;
      }

      this.setNowRoom(roomId);
      if (room.password) {
        this.showPasswordCheckModal();
      } else {
        this.$router.push(`/room/${roomId}`);
      }
    },
  },
  components: {
    RoomPasswordCheckModal,
  },
};
</script>

<style scoped>
.roomListContainer {
  border: 3px solid #a55905;
  border-radius: 20px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
  max-width: 85%;
  display: flex;
  flex-direction: column;
  height: auto;
  box-sizing: border-box;
  margin: 0 auto; /* 수평 가운데 정렬 */
  align-items: center; /* 내부 요소 가운데 정렬 */
  /* height: 480px; */
}

.list-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 440px;
}

.room-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 20px;
  gap: 20px;
  justify-content: space-between;
  margin-bottom: 20px;
}

.roomBox {
  width: 48%;
  border: 2px solid #a55905;
  border-radius: 15px;
  background-color: #fffec8;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  padding: 10px 10px 0 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.roomBox:hover {
  transform: translateY(-5px);
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.2);
}

.roomBox div:first-child {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #a55905;
}

.roomBox div {
  margin-bottom: 5px;
}

.roomBoxFooter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.roomBoxFooter div:first-child {
  font-weight: bold;
  color: #333;
}

.roomBoxFooter div:last-child {
  font-size: 1.2rem;
  color: #a55905;
}

.pagingButtonGroup {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bolder;
  margin-bottom: 20px;
}

.pagingButtonGroup button {
  border: 2px solid #a55905;
  background-color: #ffffff;
  padding: 8px 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.pagingButtonGroup button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagingButtonGroup button:not(:disabled):hover {
  background-color: #a55905;
  color: #ffffff;
}
</style>
