<template>
  <div class="middleContainer">
    <button class="createRoomButton" @click="showCreateRoomModal">
      방만들기
    </button>
    <SearchBox></SearchBox>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import SearchBox from "@/components/main/SearchBox.vue";

export default {
  methods: {
    ...mapActions({
      showCreateRoomModal: "showCreateRoomModal",
    }),
  },
  components: {
    SearchBox,
  },
};
</script>

<style>
.middleContainer {
  display: flex;
  justify-content: space-between;
  margin: 0px 60px;
}
</style>
