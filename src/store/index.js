import Vue from 'vue';
import Vuex from 'vuex';
import { loadCarts } from '../services/carts';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartCount: 0,
  },
  mutations: {
    upDate(state, payload) {
      state.cartCount = payload.newCount;
    },
  },
  actions: {
    async updateAsync(context, payload) {
      const res = await loadCarts();
      // console.log(res);
      payload = { newCount: res.length };
      context.commit('upDate', payload);
    },
  },
  modules: {},
});
