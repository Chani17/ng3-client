<template>
  <div class="searchBox">
    <select :value="searchType" @change="updateSearchType">
      <option value="title">방제목</option>
      <option value="nickname">유저닉네임</option>
    </select>
    <input type="text" :value="searchKeyword" @input="updateSearchKeyword" />
    <!-- <button @click="onSearch">검색</button> -->
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