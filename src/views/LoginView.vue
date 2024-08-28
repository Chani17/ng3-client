<template>
  <div class="whiteboard">
    <!--하얀 배경-->
    <div class="sketchBookImg">
      <!--스케치북-->
      <div class="loginBtn" @click="login">
        <img src="../assets/image/google.png" />
        <span>구글 계정으로 시작하기</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        //토큰이 있다면 바로 main으로 가게
        this.$router.push('/main');
      } else {
        window.location.href = //토큰이 없다면 토큰을 token을 발급받고 main에서 localStorage에 넣게
          'http://localhost:8080/oauth2/authorization/google';
      }
    },
  },
};
</script>

<style scoped>
.whiteboard {
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 680px;
  height: 800px;
  margin: auto;
  position: relative;
  overflow: hidden;
  border: 2px solid brown;
  border-radius: 20%;
}

.sketchBookImg {
  background-image: url('../assets/image/sketchBookLogin.jpg');
  background-size: 250%;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  position: relative;
  left: 10px;
}

.loginBtn {
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 50px;
  border: 1px solid silver;
  border-radius: 25px;
  cursor: pointer;
  position: absolute;
  bottom: 60px;
  left: 25%;
  bottom: 15%;
  color: black;
  text-decoration: none;
}

.loginBtn:hover {
  transform: translateY(-2px);
  font-weight: bold;
}

.loginBtn img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
</style>
