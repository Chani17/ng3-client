import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    userSearch: "",
    users: [
      { id: 1, nickname: '유저1', profilePicture: null, totalLikes: 85 },
      { id: 2, nickname: '유저2', profilePicture: null, totalLikes: 23 },
      { id: 3, nickname: '유저3', profilePicture: null, totalLikes: 340 },
      { id: 4, nickname: '유저4', profilePicture: null, totalLikes: 210 },
      { id: 5, nickname: '유저5', profilePicture: null, totalLikes: 10 },
      { id: 6, nickname: '유저6', profilePicture: null, totalLikes: 1100 },
      { id: 7, nickname: '유저7', profilePicture: null, totalLikes: 21 },
      { id: 8, nickname: '유저8', profilePicture: null, totalLikes: 95 },
      { id: 9, nickname: '네가그린기린그림', profilePicture: null, totalLikes: 1200 },
    ],
    followIds: [1, 3, 6, 9]
  },
  getters: {
    filteredUsers: (state) => {
      if (state.userSearch.trim() === '') {
        return state.users.filter(user => state.followIds.includes(user.id))
            .sort((a, b) => b.totalLikes - a.totalLikes);
      } else {
        return state.users.filter(user => user.nickname === state.userSearch);
      }
    },
    isFollowed: (state) => (userId) => {
      return state.followIds.includes(userId);
    }
  },
  mutations: {
    setUserSearch(state, search) {
      state.userSearch = search;
    },
    addFollow(state, userId) {
      if (!state.followIds.includes(userId)) {
        state.followIds.push(userId);
      }
    },
    removeFollow(state, userId) {
      state.followIds = state.followIds.filter(id => id !== userId);
    }
  },
  actions: {
    searchUsers({ commit }, search) {
      commit('setUserSearch', search);
    },
    addFollow({ commit }, userId) {
      commit('addFollow', userId);
    },
    removeFollow({ commit }, userId) {
      commit('removeFollow', userId);
    }
  }
});