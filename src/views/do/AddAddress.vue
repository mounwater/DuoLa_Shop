<template>
<div class="addAddress">
  <h1>新增地址</h1>
  <el-form :label-position="labelPosition">
  <el-form-item label="联系人">
    <el-input v-model="receiver" placeholder="请输入收件人"></el-input>
  </el-form-item>
  <el-form-item label="联系电话">
    <el-input v-model="mobile" placeholder="请输入联系电话"></el-input>
  </el-form-item>
  <el-form-item label="地区信息">
    <el-input v-model="regions" placeholder="省、市、区、乡镇/街道"></el-input>
  </el-form-item>
  <el-form-item label="详细地址">
   <el-input v-model="address" placeholder="街道门牌信息"></el-input>
 </el-form-item>
 <div class="div">
     <el-checkbox v-model="checked"  style="margin-left:0">设置默认地址</el-checkbox>
 </div>
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
        receiver:"",
        mobile:"",     
        regions:"",    
        address:"",    
        checked:"false",  
      };
    },
    methods:{
      btn(){
        console.log(sessionStorage.getItem('token'))
          axios.post("http://localhost:3009/api/v1/addresses",
           { receiver:this.receiver,
             mobile:this.mobile,  
             regions:this.regions, 
             address:this.address, 
             isDefault:this.checked, },
          {
            headers: {
              authorization: 'bearer ' + sessionStorage.getItem('token'),
            },},
            ).then((res)=>{
              alert(res.data.message)
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
