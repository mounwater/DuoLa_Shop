<template>
<div class="addAddress">
  <h1>修改地址</h1>
  <el-form :label-position="labelPosition">
  <el-form-item label="联系人">
    <el-input v-model="address.receiver" placeholder="请输入收件人"></el-input>
  </el-form-item>
  <el-form-item label="联系电话">
    <el-input v-model="address.mobile" placeholder="请输入联系电话"></el-input>
  </el-form-item>
  <el-form-item label="地区信息">
    <el-input v-model="address.regions" placeholder="省、市、区、乡镇/街道"></el-input>
  </el-form-item>
  <el-form-item label="详细地址">
   <el-input v-model="address.address" placeholder="街道门牌信息"></el-input>
 </el-form-item>
 </el-form>
  <el-button type="success" @click="btn">保存</el-button>
</div>
</template>

<script>
import axios from 'axios'
export default {
    name:'AddAddress',
    data() {
      return {
          labelPosition: 'right',
          address:{},
      };
    },
    created(){
          axios.get("http://localhost:3009/api/v1/addresses/"+this.$route.query.id,
          {
          headers: {
            authorization: 'bearer ' + sessionStorage.getItem('token'),
          },},
          ).then((res)=>{
             this.address=res.data;
            console.log( res.data);
          });
    },
    methods:{
      btn(){
          axios.put("http://localhost:3009/api/v1/addresses/"+this.$route.query.id,
           { receiver:this.address.receiver,
             mobile:this.address.mobile,  
             regions:this.address.regions, 
             address:this.address.address, 
             isDefault:this.address.checked, },
          {
            headers: {
              authorization: 'bearer ' + sessionStorage.getItem('token'),
            },},
            ).then((res)=>{
              alert("地址修改成功")
              console.log(res)
             this.$router.push({name:"Address"})
            });
          }
    }
};
</script>

<style  scoped>
.el-form {
  background: #f7f7f7;
}
.el-form-item{
  margin-bottom: 0;
  padding: 0 .8rem;
}
.el-button{
  margin: 5rem 0;
  width: 85%;
}
</style>
