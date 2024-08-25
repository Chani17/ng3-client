<template>
  <div class="base_container">
    <HeaderComponent></HeaderComponent>
    <MiddleComponent></MiddleComponent>
    <RoomList></RoomList>
    <CreateRoomModal v-if="getShowModal"></CreateRoomModal>
  </div>
</template>

<script>
import "@/assets/css/base_container.css"; //스케치북 모양 레이아웃 적용 위한 css
import { mapGetters, mapActions } from "vuex"; //store.js의 getters와 mapActions를 이곳에서 사용할거라는 의미

import HeaderComponent from "@/components/main/HeaderComponent.vue";
import MiddleComponent from "@/components/main/MiddleComponent.vue";
import RoomList from "@/components/main/RoomList.vue";
import CreateRoomModal from "@/components/main/CreateRoomModal.vue";

export default {
  created() {
    this.$store.dispatch("startPolling");
  },
  computed: {
    //getters는 computed에 넣는다.
    ...mapGetters({
      getRooms: "getRooms",
      getShowModal: "getShowModal",
    }),
  },
  methods: {
    ...mapActions({
      createRoom: "createRoom",
      showModal: "showModal",
      hideModal: "hideModal",
    }),
  },

  components: {
    HeaderComponent,
    MiddleComponent,
    RoomList,
    CreateRoomModal,
  },
};
</script>

<style scoped></style>
