<template>
  <!-- 购物车 -->

  <div class="about">
    <van-cell-group>
      <van-cell v-for="(i, index) in carts" :key="i._id">
        <van-checkbox v-model="i.checked"></van-checkbox>
        <van-card
          :price="i.product.price"
          :title="i.product.name"
          :thumb="i.product.coverImg"
        >
          <template #footer>
            <span class="singlePrice"
              >合计:{{ i.product.price * i.quantity }}</span
            >
            <div class="th">
              <van-button
                size="small"
                @click="changeCartData(i, -1, index)"
                icon="minus"
                type="danger"
              ></van-button>
              <span class="num">{{ i.quantity }}</span>
              <van-button
                @click="changeCartData(i, 1, index)"
                size="small"
                icon="plus"
                type="danger"
              ></van-button>
            </div>
          </template>
        </van-card>
      </van-cell>
    </van-cell-group>
    <van-submit-bar
      :price="sumprice * 100"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checkedAll">全选</van-checkbox>
      <template #tip>
        你的收货地址不支持同城送,
        <span @click="onClickEditAddress" style="color:blue;">修改地址</span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import { loadCarts, addToCart } from "../services/carts";
export default {
  data() {
    return {
      carts: [],
    };
  },
  async created() {
    this.loadData();
  },
  methods: {
    async changeCartData(p, q, index) {
      const endCount = p.quantity + q;
      if (endCount > 0) {
        await addToCart(p.product._id, q);
        this.carts[index].quantity += q;
      }
    },
    async loadData() {
      const res = await loadCarts();
      this.carts = res.map((item) => ({ ...item, checked: false }));
      console.log(this.carts);
    },
    onSubmit() {},
    onClickEditAddress() {},
  },
  computed: {
    checkedAll: {
      set(v) {
        this.carts.forEach((item) => (item.checked = v));
      },
      get() {
        return this.carts.every((item) => item.checked);
      },
    },
    sumprice() {
      return this.carts
        .filter((item) => item.checked)
        .reduce((pre, cur) => pre + cur.product.price * cur.quantity, 0);
    },
  },
};
</script>

<style scoped>
.van-card__footer {
  overflow: hidden;
}
.th {
  display: flex;
  float: right;
}
.singlePrice {
  float: left;
  line-height: 32px;
  font-size: 15px;
}
.num {
  margin-left: 3px;
  line-height: 32px;
}
</style>
