<template>
  <div class="base_container">
    <HeaderComponent></HeaderComponent>
    <RoomComponent></RoomComponent>
    <div></div>
  </div>
</template>

<script>
import "@/assets/css/base_container.css"; //스케치북 모양 레이아웃 적용 위한 css
import { mapGetters, mapActions } from "vuex"; //store.js의 getters와 mapActions를 이곳에서 사용할거라는 의미

import HeaderComponent from "@/components/main/HeaderComponent.vue";
import RoomComponent from "@/components/main/RoomComponent.vue";

export default {
  created() {
    const roomData = {
      title: "첫번째방",
      password: "1234",
      userCount: 4,
      isPrivate: false,
    };
    this.createRoom(roomData);
    this.$store.dispatch('startPolling');

    console.log(this.getRooms); 
  },
  computed: {
    //getters는 computed에 넣는다.
    ...mapGetters({
      getRooms: "getRooms",
    }),
  },
  methods: {
    ...mapActions({
      createRoom: "createRoom",
    }),
  },

  components: {
    HeaderComponent,
    RoomComponent,
  },
};
</script>

<style scoped></style>
