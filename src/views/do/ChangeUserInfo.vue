<template>
  <!-- 修改个人信息 -->
  <div class="info">
    <img style="width: 120px;" @click="selImg" :src="imgUrl | dalImg" />
    <input
      type="file"
      ref="file"
      @change="selectImgEnd"
      style="display: none;"
    />
    <input type="text" placeholder="请输入昵称" v-model="info.nickName" />
    <button class="btn" @click="saveHandle">保存</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ChangeInfo',
  data() {
    return {
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
          console.log(res);
          this.$router.push({
            name: 'User',
          });
        });
    },
  },
};
</script>

<style scoped>
.info {
  display: flex;
  flex-direction: column;
  align-items: center;
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
</style>
