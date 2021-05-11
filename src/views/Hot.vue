<template>
  <div class="about">
    <van-card
      num="2"
      price="2.00"
      desc="描述信息"
      title="商品标题"
      thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
    />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-card
        v-for="i in list"
        :key="i._id"
        :price="i.price"
        :title="i.name"
        :thumb="i.coverImg"
        :thumb-link="'/#/detail?id=' + i._id"
      >
        <template #footer>
          <van-button size="small" icon="cart-o" type="danger" @click="addCartHandle(i._id)"></van-button>
          <!-- <van-button size="mini">按钮</van-button> -->
        </template>
      </van-card>
    </van-list>
  </div>
</template>
<script>
import { loadProducts } from '../services/products';
import { addToCart } from '../services/carts';
import { mapActions } from 'vuex';
import { Toast } from 'vant';
export default {
  created() {
    this.loadData();
  },
  data() {
    return {
      list: [],
      page: 1,
      loading: false, // 是否在加载中
      finished: false, // 是否加载完成
    };
  },
  methods: {
    async loadData() {
      const res = await loadProducts(this.page, this.$route.params.id);
      this.list = [...this.list, ...res.products];
      this.page++;
      this.loading = false; // 设置加载完成
      if (this.page > res.pages) this.finished = true; // 如果加载到最后一页设置结束
    },
    // 滚动到底部的时候执行触发
    onLoad() {
      console.log('到底了');
      this.loading = true; // 设置加载中为true
      this.loadData(); // 开始请求数据
    },
    async addCartHandle(id) {
      // console.log(id);
      const res = await addToCart(id, 1);
      // console.log(res);
      if (res.code === 'success') {
        this.updateAsync();
        Toast.success('添加购物车成功！');
      } else {
        alert('添加失败！');
      }
    },
    ...mapActions(['updateAsync']),
  },
  mounted: {

  }
};
</script>
<style scoped>
.van-card__footer {
  text-align: center;
  position: absolute;
  top: 62%;
  right: 6%;
}
</style>
