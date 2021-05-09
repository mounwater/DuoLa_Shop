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
      <span class="dot" v-show="count > 0">{{ count }}</span>
    </router-link>
    <router-link to="user" tag="li" :class="page == 'User' ? 'active' : ''">
      <i class="fa fa-user" />
      <span>个人中心</span>
    </router-link>
  </ul>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      page: 'home',
      count: 0,
    };
  },
  created() {
    // 监听
    // this.eventBus.$on('buyed', this.buyHandle); //监听buyed事件
    //每次加载导航栏时都会判断一下，是否为登录状态，再去查询用户的购物车商品数量
    if (sessionStorage.getItem('token')) {
      axios
        .get('http://localhost:3009/api/v1/shop_carts', {
          headers: {
            authorization: 'bearer ' + sessionStorage.getItem('token'),
          },
        })
        .then((res) => {
          this.count = res.data.length;
        });
    }
  },
  methods: {
    buyHandle(v) {
      this.count = v;
    },
  },
  watch: {
    $route(v) {
      this.page = v.name;
    },
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
