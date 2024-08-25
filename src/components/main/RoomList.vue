<template>
  <div class="roomListContainer">
    <div v-for="room in this.getRooms" :key="room.id" class="roomBox">
      <div>{{ room.title }}</div>
      <div>진행 상태 : {{ room.status }}</div>
      <div>{{ room.users.length }} / 6</div>
      <div v-if="room.password != ''">🔒</div>
    </div>
    <br>
    <button @click="decreasePage" :disabled="getPage === 0">이전</button>
    {{ getPage + 1 }} / {{ getTotalPageCount || 1 }}
    <button @click="increasePage" :disabled="getPage >= getTotalPageCount - 1">다음</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      getRooms: "getRooms",
      getPage: "getPage",
      getTotalPageCount: "getTotalPageCount",
    }),
  },
  methods: {
    ...mapActions({
      increasePage: "increasePage",
      decreasePage: "decreasePage",
    }),
  },
};
</script>

<style scoped>
.roomListContainer {
  border: 1px solid black;
  margin: 0px 60px;
  height: 400px;

  display: flex; /* 컨테이너를 flexbox로 설정 */
  flex-wrap: wrap; /* 아이템들이 줄 바꿈되도록 설정 */
  gap: 10px; /* 아이템 간의 간격 설정 */
  padding: 10px; /* 컨테이너 내부의 여백 설정 */
  box-sizing: border-box; /* 패딩과 테두리를 포함한 전체 너비/높이 계산 */
}

.roomBox {
  border: 1px solid black;
  flex: 1 1 calc(50% - 10px); /* 각 아이템의 너비를 50%에서 gap의 절반만큼 뺀 크기로 설정 */
  box-sizing: border-box; /* 패딩과 테두리를 포함한 전체 너비/높이 계산 */
  padding: 10px; /* 아이템 내부 여백 설정 */
  text-align: center; /* 텍스트를 중앙 정렬 */
  max-width: calc(50% - 10px);
}
</style>
