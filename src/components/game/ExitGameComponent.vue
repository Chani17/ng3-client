<template>
  <div class="exitGameContainer">
    <router-link to="/main" class="exitGameButton"></router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.exitGameContainer {
  position: absolute;
  height: 5%;
  top: 15%;
  width: calc(1500px - 12%); /*스케치북 width - 밑의 left * 2*/
  left: 6%;
}

.exitGameButton {
  background-image: url('@/assets/image/exitGameArrow.png');
  background-size: contain;
  background-repeat: no-repeat;
  height: 100%;
  width: 5%;
  display: block; /*router-link는 inline요소*/
}
</style>
