<!-- 박혁진: 마이페이지 기능 확인 가능한 vue 컴포넌트 -->
<template>
  <div class="base_container">
    <div class="myPage_frame">
      <ExitGameComponent></ExitGameComponent>
      <div class="myPage_title">MyPage</div>
      <CharacterComponent></CharacterComponent>
      <NickNamesComponent></NickNamesComponent>
    </div>
  </div>
</template>

<script>
import '@/assets/css/base_container.css'; //스케치북 모양 레이아웃 적용 위한 css

import CharacterComponent from '@/components/mypage/CharacterComponent.vue';
import NickNamesComponent from '@/components/mypage/NickNamesComponent.vue';
import ExitGameComponent from '@/components/game/ExitGameComponent.vue';

export default {
  components: {
    CharacterComponent,
    NickNamesComponent,
    ExitGameComponent,
  },
};
</script>

<style>
.myPage_frame {
  border: 4px solid #a67f59;
  border-radius: 50px;
  display: flex;
  flex-direction: column; /* 요소들을 세로로 배치 */
  justify-content: center; /* 부모 요소 안에서 요소들을 세로 가운데 정렬 */
  align-items: center; /* 각 줄 안에서 가로 가운데 정렬 */
  margin: 170px auto;
  width: 80%;
  height: 70%;
  gap: 24px;
}

.myPage_title {
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  text-align: right;
  font-size: 40px;
  font-weight: bold;
  color: #523213;
  font-weight: bold;
}
</style>
