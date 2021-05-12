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
        <van-col class="dyge" span="4">编号</van-col>
        <van-col class="dyge" span="4">产品</van-col>
        <van-col class="dyge" span="4">类别</van-col>
        <van-col class="dyge" span="4">运输</van-col>
        <van-col class="dyge" span="4">时间</van-col>
        <van-col class="dyge" span="4">状态</van-col>
      </van-row>
    </div>
    <div class="tableTitle">
      <van-row :key="index" v-for="(item,index) in orders" @click="toOrderList(item.id)">
        <!-- <van-col class="dyge" span="4" :key="item" v-for="(item) in orders[index]">{{item}}</van-col> -->
        <van-col class="dyge" span="4">状态</van-col>
      </van-row>
    </div>
  </div>

  <!-- -------------------------------------------------- -->
</template>
<script type="text/javascript">
import Vue from 'vue'
import { orderLists } from '../services/orders';
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
      orderLists: []
    }
  },
  async created() {
    const o = await orderLists()
    this.orderLists = o.orderLists
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
    // async toOrderList(pId) {
    //   const res = await orderdetail(pId);
    //   if (res) {
    //     this.$router.push('orderdetail');
    //   }

    //   console.log(pId)
    // }
  },
  mounted: {
    orders: [{
      id: 1,
      name: '小板凳',
      genre: '乐园',
      transport: '飞机',
      date: '2021-05-11',
      states: '未完成'
    }, {
      id: 2,
      name: '外卖',
      genre: '美食',
      transport: '飞碟',
      date: '2021-05-11',
      states: '完成'
    }, {
      id: 3,
      name: 'vue案例',
      genre: '图书',
      transport: '火箭',
      date: '2021-05-11',
      states: '完成'
    },
    {
      id: 4,
      name: '一丝秀发',
      genre: '奢侈品',
      transport: '流星',
      date: '2021-05-11',
      states: '未完成'
    }]
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
  background: rgba(144, 209, 209, 0.5);
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
h1 {
  padding: 3px 0;
  font-size: 20px;
}
hr {
  margin: 2px 0;
  background: rgb(119, 59, 216);
}
.orderbox {
  margin: auto;
  width: 100%;
  text-align: center;
}
</style>
