<template>
  <!-- 修改个人信息 -->
  <div class="info">
    <h1 style="margin-bottom:2rem">修改资料</h1>
 <img style="width: 120px;" @click="selImg" :src="imgUrl | dalImg" />
<input
  type="file"
  ref="file"
  @change="selectImgEnd"
  style="display: none;"
/>
<div style="margin:1.5rem">
<input style="margin:.5rem;width:80%;height:2rem" type="text" v-model="info.nickName">
<input style="margin:.5rem;width:80%;height:2rem" type="password" placeholder="请输入旧密码" v-model="jpsd">
<input style="margin:.5rem;width:80%;height:2rem" type="password" placeholder="请输入新密码" v-model="psd">
<input style="margin:.5rem;width:80%;height:2rem" type="password" placeholder="请再输入一遍新密码" v-model="rpsd">
</div>
  <el-button type="success" @click=" changepsd">保存</el-button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ChangeUserInfo',
  data() {
    return {
      labelPosition: 'right',
      jpsd:'',
       psd:'',
       rpsd:'',
      info: {
        nickName: '',
        avatar: '',
      },
      imgUrl: '',
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
        console.log(res.data.avatar);
        this.info = { nickName: res.data.nickName, avatar: res.data.avatar };
        this.imgUrl = res.data.avatar;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    selImg() {
      this.$refs.file.click();
    },
    selectImgEnd(e) {
      // console.log(e.currentTarget.files);
      const formData = new FormData();
      formData.append('file', e.currentTarget.files[0]);
      axios
        .post('http://localhost:3009/api/v1/common/file_upload', formData)
        .then((res) => {
          console.log(res.data);
          this.imgUrl = res.data.info;
        });
    },
    saveHandle() {
      axios
        .post(
          'http://localhost:3009/api/v1/users/change_info',
          {
            nickName: this.info.nickName,
            avatar: this.imgUrl,
          },
          {
            headers: {
              authorization: 'bearer ' + sessionStorage.getItem('token'),
            },
          }
        )
        .then((res) => {
          alert("修改成功")
          console.log(res);
          this.$router.push({
            name: 'User',
          });
        });
    },
    changepsd(){
      axios
      .get('http://localhost:3009/api/v1/users/info', {
        headers: {
          authorization: 'bearer ' + sessionStorage.getItem('token'),
        },
      })
      .then((res) => {
        console.log(res.data.password)
         if(this.psd===this.rpsd){
             axios
              .post('http://localhost:3009/api/v1/users/change_pwd',
              {
                oldPassword:this.jpsd,
                password:this.psd
              },
              {
                headers: {
                  authorization: 'bearer ' + sessionStorage.getItem('token'),
                },
              }).then((res)=>{
                console.log(res)
                this.saveHandle()
              })
         }else{
           alert("前后两次输入的密码不一致")
         }
        
      })
      .catch((err) => console.log(err));
      
        }
     },
};
</script>

<style scoped>
.info {
  display: flex;
  flex-direction: column;
  align-items: center;
}
img{
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
.btn {
  width: 80%;
  border: none;
  padding: 0.4rem;
  text-align: center;
  background-color: #ff4777;
  color: white;
  border-radius: 10px;
}
.el-form {
  background: #f7f7f7;
}
.el-form-item{
  margin-bottom: 0;
  padding: 0 .8rem;
}
.el-button{
  margin: 3rem 0;
  width: 85%;
}
</style>
