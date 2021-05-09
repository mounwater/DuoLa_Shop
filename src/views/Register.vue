<template>
  <!-- 用户注册 -->
  <div>
    <router-link to="/">
      <img src="../assets/logo.jpg" alt="" />
    </router-link>
    <h1>请注册</h1>
    <p>用户名：<input type="text" v-model="username" /></p>
    <p>密码：<input type="password" v-model="password" /></p>
    <button class="btn" @click="regHandle">
      注册
    </button>
    <router-link to="/login" class="more">已有账号，我要登录</router-link>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Register',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    regHandle() {
      if (this.username && this.password) {
        axios
          .post('http://localhost:3009/api/v1/auth/reg', {
            userName: this.username,
            password: this.password,
          })
          .then((res) => {
            // console.log(res.data);
            if (res.data.code === 'success') {
              sessionStorage.setItem('token', res.data.token);
              this.$router.push({
                name: 'Home',
              });
            } else {
              alert(res.data.message);
            }
          });
      } else {
        alert('请输入正确信息！');
      }
    },
  },
};
</script>

<style scoped>
div {
  text-align: center;
}
img {
  width: 50vw;
  margin: 0 auto;
}
p {
  text-align: right;
  margin-top: 6vh;
  margin-right: 22vw;
}
input {
  height: 4vh;
  border: none;
  border-bottom: 1px solid black;
}
a {
  display: block;
  font-size: 1rem;
  margin-top: 10vh;
}
.btn {
  border: none;
  width: 36vw;
  height: 6vh;
  color: white;
  background: #4473c2;
  border-radius: 10px;
  margin-top: 10vh;
}
</style>
