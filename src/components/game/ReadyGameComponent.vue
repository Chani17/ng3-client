<template>
  <div class="readyGameComponent">
    <div v-if="isVisible" class="readyRender">
      <div class="selectContainer">
        <select class="theme">
          <!--여기서 v-if로 테마 불러와야됨-->
          <option value="option1">과일</option>
          <option value="option2">사람</option>
        </select>
      </div>
      <div class="readyContainer">
        <button class="readyButton" @click="startGame">READY</button>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  data() {
    return {
      isVisible: true, // 요소의 표시 여부를 관리하는 상태
    };
  },
  methods: {
    async startGame() {
      // try {
      // 서버에 게임 시작 요청 보내기
      // const response = await axios.post('https://your-server-api/start-game', {
      // 필요한 데이터를 여기에 포함
      // userId: '12345', // 예시로 사용자 ID를 포함
      // });

      // if (response.status === 200) {
      // 요청이 성공하면 요소를 숨기기
      this.isVisible = false;
      // 추가적으로, 게임 시작에 대한 다른 처리를 여기에서 할 수 있습니다. 테마 아이디 보내야됨
      // } else {
      // console.error('서버에서 에러 응답을 받았습니다:', response);
      // }
      // } catch (error) {
      // console.error('서버에 요청을 보내는 중 에러가 발생했습니다:', error);
      // }
    },
  },
};
</script>

<style>
.readyGameComponent {
  height: 500px;
  width: 700px;
  border: 1px solid black;
  border-radius: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.readyRender {
  display: flex;
  height: 500px;
  width: 700px;
  border: 1px solid black;
  border-radius: 25px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: rgb(114, 70, 40);
  opacity: 40%;
}

.readyButton {
  height: 100px;
  width: 200px;
  justify-content: center;
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 10px;
  font-size: 24px;
  cursor: pointer;
}
</style>
