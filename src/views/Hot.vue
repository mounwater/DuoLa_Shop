<template>
  <!-- 热卖商品展示列表 -->
  <div class="products">
    <hr />
    <div>
      <div class="item" v-for="item in list" :key="item._id">
        <router-link
          :to="{
            name: 'Detail',
            params: {
              id: item._id,
              l: Math.random(),
              o: item.price,
            },
            query: {
              name: item.name,
            },
          }"
          tag="div"
        >
          <img :src="item.coverImg" alt="" />
          <h3>{{ item.name }}</h3>
        </router-link>
        <button @click="addCart(item._id)" class="add">
          加入购物车
        </button>
      </div>
      <button class="more" @click="loadMoredata">加载更多</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'List',
  data() {
    return {
      list: [],
      page: 1,
    };
  },
  created() {
    console.log('ok');
    this.loadMoredata();
  },
  methods: {
    async loadMoredata() {
      const res = await axios.get(
        'http://localhost:3009/api/v1/products?page=' + this.page
      );
      this.page++;
      this.list = [...this.list, ...res.data.products];
      // console.log(this.list);
    },
    async addCart(id) {
      // console.log(id);
      await axios
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

      await axios
        .get('http://localhost:3009/api/v1/shop_carts', {
          headers: {
            authorization: 'bearer ' + sessionStorage.getItem('token'),
          },
        })
        .then((res) => {
          this.shopCount = res.data.length;
          // this.eventBus.$emit('buyed', this.shopCount);
        });
    },
  },
};
</script>

<style scoped>
img {
  margin: 0 auto;
}
.products {
  text-align: center;
}
.item {
  text-align: center;
  margin-bottom: 10vh;
}
.item img {
  width: 60vw;
}
.more {
  width: 8rem;
  border: none;
  background: deeppink;
  color: white;
  line-height: 2rem;
  text-align: center;
  margin-bottom: 2vh;
}
h3 {
  line-height: 4rem;
  text-decoration: none;
  color: black;
}
.add {
  width: 6rem;
  height: 2rem;
  border: none;
  border-radius: 15px;
  color: white;
  background: deeppink;
}
</style>
