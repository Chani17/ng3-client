<template>
  <router-view></router-view>
</template>

<script>
export default {};
</script>

<style>
* {
  box-sizing: border-box; /*width와 height가 padding, margin포함*/
}
html,
body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
body {
  /*기린 무느의 배경화면*/
  background-image: url('../src/assets/image/backgroundImg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
}
</style>
