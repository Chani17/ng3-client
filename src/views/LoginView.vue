<template>
  <div class="whiteboard">
    <!--하얀 배경-->
    <div class="sketchBookImg">
      <!--스케치북-->
      <div class="loginBtn" @click="login">
        <img src="@/assets/image/google.png" />
        <span>구글 계정으로 시작하기</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async login() {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        // 토큰이 있다면 바로 main으로 가게
        this.$router.push('/main');
      } else {
        // OAuth2 인증 요청
        window.location.href =
          'http://localhost:8080/oauth2/authorization/google';
      }
    },
    async handleOAuth2Redirect() {
      const code = this.getQueryParam('code');
      if (code) {
        try {
          console.log('코드 발견:', code);
          const response = await fetch(
            `http://localhost:8080/login/success?code=${code}`
          );
          const result = await response.json(); // JSON 응답을 받음
          console.log('응답:', result);

          const jwtToken = result.token; // JSON에서 토큰 추출
          console.log('JWT:', jwtToken);

          // JWT를 localStorage에 저장
          localStorage.setItem('token', jwtToken);

          // 메인 페이지로 리디렉션
          console.log('메인 페이지로 리디렉션 시작');
          this.$router.push('/main');
        } catch (error) {
          console.error('JWT 발급 실패:', error);
        }
      }
    },
    getQueryParam(name) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(name);
    },
  },
  mounted() {
    // 컴포넌트가 마운트될 때 OAuth2 리디렉션 처리
    this.handleOAuth2Redirect();
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
  background-image: url('@/assets/image/sketchBookLogin.jpg');
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
