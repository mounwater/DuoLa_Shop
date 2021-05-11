<template>
  <!-- 个人中心 -->
  <div>
    <div class="userInfo">
      <img :src="user.avatar | dalImg" class="userPic" />
      <h3>{{ user.nickName }}</h3>
      <h3>{{ user.userName }}</h3>
    </div>
    <p class="do">
      <router-link :to="{
          name: 'Changeinfo',
        }">修改用户信息</router-link>
      <button @click="logOut">退出当前登录</button>
    </p>
  </div>
</template>

<script>
import axios from 'axios';
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
      sessionStorage.removeItem('token');
      this.$router.push('/');
      this.eventBus.$emit('buyed', 0);
    },
  },
};
</script>

<style scoped>
img {
  max-width: 20vw;
  margin: 0 auto;
  border-radius: 50%;
}
.userPic {
  float: left;
}
.userInfo {
  min-height: 20vh;
  border-top: 1px solid skyblue;
  border-bottom: 1px solid skyblue;
  display: flex;
  flex-direction: column;
}
.do {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding: 0 1rem;
}
button,
a {
  width: 6rem;
  font-size: 0.8rem;
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
</style>
