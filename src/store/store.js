import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';


Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    //1. state 는 data()와 같은것
    roomList: [],
    totalItemCount: 0,
    totalPageCount: 0,
    page: 0,
  },
  getters: {
    // getRooms: (state) => {
    //   return (page = 0) => {
    //     if (page > state.totalPageCount) {
    //       page = state.totalPageCount;
    //     }
    //     const offset = page * 6;
    //     return state.roomList.slice(offset, offset + 6);
    //   };
    // }
    getRooms(state) {
      let page = state.page;
      if (page > state.totalPageCount) {
        page = state.totalPageCount;
      }
      console.log(page, state.totalPageCount);
  
      const offset = page * 6;
      return state.roomList.slice(offset, offset + 6);
    },
    getPage(state) {
      return state.page;
    },
    getTotalPageCount(state) {
      return state.totalPageCount;
    },
  },
  mutations: {
    //3. mutations는 method과 같은것. 주로 state에 있는 값에 변화를 주기 위해 사용한다.
    setRoom(state, roomList) {
      state.roomList = roomList;
    },
    setTotalItemCount(state, totalItemCount) {
      state.totalItemCount = totalItemCount;
    },
    setTotalPageCount(state, totalPageCount) {
      state.totalPageCount = totalPageCount;
    },
    setPage(state, page) {
      state.page = page;
    }
  },
  actions: {
    // 1. fetchroom 요청하는 함수
    async fetchRoom({ commit }) {
      try {
        // API 요청 후 roomList 받아서 배열로 가공
        const response = await axios.get('/mock-data.json'); // fetchRoom() API endpoint
        const roomList = response.data; // API response data
        commit('setTotalItemCount', roomList.length);

        let calculatedPage = roomList.length % 6;

        if (calculatedPage == 0) {
          commit('setTotalPageCount', calculatedPage);
        } else {
          commit('setTotalPageCount', calculatedPage + 1);
        }

        // console.log(roomList);
        commit('setRoom', roomList);
      } catch (error) {
        console.error('fetchRoom error:', error);
      }
    },
    // 2. fetchroom을 주기적으로 날리는 함수
    // 메인페이지 접속했을 때 실행
    startPolling({ dispatch }) {
      setInterval(() => {
        dispatch('fetchRoom');
      }, 1000);
    },
    increasePage({ commit }) {
      const totalPageCount = this.state.totalPageCount;
      let page = this.state.page;
      page++;
      if (page > totalPageCount) {
        page = totalPageCount;
      }
      commit('setPage', page);
    },
    decreasePage({ commit }) {
      let page = this.state.page;
      page--;
      if (page < 0) {
        page = 0;
      }
      commit('setPage', page);
    }
  },
});
