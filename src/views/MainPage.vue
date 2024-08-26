<template>
  <div class="base_container">
    <HeaderComponent></HeaderComponent>
    <RoomComponent></RoomComponent>
  </div>
</template>

<script>
import '@/assets/css/base_container.css'; //스케치북 모양 레이아웃 적용 위한 css

import HeaderComponent from '@/components/main/HeaderComponent.vue';
import RoomComponent from '@/components/main/RoomComponent.vue';
export default {
  components: {
    HeaderComponent,
    RoomComponent,
  },
};
</script>

<style></style>
