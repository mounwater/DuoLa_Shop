<template>
  <!-- 用户登录 -->
  <div>
    <router-link to="/">
      <img src="../assets/logo.jpg" alt="" />
    </router-link>
    <h1>请登录</h1>
    <p><span>用户名：</span><input type="text" v-model="username" /></p>
    <p><span>密码：</span><input type="password" v-model="password" /></p>
    <button class="btn" @click="loadHandle">
      登录
    </button>
    <router-link to="/register" class="more">还没账号，我要注册</router-link>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    loadHandle() {
      if (this.username && this.password) {
        axios
          .post('http://localhost:3009/api/v1/auth/login', {
            userName: this.username,
            password: this.password,
          })
          .then((res) => {
            if (res.data.code === 'success') {
              sessionStorage.setItem('token', res.data.token);
              this.$router.push('/user');
              axios
                .get('http://localhost:3009/api/v1/shop_carts', {
                  headers: {
                    authorization: 'bearer ' + sessionStorage.getItem('token'),
                  },
                })
                .then((res) => {
                  this.shopCount = res.data.length;
                  this.eventBus.$emit('buyed', this.shopCount);
                });
            } else {
              alert(res.data.message);
            }
          });
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
