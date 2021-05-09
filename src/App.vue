<template>
  <div id="app">
    <div class="top">
      <img width="36" src="/img/logo.5e930798.jpg" alt="" /><span
        >哆啦商城-首页</span
      >
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
    };
  },
  watch: {
    $route(v) {
      if (v.meta.hideNav) {
        this.isShowNav = false;
      } else {
        this.isShowNav = true;
      }
    },
  },
  components: {
    Nav,
  },
};
</script>

<style scoped>
h1 {
  color: red;
}
</style>
