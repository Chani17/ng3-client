<template>
  <div class="searchBox">
    <select :value="searchType" @change="updateSearchType">
      <option value="title">방제목</option>
      <option value="nickname">닉네임</option>
    </select>
    <input type="text" :value="searchKeyword" @input="updateSearchKeyword" />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  created() {
    this.fetchRoom(); // 컴포넌트 생성 시 데이터 로드
  },
  computed: {
    ...mapGetters({
      searchType: "getSearchType",
      searchKeyword: "getSearchKeyword",
    }),
  },
  methods: {
    ...mapMutations({
      setSearchType: "setSearchType",
      setSearchKeyword: "setSearchKeyword",
    }),
    ...mapActions({
      fetchRoom: "fetchRoom",
      filterRooms: "filterRooms",  // filterRooms 액션을 불러오기
    }),
    updateSearchType(event) {
      this.setSearchType(event.target.value);
      this.filterRooms(); // searchType 변경 후 필터링
    },
    updateSearchKeyword(event) {
      this.setSearchKeyword(event.target.value);
      this.filterRooms(); // searchKeyword 변경 후 필터링
    },
  },
};
</script>

<style scoped>
.searchBox {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 1vh 1vw;
}

select {
  background-color: #FFF4D1; /* 베이지 계열 */
  border: 2px solid #A67F59; /* 갈색 */
  color: #5A4A3B; /* 다크 브라운 */
  padding: 10px;
  border-radius: 80px;
  font-size: 16px;
  width: 100px;
  outline: none;
}

select:focus {
  border-color: #F2C249; /* 노란색 계열 포커스 */
}

input[type="text"] {
  background-color: #FFF4D1; /* 베이지 계열 */
  border: 2px solid #A67F59; /* 갈색 */
  color: #5A4A3B; /* 다크 브라운 */
  padding: 10px;
  border-radius: 80px;
  font-size: 16px;
  width: 250px;
  outline: none;
}

input[type="text"]:focus {
  border-color: #F2C249; /* 노란색 계열 포커스 */
}
</style>