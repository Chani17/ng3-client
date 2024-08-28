<template>
  <div class="base_container">
    {{ loginUserId }}
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

export default {
  mounted() {
    this.checkToken();
    //this.loginUserId
  },
  computed: {
    ...mapGetters({
      loginUserId: 'getLoginUserId',
    }),
  },
  methods: {
    ...mapMutations({
      setLoginUserId: 'setLoginUserId',
    }),

    async checkToken() {
      // URL에 토큰이 있는지 확인
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (token) {
        // url뒤에 토큰이 있으면 로컬 스토리지에 저장하고 URL에서 토큰 제거
        await this.storeToken(token);
        this.loadLoginUserId(token);

        // URL에서 토큰 제거
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      } else {
        // 로컬 스토리지에 토큰이 있는지 확인
        const storedToken = localStorage.getItem('token');

        if (storedToken) {
          //토큰이 있다면 유저 아이디 뽑아오기
          this.loadLoginUserId(storedToken);
        } else {
          // 토큰이 없으면 로그인 페이지로 리다이렉트
          this.$router.push('/login');
        }
      }
    },

    async storeToken(token) {
      if (token) {
        // 토큰을 로컬 스토리지에 저장
        localStorage.setItem('token', token);
        // URL에서 토큰을 제거
        await window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      }
    },

    parseJwt(token) {
      //토큰을 파싱하는 함수
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );

      return JSON.parse(jsonPayload);
    },

    loadLoginUserId(token) {
      //[박혁진]localStorage에 저장된 토큰을 이용해 로그인 유저정보 store.js에 세팅
      const decodedPayload = this.parseJwt(token);
      const email = decodedPayload ? decodedPayload.sub : null;

      if (email) {
        console.log('Extracted Email:', email);
        this.setLoginUserId(email);
      } else {
        console.error('Email not found in token payload');
      }
    },
  },
};
</script>

<style></style>
