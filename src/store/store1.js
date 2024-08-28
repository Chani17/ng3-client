import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loginUserId: '', //현재 로그인된 유저 ID
  },
  getters: {
    getLoginUserId(state) {
      //이걸로 이제 현재 로그인된 유저 아이디를 불러올 수 있음
      return state.loginUserId;
    },
  },
  mutations: {
    setLoginUserId(state, loginUserId) {
      state.loginUserId = loginUserId;
    },
  },
});
