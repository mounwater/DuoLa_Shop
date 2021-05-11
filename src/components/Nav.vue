<template>
  <ul class="nav">
    <router-link to="/" tag="li" :class="page == 'Home' ? 'active' : ''">
      <i class="fa fa-home" />
      <span>首页</span>
    </router-link>
    <router-link to="hot" tag="li" :class="page == 'Hot' ? 'active' : ''">
      <i class="fa fa-fire" />
      <span>热卖</span>
    </router-link>
    <router-link to="cart" tag="li" :class="page == 'Cart' ? 'active' : ''">
      <i class="fa fa-shopping-cart" />
      <span>购物车</span>
      <span class="dot" v-show="cartCount > 0">{{ cartCount }}</span>
    </router-link>
    <router-link to="user" tag="li" :class="page == 'User' ? 'active' : ''">
      <i class="fa fa-user" />
      <span>个人中心</span>
    </router-link>
  </ul>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'Nav',
  data() {
    return {
      page: 'home',
      count: 0,
    };
  },
  created() {
    this.updateAsync();
  },
  methods: {
    ...mapActions(['updateAsync']),
  },
  watch: {
    $route(v) {
      this.page = v.name;
    },
  },
  computed: {
    ...mapState(['cartCount']),
  },
};
</script>

<style scoped>
.nav li {
  position: relative;
}

.nav li .dot {
  top: -8px;
  left: 20px;
  position: absolute;
  /* padding: 0.3rem; */
  text-align: center;
  background-color: deeppink;
  color: white;
  font-size: 0.6rem;
  border-radius: 50%;
  width: 1.2rem;
  height: 1.2rem;
}
</style>
