<template>
  <!-- 用户登录 -->
  <div>
    <router-link to="/">
      <img
        src="../assets/logo.jpg"
        alt
        style="width:35%;display:block;margin: 1rem auto;"
      />
    </router-link>
    <van-form @submit="onSubmit">
      <van-field
        v-model="userName"
        name="userName"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
    <router-link :to="{ name: 'Register' }">没有账号，我要注册</router-link>
    <!--  <h1>请登录</h1>
    <p><span>用户名：</span><input type="text" v-model="username" /></p>
    <p><span>密码：</span><input type="password" v-model="password" /></p>
    <button class="btn" @click="loadHandle">
      登录
    </button>
    <router-link to="/register" class="more">还没账号，我要注册</router-link>-->
  </div>
</template>

<script>
import { Toast } from 'vant';
import { setToken } from '../utils/tools';
import { login } from '../services/auth';
import { mapActions } from 'vuex';
export default {
  name: 'Login',
  data() {
    return {
      userName: '',
      password: '',
    };
  },
  methods: {
    async onSubmit(values) {
      const res = await login(values);
      if (res.code === 'success') {
        setToken(res.token);
        this.updateAsync();
        this.$router.push({
          name: 'Home',
        });
      } else {
        Toast.fail(res.message);
      }
    },
    ...mapActions(['updateAsync']),
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
