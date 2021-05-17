<template>
  <!-- 订单展示列表 -->
  <!-- -------------------------------------------------- -->
  <div class="orderbox">
    <h1>订单列表</h1>
    <hr />
    <van-dropdown-menu class="upmenu">
      <van-dropdown-item
        v-model="value1"
        class="inmenu"
        :options="option1"
        @change="change(value1)"
      />
      <van-dropdown-item v-model="value2" class="inmenu" :options="option2" />
    </van-dropdown-menu>
    <div class="tableTitle">
      <van-row>
        <van-col class="dyge" span="4">订单号</van-col>
        <van-col class="dyge" span="4">买方</van-col>
        <van-col class="dyge" span="4">区域</van-col>
        <van-col class="dyge" span="4">地址</van-col>
        <van-col class="dyge" span="4">支付</van-col>
        <van-col class="dyge" span="4">时间</van-col>
      </van-row>
    </div>
    <div class="tableTitle">
      <van-row :key="index" v-for="(item,index) in orderLists" @click="toOrderList(item._id)">
        <router-link :to="{name:'OrderDetail',params:{id:item._id}}">
          <van-col class="dyge one" span="4">{{item._id}}</van-col>
          <van-col class="dyge two" span="4">{{item.receiver}}</van-col>
          <van-col class="dyge three" span="4">{{item.regions}}</van-col>
          <van-col class="dyge four" span="4">{{item.address}}</van-col>
          <van-col class="dyge five" span="4">{{item.price}}</van-col>
          <van-col class="dyge six" span="4">{{item.createdAt | format('yyyy-mm-dd')}}</van-col>
        </router-link>
      </van-row>
      <van-button class="alldel" type="danger" @click="alldel">全部删除</van-button>
      <van-button class="oncedel" type="primary" @click="oncedel(val)">
        删除
        <!-- <router-link :to="{name:'Order',params:{id:orderLists[val-1]._id}} ">删除</router-link> -->
      </van-button>
      <van-field v-model="val" label="操作" placeholder="删除订单请输入一个数字" />
    </div>
  </div>

  <!-- -------------------------------------------------- -->
</template>
<script type="text/javascript">
import Vue from 'vue'
import { orderLists } from '../services/orders'
// import axios from 'axios';
// import { oneDel } from '../services/delelist'
// import axios from 'axios';
// 日期格式化
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

export default {
  name: 'Order',
  data() {

    return {
      val: '',
      value: 3,
      value1: 1,
      value2: 't',
      // flag: false,
      // isShow: false,
      option1: [
        { text: '全部订单', value: 0 },
        { text: '已完成', value: 1 },
        { text: '未完成', value: 2 },
      ],
      option2: [
        { text: '时间排序', value: 't' },
      ],
      orderLists: [],

    }
  },
  async created() {
    // this.toOrderList()
    const o = await orderLists()
    this.orderLists = o.orders
  },

  computed: {
  },
  watch: {
    option1: function () {
    }
  },
  methods: {
    change(vval) {
      console.log(vval);
    },
    alldel() {
      console.log(3)
    },
    oncedel(value) {
      if (value == '') {
        alert('请填写要删除的订单序号！')
      } else {
        if (this.orderLists.length == 1) {
          this.orderLists = []
        } else if (this.orderLists.length == 0) {
          return 0;
        } else {
          let theNum = this.orderLists[value - 1]._id
          this.orderLists = this.orderLists.filter(function (item) {
            // await axios.get(`http://localhost:3009/api/v1/orders/${item._id}`)
            return item._id != theNum
          })
          console.log(value, theNum)
        }
      }

    }
  },
  mounted: {

  }
};
</script>

<style scoped>
.upmenu {
  background: rgba(255, 255, 255, 0.5);
}
.upmenu .inmenu {
  background: rgba(255, 255, 255, 0.5);
}
.tableTitle {
  margin-top: 2px;
  background: rgba(216, 65, 166, 0.3);
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
.orderbox {
  height: 100%;
  background: url(image/jumpChild.gif) no-repeat center;
  background-size: cover;
}
.one,
.two,
.three,
.four,
.five,
.six {
  height: 100px;
  line-height: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
h1 {
  padding: 3px 0;
  font-size: 20px;
}
hr {
  margin: 2px 0;
  background: rgb(123, 69, 209);
}
.orderbox {
  margin: auto;
  width: 100%;
  text-align: center;
}
.oncedel {
  width: 80px;
  border-radius: 5px;
  margin: 10px;
}
.alldel {
  width: 120px;
  border-radius: 5px;
  margin: 10px;
}
</style>
