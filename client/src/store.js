import Vue from 'vue';
import Vuex from 'vuex';
// eslint-disable-next-line import/no-cycle
import router from './router';

// eslint-disable-next-line import/no-cycle
import { defaultClient as apolloClient } from './main';
import { GET_CURRENT_USER, GET_POSTS, SINGIN_USER } from './queries';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    user: null,
    loading: false,
    error: null,
  },
  mutations: {
    setPosts: (state, payload) => {
      // eslint-disable-next-line no-param-reassign
      state.posts = payload;
    },
    setUser: (state, payload) => {
      // eslint-disable-next-line no-param-reassign
      state.user = payload;
    },
    setLoading: (state, payload) => {
      // eslint-disable-next-line no-param-reassign
      state.loading = payload;
    },
    setError: (state, payload) => {
      // eslint-disable-next-line no-param-reassign
      state.error = payload;
    },
    clearError: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.error = null;
    },
    clearUser: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.user = null;
    },
  },
  actions: {
    getCurrentUser: ({ commit }) => {
      commit('setLoading', true);
      apolloClient.query({
        query: GET_CURRENT_USER,
      })
        .then(({ data }) => {
          commit('setLoading', false);
          commit('setUser', data.getCurrentUser);
        })
        .catch((err) => {
          commit('setLoading', false);
          throw err;
        });
    },
    getPosts: ({ commit }) => {
      commit('setLoading', true);
      apolloClient.query({
        query: GET_POSTS,
      }).then(({ data }) => {
        commit('setPosts', data.getPosts);
        commit('setLoading', false);
      }).catch((err) => {
        commit('setLoading', false);
        throw err;
      });
    },
    signinUser: ({ commit }, payload) => {
      commit('setLoading', true);
      commit('clearError');
      localStorage.setItem('token', '');
      apolloClient.mutate({
        mutation: SINGIN_USER,
        variables: payload,
      }).then(({ data }) => {
        localStorage.setItem('token', data.signinUser.token);
        router.go();
        commit('setLoading', false);
      }).catch((err) => {
        commit('setError', err);
        commit('setLoading', false);
        throw err;
      });
    },
    signoutUser: async ({ commit }) => {
      commit('clearUser');
      localStorage.setItem('token', '');
      await apolloClient.resetStore();
      router.push('/');
    },
  },
  getters: {
    posts: state => state.posts,
    user: state => state.user,
    loading: state => state.loading,
    error: state => state.error,
  },
});
