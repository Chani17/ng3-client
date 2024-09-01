<!-- 이하린 : 메인 페이지 중간에 위치한 방 만들기 버튼 및 검색 컴포넌트 호출부 -->

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

<style scoped>
.middleContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px auto;
  padding: 10px 0;
  max-width: 85%;
}

.createRoomButton {
  background-color: #f2c249; /* 노란색 계열 */
  border: 2px solid #a67f59; /* 갈색 */
  color: #5a4a3b; /* 다크 브라운 */
  padding: 10px 20px;
  border-radius: 80px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  outline: none;
}

.createRoomButton:hover {
  background-color: #fff4d1; /* 베이지 계열 */
  border-color: #f2c249; /* 노란색 */
}
</style>
