<template>
  <!-- 订单详情 -->
  <div>
    <h1>订单详情</h1>
    <hr />
    <div class="tableTitle">
      <van-row>
        <van-col class="dyge" span="6">名称</van-col>
        <van-col class="dyge" span="6">图片</van-col>
        <van-col class="dyge" span="6">时间</van-col>
        <van-col class="dyge" span="6">支付</van-col>
      </van-row>
      <van-row :key="index" v-for="(item,index) in products">
        <van-col class="dyge one" span="6">{{item.name}}</van-col>
        <van-col class="dyge two" span="6">
          <img :src="item.coverImg" alt />
        </van-col>
        <van-col class="dyge three" span="6">{{item.updatedAt | format('yyyy-mm-dd')}}</van-col>
        <van-col class="dyge three" span="6">{{item.price}}</van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
// import { loadCarts } from '../services/carts';
// import { loadProduct } from '../services/products';
import Vue from 'vue'
// -----------------------------------
Vue.filter('format', function (value, arg) {
  function dateFormat(date, format) {
    if (typeof date === "string") {
      var mts = date.match(/(\/Date\((\d+)\)\/)/);
      if (mts && mts.length >= 3) {
        date = parseInt(mts[2]);
      }
    }
    date = new Date(date);
    if (!date || date.toUTCString() == "Invalid Date") {
      return "";
    }
    var map = {
      "M": date.getMonth() + 1, //月份 
      "d": date.getDate(), //日 
      "h": date.getHours(), //小时 
      "m": date.getMinutes(), //分 
      "s": date.getSeconds(), //秒 
      "q": Math.floor((date.getMonth() + 3) / 3), //季度 
      "S": date.getMilliseconds() //毫秒 
    };
    format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
      var v = map[t];
      if (v !== undefined) {
        if (all.length > 1) {
          v = '0' + v;
          v = v.substr(v.length - 2);
        }
        return v;
      } else if (t === 'y') {
        return (date.getFullYear() + '').substr(4 - all.length);
      }
      return all;
    });
    return format;
  }
  return dateFormat(value, arg);
});

// ----------------------------------
import { listDtail } from '../services/orders'
import axios from 'axios';
export default {
  data() {
    return {
      flag: 0,
      psong: ['配送中', '已完成'],
      lists: [],
      productsIDs: [],
      products: []
    }
  },
  async created() {
    let thearr = this.productsIDs
    const res = await listDtail(this.$route.params.id)
    this.lists = res.details
    console.log(res)
    this.lists.forEach(function (item) {
      thearr.push(item.product._id)
    })
    console.log(this.productsIDs)
    let thepro = []
    this.productsIDs.forEach(async function (i) {
      const res = await axios.get(`http://localhost:3009/api/v1/products/${i}`)
      thepro.push(res.data)
    })
    this.products = thepro
    // this.products = Array.from(this.products)
    console.log(thepro, this.products, 1)
    // console.log(this.$route.params.id, res, res.price)
  },
  methods: {

  }
};
</script>

<style scoped>
.tableTitle {
  margin-top: 2px;
  background: rgba(56, 172, 226, 0.5);
  box-shadow: 0 2px rgb(235, 228, 228);
}
.dyge {
  font-size: 12px;
  height: 32px;
  line-height: 32px;
  border: 1px solid grey;
}
.dyge ~ .dyge {
  border-left: none;
}
.tableTitle {
  height: 100%;
  background: url(image/jumpChild.gif) no-repeat center;
  background-size: cover;
}
.one,
.two,
.three,
.four,
.five {
  height: 100px;
  line-height: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
}

img {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
