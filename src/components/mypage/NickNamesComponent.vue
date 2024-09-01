<!-- [박혁진]: 닉네임 변경이 가능한 컴포넌트 작성-->
<template>
  <div class="temp_border">
    <div class="nick">박혁진</div>
    <button class="changeNicknameBtn">닉네임 수정</button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.temp_border {
  width: 85%;
  height: 15%;

  position: relative;

  text-align: center;
}

.nick {
  font-family: 'Gamja Flower', sans-serif;
  font-size: 50px;
}

.changeNicknameBtn {
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  background-color: #f2c249; /* 노란색 계열 */
  border: 3px solid #a67f59; /* 갈색 */
  color: rgb(90, 74, 59); /* 다크 브라운 */
  padding: 6px 11px;
  border-radius: 80px;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  outline: none;

  margin-bottom: 20px;
  font-family: 'Gamja Flower', sans-serif;
}

.changeNicknameBtn:hover {
  background-color: #fff4d1; /* 베이지 계열 */
  border-color: #f2c249; /* 노란색 */
}
</style>
