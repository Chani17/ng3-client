<template>
  <div class="middle">
    <p>
      <select v-model="searchType">
        <option value="title">방제목</option>
        <option value="nickname">닉네임</option>
      </select>
      <input type="text" v-model="searchKeyword" />
      <button @click="onSearch">검색</button>
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchType: "title", // 검색 타입 방제목으로 selected
      searchKeyword: "", // 검색 키워드
    };
  },
  methods: {
    async onSearch() {
      try {
        // 로컬 임시 JSON 데이터로 테스트
        const response = await axios.get("/mock-data.json");
        const allRooms = response.data;

        let filteredRooms = [];
        if (this.searchType === "title") {
          // 방 제목으로 검색
          filteredRooms = allRooms.filter((room) =>
            room.title.includes(this.searchKeyword)
          );
        } else if (this.searchType === "nickname") {
          // 유저 닉네임으로 검색
          filteredRooms = allRooms.filter((room) =>
            room.users.some((user) =>
              user.nickname.includes(this.searchKeyword)
            )
          );
        }

        console.log("검색결과:", filteredRooms); // 검색결과 체크용

        // 부모 컴포넌트에 이벤트로 전달
        this.$emit("search", filteredRooms);
      } catch (error) {
        console.error("검색 중 오류가 발생했습니다.", error);
      }
    },
  },
};
</script>

<style scoped>
.middle p {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  padding: 1vh 1vw;

}

select {
  background-color: #FFF4D1; /* 베이지 계열 색상 */
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
  background-color: #FFF4D1; /* 베이지 계열 색상 */
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
