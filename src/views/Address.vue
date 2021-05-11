<template>
<div class="main">
 <h1>收货地址</h1>
 <div class="address">
<el-card class="box-card" >
  <div v-for="o in List" :key="o.id" class="text item" style="background:#fff">
    <div class="xinxi">
      <h3>{{o.receiver}}</h3>
      <h3>{{o.mobile}}</h3>
    </div>
    <p>{{o.regions}}{{o.address}}</p>
    <div class="caozuo">
       <el-checkbox v-model="o.isDefault" @change='fault(o.isDefault,o._id)'>默认地址</el-checkbox>
       <div class="anniu">
        <router-link
         :to="{ 
           name: 'Editor',
           query: {
            id: o._id,
           },
          }"
          tag="span"
        >
          <i class="el-icon-edit-outline"></i>编辑
         </router-link>
             <span @click="del(o._id)"><i class="el-icon-delete"></i>删除</span>
       </div>
    </div>
  </div>
</el-card>
 </div>
 <el-row>
 <el-button class="btn" @click="btn" type="primary" round medium>添加新地址</el-button>
</el-row>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name:"Address",
  data(){
    return {
      List:[],
    }
  },
  created(){
    this.p()
  },
  methods:{
    del(id){
      if(confirm("确认删除此收货地址？")){
        axios.delete('http://localhost:3009/api/v1/addresses/'+id,
         {
        headers: {
          authorization: 'bearer ' + sessionStorage.getItem('token'),
        },
         }).then((res)=>{
           console.log(res)
          this.p()
         });
             }
      
    },
    p(){
    axios.get("http://localhost:3009/api/v1/addresses",
   {
   headers: {
     authorization: 'bearer ' + sessionStorage.getItem('token'),
   },},
   ).then((res)=>{
     this.List=res.data.addresses;
     console.log(res);
   });
    },
    btn(){
      this.$router.push({name:"AddAddress"})
    },
    fault(v,c){
      console.log(v)
       axios.put("http://localhost:3009/api/v1/addresses/"+c,
         { 
           isDefault:v, },
        {
          headers: {
            authorization: 'bearer ' + sessionStorage.getItem('token'),
          },},
          ).then((res)=>{
            console.log(res)
          });
        
           }
  },
};
</script>

<style  scoped>
.text{
   padding: 0 1rem;
  border-radius: .5rem;
  width: 100%;
  margin-bottom: .5rem;
  border: 1px solid #ccc;
  background: #f2f2f2;
}
.xinxi{
  margin-bottom: 1rem;
  height:2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
p{
  text-align: left;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f2f2f2;
}
.caozuo{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.naniu i,span{
  font-size: .8rem;
  margin-left: 1rem;
}
.anniu span{
  font-weight: 900;
  color: #4c4c4c;
}
.btn{
  width: 85%;
  height: 3rem;
  margin: 3rem 0;
}
.address{
  height: 70%;
  overflow: auto;
  background: #f2f2f2;
}
.main{
  overflow: hidden;
  height: 100%;
}
</style>

