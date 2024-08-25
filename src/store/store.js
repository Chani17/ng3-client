import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    roomList: [],
    totalItemCount: 0,
    totalPageCount: 0,
    page: 0,
    showModal: false,
    searchType: 'title',
    searchKeyword: '',
  },
  getters: {
    getRooms(state) {
      let page = state.page;
      if (page >= state.totalPageCount) {
        page = state.totalPageCount - 1;  // 페이지 번호가 총 페이지 수를 넘지 않도록 보정
      }

      const offset = page * 6;
      return state.roomList.slice(offset, offset + 6);
    },
    getPage(state) {
      return state.page;
    },
    getTotalPageCount(state) {
      return state.totalPageCount;
    },
    getShowModal(state) {
      return state.showModal;
    },
    getSearchType(state) {
      return state.searchType;
    },
    getSearchKeyword(state) {
      return state.searchKeyword;
    }
  },
  mutations: {
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
    },
    setShowModal(state, showModal) {
      state.showModal = showModal;
    },
    setSearchType(state, searchType) {
      state.searchType = searchType;
    },
    setSearchKeyword(state, searchKeyword) {
      state.searchKeyword = searchKeyword;
    },
  },
  actions: {
    async fetchRoom({ commit, state }) {
      try {
        // API 요청 후 roomList 받아서 배열로 가공
        const response = await axios.get('/mock-data.json');
        let roomList = response.data;

        let filteredRooms = [];
        if (state.searchKeyword === '') {
          // 검색어가 비어 있으면 전체 방 목록 사용
          filteredRooms = roomList;
        } else {
          if (state.searchType === "title") {
            filteredRooms = roomList.filter((room) =>
              room.title.includes(state.searchKeyword)
            );
          } else if (state.searchType === "nickname") {
            filteredRooms = roomList.filter((room) =>
              room.users.some((user) =>
                user.nickname.includes(state.searchKeyword)
              )
            );
          }
        }

        commit('setRoom', filteredRooms);
        commit('setTotalItemCount', filteredRooms.length);

        // 총 페이지 수 계산 (최소 1페이지는 있어야 함)
        const totalPageCount = Math.ceil(filteredRooms.length / 6);
        commit('setTotalPageCount', totalPageCount);

        // 현재 페이지 보정 (총 페이지 수를 넘지 않도록)
        if (state.page >= totalPageCount && totalPageCount > 0) {
          commit('setPage', totalPageCount - 1);
        } else if (totalPageCount === 0) {
          // 검색 결과가 없는 경우 페이지를 0으로 설정
          commit('setPage', 0);
        }

      } catch (error) {
        console.error('에러 발생', error);
      }
    },
    setSearchType({ commit, dispatch }, searchType) {
      commit('setSearchType', searchType);
      dispatch('fetchRoom'); // searchType이 변경될 때마다 데이터 패칭
    },
    setSearchKeyword({ commit, dispatch }, searchKeyword) {
      commit('setSearchKeyword', searchKeyword);
      dispatch('fetchRoom'); // searchKeyword가 변경될 때마다 데이터 패칭
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
    },
    showModal({ commit }) {
      commit('setShowModal', true);
    },
    hideModal({ commit }) {
      commit('setShowModal', false);
    },
  },
});
