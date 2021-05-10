<template>
  <!-- 用户注册 -->
  <div>
    <router-link to="/">
      <!-- <img src="../assets/logo.jpg" alt="" style="width:35%;display:block;margin: 1rem auto;" /> -->
    </router-link>
    <van-form @submit="onSubmit">
      
      <van-field 
      v-model="userName"
      name="userName"
      label="用户名"
      placeholder="用户名"
      :rules="[{required:true,message:'请填写用户名'}]"
      />
      

      <van-field
      v-model="password"
      type="password"
      name="password"
      label="密码"
      placeholder="密码"
      :rules="[{required:true,message:'请填写密码'}]"
      />

      <van-field
      v-model="repassword"
      type="password"
      name="repassword"
      label="确认密码"
      placeholder="密码"
      :rules="[{required:true,message:'请再次填写密码'}]"
      />
      
      <div>
        <van-button round block type="info" native-type="submit">注册</van-button>
      </div>
    </van-form>
    <router-link :to="{name:'Login'}">已有账号，我要登录</router-link>
    <!-- <h1>请注册</h1>
    <p>用户名：<input type="text" v-model="username" /></p>
    <p>密码：<input type="password" v-model="password" /></p>
    <button class="btn" @click="regHandle">
      注册
    </button>
    <router-link to="/login" class="more">已有账号，我要登录</router-link> -->
  </div>
</template>

<script>
import {Toast} from 'vant';
import {setToken} from "../utils/tools"
import {reg} from '../services/auth'
export default {
  name: 'Login',
  data() {
    return {
      userName: '',
      password: '',
      repassword:'',
    };
  },
  methods: {
    async onSubmit(values){
      if(values.password===values.repassword){
        const res=await reg(values);
        if(res.code==="success"){
          setToken(res.token);
          this.$router.push({
            name:"Login",
          })
        }else{
          Toast.fail(res.message);
        }
        console.log(res)
      }else{
        Toast.fail("两次输入的密码不一致");
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
