<template>
  <!-- 个人中心 -->
  <div>
    <div class="userInfo">
      <img :src="user.avatar | dalImg" class="userPic" />
      <span>{{ user.nickName }}</span>
    </div>
    <el-card class="box-card">
      <div class="text item">
        <h2>我的订单</h2>
        <router-link :to="{ name: 'Order' }">
          <i class="el-icon-arrow-right"></i>
        </router-link>
      </div>
      <div class="text item">
        <h2>收货地址</h2>
        <router-link :to="{ name: 'Address' }">
          <i class="el-icon-arrow-right"></i>
        </router-link>
      </div>
      <div class="text item">
        <h2>资料修改</h2>
        <router-link :to="{ name: 'ChangeUserInfo' }">
          <i class="el-icon-arrow-right"></i>
        </router-link>
      </div>
    </el-card>
    <button @click="logOut">退出当前登录</button>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
export default {
  name: 'User',
  data() {
    return {
      imgUrl: '',
      user: {},
    };
  },
  created() {
    axios
      .get('http://localhost:3009/api/v1/users/info', {
        headers: {
          authorization: 'bearer ' + sessionStorage.getItem('token'),
        },
      })
      .then((res) => {
        this.user = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    logOut() {
      if (confirm('确认是否退出登录')) {
        sessionStorage.removeItem('token');
        this.updateAsync();
        this.$router.push('/');
        this.eventBus.$emit('buyed', 0);
      }
    },
    ...mapActions(['updateAsync']),
  },
};
</script>

<style scoped>
img {
  width: 20vw;
  height: 20vw;
  margin: 0 2rem;
  border-radius: 50%;
}
.userPic {
  float: left;
}
.userInfo {
  min-height: 20vh;
  border-top: 1px solid skyblue;
  border-bottom: 1px solid skyblue;
  background: #409eff;
  border-radius: 0.5rem;
  display: flex;
  justify-content: right;
  align-items: center;
  color: #f2f2f2;
  font-weight: 900;
}
.do {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding: 0 1rem;
}
button {
  margin-top: 1.5rem;
  width: 85%;
  height: 3rem;
  font-size: 1rem;
  border: none;
  color: white;
  background: #ff4777;
  line-height: 1.5rem;
  border-radius: 10px;
}
.top {
  height: 6vh;
  line-height: 6vh;
  color: skyblue;
}
.top img {
  float: left;
}
.top span {
  font-weight: bold;
  float: left;
}
.text {
  display: flex;
  padding: 0 1rem;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.2rem;
  border-bottom: 1px solid #ccc;
}
.text i {
  font-size: 1.5rem;
  color: #999;
}
.item {
  padding: 18px 0;
}

.box-card {
  margin-top: 1rem;
  width: 100%;
}
</style>
