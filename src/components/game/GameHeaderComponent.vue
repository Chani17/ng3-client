<template>
  <div class="gameHeadContainer">
    <div class="alarm">
      <!--남은시간 알림창-->
      <div class="alarm-time">
        <!--남은 시간-->
        100
      </div>
    </div>
    <div class="round">
      <!--현재 라운드 표시-->
      1 Round of 3
    </div>
    <div class="word">제시어 나오는 곳</div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.gameHeadContainer {
  border: 3px solid #a55905;
  border-radius: 50px;
  box-shadow: 3px 3px 1px #eddc8d;
  position: absolute;
  height: 6%;
  top: 23%;
  width: calc(1500px - 14%); /*스케치북 width - 밑의 left * 2*/
  left: 7%;
  background-color: #fffec8;

  /*이 밑은 내부 요소를 배열하기 위한 css*/
  display: flex;
  align-items: center;
  position: relative;

  z-index: 1;
}

.alarm {
  background-image: url(@/assets/image/alarm.png);
  background-size: contain;
  background-repeat: no-repeat;
  height: 100px;
  width: 100px;

  position: relative;
  z-index: 2;

  /*컴포넌트 안에서 위치*/
  margin-right: 10px;
  margin-left: -28px;
}

.alarm-time {
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  height: 100px; /* 예시로 높이를 지정 */
  width: 100px;
  font-size: bold;
  font-weight: bold;
}

.round {
  font-weight: bold;
  margin-right: 10px;

  position: relative;
  z-index: 2;
}

.word {
  font-weight: bold;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  position: absolute;
  z-index: 2;
}
</style>
