<template>
  <div class="base_container">
    <ExitGameComponent></ExitGameComponent>
    <GameHeaderComponent></GameHeaderComponent>
  </div>
</template>

<script>
/*css import*/
import '@/assets/css/base_container.css'; //스케치북 모양 레이아웃 적용 위한 css

/*vue import*/
import ExitGameComponent from '@/components/game/ExitGameComponent.vue';
import GameHeaderComponent from '@/components/game/GameHeaderComponent.vue';

export default {
  components: {
    ExitGameComponent,
    GameHeaderComponent,
  },
};
</script>

<style scoped></style>
