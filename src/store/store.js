import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        currentIndex: 0,
        itemsPerPage: 3,
        isUserGallery: false,
        images: [
        ]
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
        }
    },
    mutations: {
        SET_INDEX(state, index) {
            state.currentIndex = index;
        },
        TOGGLE_LIKE(state, image) {
            image.liked = !image.liked;
            if (image.liked) {
                image.likes++;
            } else {
                image.likes--;
            }
        }
    },
    actions: {
        scrollLeft({ commit, state }) {
            if (state.currentIndex > 0) {
                commit('SET_INDEX', state.currentIndex - state.itemsPerPage);
            }
        },
        scrollRight({ commit, state }) {
            if (state.currentIndex + state.itemsPerPage < state.images.length) {
                commit('SET_INDEX', state.currentIndex + state.itemsPerPage);
            }
        },
        imageLike({ commit }, image) {
            commit('TOGGLE_LIKE', image);
        }
    }
});