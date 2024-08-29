import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    currentIndex: 0,
    itemsPerPage: 3,
    isUserGallery: false,
    images: [],
    roomList: [],
    filteredRoomList: [], // 필터링된 방 목록
    totalItemCount: 0,
    totalPageCount: 0,
    page: 0,
    showCreateRoomModal: false, // 방 생성 모달 상태
    showPasswordCheckModal: false, // 비밀번호 확인 모달 상태
    searchType: "title",
    searchKeyword: "",
    nowRoom: "",
    // phj
    loginUserId: "", //현재 로그인된 유저 ID
    likeStatuses: {},
    userSearch: "",
    users: [],
    followIds: [],
    following: [],
    pollingIntervalId: null, // 타이머 ID를 저장할 상태 추가
    roomId: '',
  },
  getters: {
    sortedItems(state) {
      return state.images.slice().sort((a, b) => b.likes - a.likes);
    },
    currentItems(state, getters) {
      if (!Array.isArray(state.images)) {
        return [];
      }
      const start = state.currentIndex;
      const end = start + state.itemsPerPage;
      return getters.sortedItems.slice(start, end);
    },
    isLiked: (state) => (imageId) => {
      return state.likeStatuses[imageId] || false;
    },
    getRooms(state) {
      let page = state.page;
      if (page >= state.totalPageCount) {
        page = state.totalPageCount - 1; // 페이지 번호가 총 페이지 수를 넘지 않도록 보정
      }
      const offset = page * 6;
      return state.filteredRoomList.slice(offset, offset + 6);
    },
    getRoomId(state) {
      return state.roomId;
    },
    getPage(state) {
      return state.page;
    },
    getTotalPageCount(state) {
      return state.totalPageCount;
    },
    getShowCreateRoomModal(state) {
      return state.showCreateRoomModal;
    },
    getShowPasswordCheckModal(state) {
      return state.showPasswordCheckModal;
    },
    getSearchType(state) {
      return state.searchType;
    },
    getSearchKeyword(state) {
      return state.searchKeyword;
    },
    getNowRoom(state) {
      return state.nowRoom;
    },
    // phj
    getLoginUserId(state) {
      //이걸로 이제 현재 로그인된 유저 아이디를 불러올 수 있음
      return state.loginUserId;
    },
    // 팔로우
    getFilteredUsers(state) {
      if (!Array.isArray(state.following)) {
        return [];
      }
      if (state.userSearch.trim() === '') {
        return state.following.sort((a, b) => b.totalLikes - a.totalLikes);
      } else {
        return state.users.filter(user => user.nickname === state.userSearch);
      }
    },
    getFollowing: (state) => (userId) => {
      return state.followIds.includes(userId);
    },
  },
  mutations: {
    SET_INDEX(state, index) {
      state.currentIndex = index;
    },
    setLikeStatus(state, { imageId, liked }) {
      state.likeStatuses = {
        ...state.likeStatuses,
        [imageId]: liked,
      };
    },
    updateLikeCount(state, { imageId, likeCount }) {
      const image = state.images.find(img => img.id === imageId);
      if (image) {
        image.likeCount = likeCount;
      }
    },
    setRoom(state, roomList) {
      state.roomList = roomList;
    },
    setRoomId(state, roomId) {
      state.roomId = roomId;
    },
    setFilteredRoomList(state, filteredRoomList) {
      state.filteredRoomList = filteredRoomList;
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
    setShowCreateRoomModal(state, showCreateRoomModal) {
      state.showCreateRoomModal = showCreateRoomModal;
    },
    setShowPasswordCheckModal(state, showPasswordCheckModal) {
      state.showPasswordCheckModal = showPasswordCheckModal;
    },
    setSearchType(state, searchType) {
      state.searchType = searchType;
    },
    setSearchKeyword(state, searchKeyword) {
      state.searchKeyword = searchKeyword;
    },
    setNowRoom(state, roomId) {
      state.nowRoom = roomId;
    },
    // phj
    setLoginUserId(state, loginUserId) {
      state.loginUserId = loginUserId;
    },
    setImages(state, images) {
      state.images = images;
    },
    setPollingInterval(state, intervalId) {
      state.pollingIntervalId = intervalId; // pollingIntervalId를 저장
    },
    setFollowUsers(state, users) {
      if (Array.isArray(users)) {
        state.following = users;
        state.followIds = users.map(user => user.email);
      } else {
        state.following = [];
        state.followIds = [];
      }
    },
    // 팔로우
    setUserSearch(state, search) {
      state.userSearch = search;
    },
    setUsers(state, users) {
      state.users = users;
    },
    setFollow(state, userId) {
      if (!state.followIds.includes(userId)) {
        state.followIds.push(userId);
      }
    },
    setUnfollow(state, userId) {
      state.followIds = state.followIds.filter(id => id !== userId);
    },
  },
  actions: {
    scrollLeft({ commit, state }) {
      if (state.currentIndex > 0) {
        commit("SET_INDEX", state.currentIndex - state.itemsPerPage);
      }
    },
    async fetchRoom({ commit, dispatch }) {
      try {
        const response = await axios.get("http://nggg.com:8080/room");
        commit("setRoom", response.data);
        dispatch("filterRooms"); // 데이터를 가져온 후 필터링을 초기화
        console.log("fetchRoom 실행")
      } catch (error) {
        console.error("에러 발생", error);
      }
    },
    scrollRight({ commit, state }) {
      if (state.currentIndex + state.itemsPerPage < state.images.length) {
        commit("SET_INDEX", state.currentIndex + state.itemsPerPage);
      }
    },
    filterRooms({ commit, state }) {
      let filteredRoomList = state.roomList;
      if (state.searchKeyword !== "") {
        if (state.searchType === "title") {
          filteredRoomList = filteredRoomList.filter((room) =>
            room.title.includes(state.searchKeyword)
          );
        } else if (state.searchType === "nickname") {
          filteredRoomList = filteredRoomList.filter((room) =>
            room.users.some((user) => user.nickname.includes(state.searchKeyword))
          );
        }
      }
      commit("setFilteredRoomList", filteredRoomList);

      // 총 페이지 수 계산 (최소 1페이지는 있어야 함)
      const totalPageCount = Math.ceil(filteredRoomList.length / 6);
      commit("setTotalPageCount", totalPageCount);

      // 현재 페이지 보정 (총 페이지 수를 넘지 않도록)
      if (state.page >= totalPageCount && totalPageCount > 0) {
        commit("setPage", totalPageCount - 1);
      } else if (totalPageCount === 0) {
        // 검색 결과가 없는 경우 페이지를 0으로 설정
        commit("setPage", 0);
      }
    },
    setSearchKeyword({ commit, dispatch }, searchKeyword) {
      commit("setSearchKeyword", searchKeyword);
      dispatch("filterRooms"); // 검색어 변경 시 필터링 로직 실행
    },
    setSearchType({ commit, dispatch }, searchType) {
      commit("setSearchType", searchType);
      dispatch("filterRooms"); // 검색 타입 변경 시 필터링 로직 실행
    },
    increasePage({ commit }) {
      const totalPageCount = this.state.totalPageCount;
      let page = this.state.page;
      page++;
      if (page > totalPageCount) {
        page = totalPageCount;
      }
      commit("setPage", page);
    },
    decreasePage({ commit }) {
      let page = this.state.page;
      page--;
      if (page < 0) {
        page = 0;
      }
      commit("setPage", page);
    },
    showCreateRoomModal({ commit }) {
      commit("setShowCreateRoomModal", true);
    },
    hideCreateRoomModal({ commit }) {
      commit("setShowCreateRoomModal", false);
    },
    showPasswordCheckModal({ commit }) {
      commit("setShowPasswordCheckModal", true);
    },
    hidePasswordCheckModal({ commit }) {
      commit("setShowPasswordCheckModal", false);
    },
    setNowRoom({ commit }, roomId) {
      commit("setNowRoom", roomId);
    },
    startPolling({ dispatch, commit, state }) {
      if (!state.pollingIntervalId) {
        const intervalId = setInterval(() => {
          dispatch("fetchRoom");
        }, 5000);
        commit("setPollingInterval", intervalId); // Interval ID를 저장
      }
    },
    stopPolling({ commit, state }) {
      if (state.pollingIntervalId) {
        clearInterval(state.pollingIntervalId); // Interval 중지
        commit("setPollingInterval", null); // Interval ID 초기화
      }
    },
    async fetchFollowing({ commit, getters }) {
      try {
        const loginEmail = getters.getLoginUserId;
        const response = await axios.get('http://nggg.com:8080/following', { params: { userEmail: loginEmail } });
        if (Array.isArray(response.data)) {
          commit('setFollowUsers', response.data);
        } else {
          commit('setFollowUsers', []);
        }
      } catch (error) {
        console.error("Error fetching followed users", error);
        commit('setFollowUsers', []);
      }
    },
    async followUser({ commit, getters, dispatch }, followEmail) {
      try {
        const loginEmail = getters.getLoginUserId;
        await axios.post('http://nggg.com:8080/followuser', { userEmail: loginEmail, followingEmail: followEmail });
        commit('setFollow', followEmail);
        await dispatch('fetchFollowing');
      } catch (error) {
        console.error("Error add follow:", error);
      }
    },
    async unfollowUser({ commit, getters, dispatch }, followEmail) {
      try {
        const loginEmail = getters.getLoginUserId;
        await axios.post('http://nggg.com:8080/unfollowuser', { userEmail: loginEmail, followingEmail: followEmail });
        commit('setUnfollow', followEmail);
        await dispatch('fetchFollowing');
      } catch (error) {
        console.error("Error remove follow", error);
      }
    },
    // 팔로우
    async searchUsers({ commit, dispatch }, search) {
      commit('setUserSearch', search);
      try {
        if (search.trim === '') {
          await dispatch('fetchFollowing');
        } else {
          const response = await axios.get('http://nggg.com:8080/usersearch', { params: { nickname: search } });
          commit('setUsers', response.data);
        }
      } catch (error) {
        console.error("Error searching users", error);
      }
    },
  }
});
