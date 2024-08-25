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
    }),
    updateSearchType(event) {
      this.setSearchType(event.target.value);
    },
    updateSearchKeyword(event) {
      this.setSearchKeyword(event.target.value);
    },
  },
};
</script>
