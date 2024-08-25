<template>
  <!--ToomComponent = room 목록을 표시해주는 컴포넌트-->
  <div class="roomListContainer">
    <!--개별 룸들-->
    <div v-for="room in this.getRooms" v-bind:key="room.id" class="roomBox">
      <!--v-bind:key는 Dom업데이트 최적하하기 위해 쓰는 값, 실제 html에서 사용하지 않아도 괜찮다. 꼭 각 room의 고유한 값으로 설정할 것 -->
      <!--index rooms를 바탕으로 for문을 돌렸을때 생성되기 때문에 rooms의 index와 똑같이 대응한다. 즉, 저 index를 통해 해당 room이 rooms[index]에 있다는것을 알 수 있다.-->
      <div>{{ room.id }}</div>
      <div>{{ room.title }}</div>
      <div>{{ room.users.length }} / 6</div>
      <div v-if="room.password != ''">🔒</div>
    </div>
    <button @click="decreasePage">prev</button>
    {{ getPage + 1 }} / {{ getTotalPageCount + 1 }}
    <button @click="increasePage">next</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"; //store.js의 getters와 mapActions를 이곳에서 사용할거라는 의미

export default {
  created() {
    this.fetchRooms1(); //밑의 methods에서 매칭한것을 바탕으로 store.js의 rooms에 db에서 불러온 값 넣는 메서드 실행  
  },

  computed: {
    //getters는 computed에 넣는다.
    ...mapGetters({
      //store.js에 있는 getters를 여기서 사용할거다.
      getRooms: "getRooms", 
      getPage: "getPage", 
      getTotalPageCount: "getTotalPageCount",
    }),
  },
  methods: {
    //actions, mutations는 methods에 넣는다.
    ...mapActions({
      //store.js에 있는 actions를 여기서 사용할거다.
      fetchRooms1: "fetchRooms",
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
