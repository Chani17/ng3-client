<template>
  <div class="roomListContainer">
    <div class="room-list">
      <div
        v-for="room in getRooms"
        :key="room.id"
        class="roomBox"
        @click="handleRoomClick(room)"
      >
        <div>{{ room.title }}</div>
        <div>진행 상태 : {{ room.status }}</div>
        <div class="roomBoxFooter">
          <div>{{ room.users.length }} / 6</div>
          <div v-if="room.password">🔒</div>
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
      this.setNowRoom(room.id);
      if (room.password) {
        this.showPasswordCheckModal();
      } else {
        this.$router.push(`/room/${room.id}`);
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
  border: 1px solid black;
  margin: 0px 60px;
  height: 400px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;
}

.room-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
}

.roomBox {
  border: 1px solid black;
  flex: 1 1 calc(50% - 10px);
  box-sizing: border-box;
  padding: 10px;

  width: 50%;
}

.roomBoxFooter {
  display: flex;
  justify-content: space-between;
}

.pagingButtonGroup {
  margin: 1.5rem 0;
  display: flex;
  justify-content: center;
}

</style>
