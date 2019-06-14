import Vue from 'vue';
import Vuex from 'vuex';

// eslint-disable-next-line import/no-cycle
import { defaultClient as apolloClient } from './main';
import { GET_POSTS, SINGIN_USER } from './queries';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    loading: false,
  },
  mutations: {
    setPosts: (state, payload) => {
      // eslint-disable-next-line no-param-reassign
      state.posts = payload;
    },
    setLoading: (state, payload) => {
      // eslint-disable-next-line no-param-reassign
      state.loading = payload;
    },
  },
  actions: {
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
      apolloClient.mutate({
        mutation: SINGIN_USER,
        variables: payload,
      }).then(({ data }) => {
        localStorage.setItem('token', data.signinUser.token);
        console.log(commit);
      }).catch((err) => {
        console.log(err);
      });
    },
  },
  getters: {
    posts: state => state.posts,
    loading: state => state.loading,
  },
});
