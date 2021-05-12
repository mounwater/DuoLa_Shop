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
      if (sessionStorage.getItem('token')) {
        const res = await loadCarts();
        // console.log(res);
        let sum = 0;
        res.forEach((item) => {
          sum += item.quantity * 1;
        });
        payload = { newCount: sum };
        context.commit('upDate', payload);
      } else {
        payload = { newCount: 0 };
        context.commit('upDate', payload);
      }
    },
  },
  modules: {},
});
