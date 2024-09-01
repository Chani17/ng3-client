<!-- 이하린 : 메인 페이지 컴포넌트 작업 -->
<!-- 박혁진 : 메인 페이지 내 로그인 유저 정보 세팅 작업-->

<template>
  <div class="base_container">
    <HeaderComponent></HeaderComponent>
    <MiddleComponent></MiddleComponent>
    <RoomList></RoomList>
    <CreateRoomModal v-if="getShowCreateRoomModal"></CreateRoomModal>
  </div>
</template>

<script>
import '@/assets/css/base_container.css'; //스케치북 모양 레이아웃 적용 위한 css
import { mapActions, mapGetters, mapMutations } from 'vuex';

import CreateRoomModal from '@/components/main/CreateRoomModal.vue';
import HeaderComponent from '@/components/main/HeaderComponent.vue';
import MiddleComponent from '@/components/main/MiddleComponent.vue';
import RoomList from '@/components/main/RoomList.vue';

export default {
  created() {
    // 메인 페이지 컴포넌트 생성과 동시에 서버로 방 목록을 요청하는 함수를 실행
    this.$store.dispatch('startPolling');
  },
  mounted() {
    this.checkToken();
  },
  beforeDestroy() {
    // 컴포넌트가 언마운트될 때 polling을 중지
    this.$store.dispatch('stopPolling');
  },
  computed: {
    ...mapGetters({
      loginUserId: 'getLoginUserId',
      getRooms: 'getRooms',
      getShowCreateRoomModal: 'getShowCreateRoomModal',
    }),
  },
  methods: {
    ...mapMutations({
      setLoginUserId: 'setLoginUserId',
    }),
    ...mapActions({
      createRoom: 'createRoom',
      showCreateRoomModal: 'showCreateRoomModal',
      hideCreateRoomModal: 'hideCreateRoomModal',
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
      const email = decodedPayload ? decodedPayload.email : null;

      if (email) {
        console.log('Extracted Email:', email);
        this.setLoginUserId(email);
      } else {
        console.error('Email not found in token payload');
      }
    },
  },
  components: {
    HeaderComponent,
    MiddleComponent,
    RoomList,
    CreateRoomModal,
  },
};
</script>

<style scoped></style>
