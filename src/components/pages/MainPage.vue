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

<style>
/* 전체 페이지 배경 색상 */
body {
  background-color: #F5F5DC; /* 베이지 색상 */
  margin: 0;
  font-family: Arial, sans-serif;
  color: #333; /* 기본 텍스트 색상 */
}

/* 헤더, 중간 영역, 푸터 배경 색상 */
main-header {
  background-color: #F9E79F; /* 노란색 계열 */
  padding: 10px;
}

main-middle {
  background-color: #F5F5DC; /* 베이지 색상 */
  padding: 20px;
}

main-footer {
  background-color: #8E735B; /* 갈색 */
  padding: 10px;
  color: #F5F5DC; /* 글자색: 베이지 */
}

/* 기본적인 레이아웃 조정 */
div {
  box-sizing: border-box;
}

/* 다른 기본 스타일 */
h1, h2, h3, h4, h5, h6 {
  margin: 0;
}

a {
  color: #1E90FF; /* 링크 색상 */
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

button {
  background-color: #F9E79F; /* 노란색 계열 버튼 */
  border: none;
  padding: 10px;
  color: #8E735B; /* 갈색 글자 */
  cursor: pointer;
}

button:disabled {
  background-color: #D3D3D3; /* 비활성화된 버튼 색상 */
  color: #A9A9A9; /* 비활성화된 버튼 글자 색상 */
}

button {
  background-color: #F2C249; /* 노란색 계열 */
  border: 2px solid #A67F59; /* 갈색 */
  color: #5A4A3B; /* 다크 브라운 */
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #E5B843; /* 호버 시 노란색이 더 진하게 */
}

button:active {
  background-color: #DDA521; /* 클릭 시 노란색이 더 어둡게 */
}


</style>