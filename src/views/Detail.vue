<template>
  <!-- 热卖商品详情 -->
  <div class="detail">
    <h1>{{ product.name }}</h1>
    <div class="content" v-html="product.content"></div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Detail',
  data() {
    return {
      product: {},
    };
  },
  async created() {
    console.log(this.$route);
    const res = await axios
      .get(`http://localhost:3009/api/v1/products/${this.$route.params.id}`)
      .then((res) => res.data);
    this.product = res;
    // 此处可能需要加载数据
  },
};
</script>

<style scoped>
.detail {
  color: skyblue;
}
</style>
