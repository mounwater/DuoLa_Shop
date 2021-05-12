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
<<<<<<< HEAD
      const res = await loadCarts();
      // console.log(res);
      payload = { newCount: res.length };
      context.commit('upDate', payload);
=======
      if (sessionStorage.getItem('token')) {
        const res = await loadCarts();
        // console.log(res);
        payload = { newCount: res.length };
        context.commit('upDate', payload);
      } else {
        payload = { newCount: 0 };
        context.commit('upDate', payload);
      }
>>>>>>> c429ea0cf8f3ebcb7bfadaeffc64a7a2104d52da
    },
  },
  modules: {},
});
