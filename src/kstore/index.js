import Vue from 'vue';
import Vuex from './kvuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    counter: 0,
  },
  mutations: {
    add(state, payload) {
      state.counter += payload;
    },
  },
  actions: {
    addAsync({ commit }, payload) {
      setTimeout(() => {
        commit('add', payload);
      }, 1000);
    },
  },
});
