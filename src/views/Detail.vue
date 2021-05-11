<template>
  <!-- 热卖商品详情 -->
  <div class="detailContent">
    <div class="detail">
      <h1>{{ product.name }}</h1>
      <div class="content" v-html="product.content"></div>
    </div>
    <div class="do">
      <div class="countDo">
        <span @click="count > 1 ? count-- : 1">-</span
        ><input type="text" v-model="count" /><span
          @click="count > 0 ? count++ : 0"
          >+</span
        >
      </div>
      <van-button type="danger" @click="addCart">加入购物车</van-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { addToCart } from '../services/carts';
import { mapActions } from 'vuex';
export default {
  name: 'Detail',
  data() {
    return {
      count: 1,
      product: {},
    };
  },
  async created() {
    console.log(this.$route);
    const res = await axios
      .get(
        `http://localhost:3009/api/v1/products/${this.$route.params.id ||
          this.$route.query.id}`
      )
      .then((res) => res.data);
    this.product = res;
    // 此处可能需要加载数据
  },
  methods: {
    async addCart() {
      const res = await addToCart(
        this.$route.params.id || this.$route.query.id,
        this.count
      );
      // console.log(res);
      if (res.code === 'success') {
        this.updateAsync();
        this.$router.push({
          name: 'Cart',
        });
      } else {
        alert('添加失败！');
      }
    },
    ...mapActions(['updateAsync']),
  },
};
</script>

<style scoped>
.detail {
  color: skyblue;
  flex: 1;
  overflow-y: auto;
}
.detailContent {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.do {
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
input {
  width: 6rem;
  text-align: center;
}
.countDo {
  width: 11rem;
  display: flex;
  justify-content: space-between;
  margin-left: 1rem;
}
.countDo span {
  display: block;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  color: white;
  background: orange;
  font-size: 2rem;
  line-height: 2rem;
}
.van-button--normal {
  border-radius: 22px;
  padding: 0px 44px;
  font-size: 14px;
  height: 2.5rem;
}
</style>
