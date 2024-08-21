<template>
  <div>
    <main-header></main-header>
    <main-middle @search="handleSearch"></main-middle>
    <main-footer :rooms="rooms"></main-footer>
  </div>
</template>

<script>
import MainHeader from "@/components/layout/MainHeader.vue";
import MainMiddle from "@/components/layout/MainMiddle.vue";
import MainFooter from "@/components/layout/MainFooter.vue";

export default {
  name: "PageMain",
  components: {
    MainHeader,
    MainMiddle,
    MainFooter,
  },
  data() {
    return {
      rooms: [], // 초기값은 빈 배열로 설정
    };
  },
  async created() {
    await this.fetchRooms();
  },
  methods: {
    async fetchRooms() {
      try {
        const response = await fetch('/mock-data.json'); // mock-data.json의 경로
        if (!response.ok) throw new Error('네트워크 응답에 문제가 있습니다.');
        const data = await response.json();
        this.rooms = data;
      } catch (error) {
        console.error('방 목록을 가져오는 데 실패했습니다:', error);
      }
    },
    handleSearch(filteredRooms) {
      this.rooms = filteredRooms; // 검색 결과를 저장
    },
  },
};
</script>

<style></style>