<template>
  <!-- 购物车 -->

  <div class="about">
    <van-cell-group style="padding-bottom:20px;">
      <van-cell v-for="(i, index) in carts" :key="i._id">
        <van-checkbox v-model="i.checked"></van-checkbox>
        <van-card
          :price="i.product.price"
          :title="i.product.name"
          :thumb="i.product.coverImg"
        >
          <template> </template>
          <template #footer>
            <span class="singlePrice"
              >￥{{ i.product.price * i.quantity }}</span
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
              <van-button type="danger" size="small" @click="del(i._id, index)">
                删除
              </van-button>
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
      <van-checkbox v-model="checkedAll" class="">全选</van-checkbox>
      <template #tip>
        你的收货地址不支持同城送,
        <span @click="onClickEditAddress" style="color:blue;">修改地址</span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import { loadCarts, addToCart } from '../services/carts';
import { delCarts } from '../services/carts';
import { tjdd } from '../services/carts';
import { cxaddress } from '../services/carts';
export default {
  data() {
    return {
      carts: [],
      location: [],
      carted: [],
    };
  },
  async created() {
    this.loadData();
    this.address();
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
    async address() {
      const res = await cxaddress();
      this.location = res.addresses.filter((item) => item.isDefault == true);
      // console.log(res.addresses.filter((item) => item.isDefault == true));
      // this.location.forEach((item) => console.log(item.address));
    },
    del(id, index) {
      delCarts(id);
      this.carts[index].checked = false;
      this.carts.splice(index, 1);
      if (this.carts.length == 0) {
        this.$refs.dom.checked = false;
      }
      console.log(this.$refs.dom.length);
    },
    onSubmit() {
      this.carts
        .filter((item) => item.checked)
        .forEach((item) =>
          this.carted.push({
            quantity: item.quantity,
            product: item.product._id,
            price: item.product.price,
          })
        );

      console.log(this.carted);
      /* this.location.forEach((item) =>
        tjdd(item.receiver, item.regions, item.address)
      ); */
      tjdd(
        this.location[0].receiver,
        this.location[0].regions,
        this.location[0].address,
        this.carted
      ).then((res) => console.log(res.code));
    },
    onClickEditAddress() {
      this.$router.push('Address');
    },
  },
  computed: {
    checkedAll: {
      set(v) {
        this.carts.forEach((item) => (item.checked = v));
      },
      get() {
        if (this.carts.length != 0) {
          return (
            this.carts.length ==
            this.carts.filter((item) => item.checked).length
          );
        } else {
          return false;
        }
        // return this.carts.every((item) => item.checked);
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
