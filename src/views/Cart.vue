<template>
  <!-- 购物车 -->

  <div class="about">
    <van-cell-group style="padding-bottom:70px;">
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
      style="bottom:50px"
    >
      <van-checkbox v-model="checkedAll" class="">全选</van-checkbox>
      <template #tip>
        <span @click="onClickEditAddress" style="color:blue;">{{
          '收货人：' +
            location[0].receiver +
            '  地址：' +
            location[0].regions +
            location[0].address
        }}</span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import { loadCarts, addToCart } from '../services/carts';
import { delCarts } from '../services/carts';
import { tjdd } from '../services/carts';
import { cxaddress } from '../services/carts';
import { Toast } from 'vant';
import { mapActions } from 'vuex';
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
    ...mapActions(['updateAsync']),
    async changeCartData(p, q, index) {
      const endCount = p.quantity + q;
      if (endCount > 0) {
        await addToCart(p.product._id, q);
        this.updateAsync();
        this.carts[index].quantity += q;
      }
    },
    async loadData() {
      const res = await loadCarts();
      this.carts = res.map((item) => ({ ...item, checked: false }));
      // console.log(this.carts);
    },
    async address() {
      const res = await cxaddress();
      if (res.addresses.length == 0) {
        Toast.fail('请添加地址后重试');
        this.$router.push({
          name: 'Address',
        });
      } else {
        this.location = res.addresses.filter((item) => item.isDefault == true);
      }

      // console.log(res.addresses.filter((item) => item.isDefault == true));
      // this.location.forEach((item) => console.log(item.address));
    },
    async del(id, index) {
      // await delCarts(id).then(this.loadData());
      delCarts(id);
      this.carts[index].checked = false;
      this.carts.splice(index, 1);

      /*  if (this.carts.length == 0) {
        this.$refs.dom.checked = false;
      } */
      // console.log(this.$refs.dom.length);
    },
    onSubmit() {
      if (this.carts.length) {
        this.carts
          .filter((item) => item.checked)
          .forEach((item) => {
            this.carted.push({
              quantity: item.quantity,
              product: item.product._id,
              price: item.product.price,
            });
            this.del(item._id, this.carts.indexOf(item));
            // this.del(item._id);
            Toast.success('提交订单成功！');
          });
        /* this.carts.filter((item)=>item.checked).forEach((item)=>{
          
        }) */
        // console.log(this.carted);
        /* this.location.forEach((item) =>
        tjdd(item.receiver, item.regions, item.address)
      ); */
        tjdd(
          this.location[0].receiver,
          this.location[0].regions,
          this.location[0].address,
          this.carted
        ).then((res) => console.log(res.code));
      } else {
        Toast.fail('购物车为空');
      }
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
