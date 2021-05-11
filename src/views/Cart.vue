<template>
  <!-- 购物车 -->
  <div>
    <hr />
    <div v-for="item in list" :key="item._id" class="commidity">
      <img :src="item.product.coverImg" alt />
      <div class="cartInfo">
        <p class="comName">{{ item.product.name }}</p>
        <span>单价{{ item.product.price }}元</span>
        <span class="sum">单个商品总价{{ item.quantity * item.product.price }}元</span>
        <p class="comCount">
          数量
          <span class="minus" @click="minus(item.product._id)">-</span>
          {{ item.quantity
          }}
          <span class="adds" @click="adds(item.product._id)">+</span>
          <button @click="delCart(item._id)">删除</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Cart',
  data() {
    return {
      shopCount: '',
      list: {},
    };
  },
  async created() {
    await this.getCart();
  },
  methods: {
    delCart(id) {
      axios
        .delete('http://localhost:3009/api/v1/shop_carts/' + id, {
          headers: {
            authorization: 'bearer ' + sessionStorage.getItem('token'),
          },
        })
        .then((res) => {
          console.log(res);
          this.getCart();
        });
    },
    getCart() {
      axios
        .get('http://localhost:3009/api/v1/shop_carts', {
          headers: {
            authorization: 'bearer ' + sessionStorage.getItem('token'),
          },
        })
        .then((res) => {
          this.list = res.data;
          console.log(this.list);
          this.shopCount = this.list.length;
          // console.log(this.shopCount);
          this.eventBus.$emit('buyed', this.shopCount);
        });
    },
    minus(id) {
      this.list.forEach((item) => {
        if (item.product._id == id) {
          if (item.quantity > 1) {
            item.quantity--;
            axios
              .post(
                'http://localhost:3009/api/v1/shop_carts',
                {
                  product: id,
                  quantity: -1,
                },
                {
                  headers: {
                    authorization: 'bearer ' + sessionStorage.getItem('token'),
                  },
                }
              )
              .then((res) => {
                console.log(res);
              });
          }
        }
      });
    },
    adds(id) {
      console.log(id);
      this.list.forEach((item) => {
        if (item.product._id == id) {
          if (item.quantity >= 1) {
            item.quantity++;
            axios
              .post(
                'http://localhost:3009/api/v1/shop_carts',
                {
                  product: id,
                  quantity: 1,
                },
                {
                  headers: {
                    authorization: 'bearer ' + sessionStorage.getItem('token'),
                  },
                }
              )
              .then((res) => {
                console.log(res);
              });
          }
        }
      });
    },
  },
};
</script>

<style scoped>
.commidity img {
  width: 18vw;
}
.commidity {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-start;
  border-top: 1px solid gray;
}
.cartInfo {
  flex: 1;
  height: 10vh;
  text-align: left;
}
/* .comCount {
  margin-top: 1rem;
} */
.minus,
.adds {
  display: inline-block;
  width: 2rem;
  background: #4473c2;
  font-size: 1rem;
  color: white;
  text-align: center;
}
.sum {
  margin-left: 2rem;
}
.comName {
  font-weight: bold;
  text-align: center;
}
</style>
