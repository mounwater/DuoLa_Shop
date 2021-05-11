<template>
  <div id="app">
    <div class="top">
      <div class="backTo" v-show="isShow">
        <span v-on:click="back">返回</span>
      </div>
      <img width="36" src="/img/logo.5e930798.jpg" alt="" />
      <router-link :to="{ name: 'Home' }"><span>哆啦商城</span></router-link>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <Nav v-show="isShowNav" />
  </div>
</template>

<script>
import Nav from './components/Nav';
export default {
  name: 'App',
  data() {
    return {
      isShowNav: true,
      isShow: true,
    };
  },
  watch: {
    $route(v) {
      if (v.meta.hideNav) {
        this.isShowNav = false;
      } else {
        this.isShowNav = true;
      }
      if (v.meta.hideBackto) {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    },
  },
  components: {
    Nav,
  },
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    },
  },
};
</script>

<style scoped>
h1 {
  color: red;
}
</style>
