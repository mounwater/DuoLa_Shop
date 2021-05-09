<template>
  <!-- 首页 -->
  <div>
    <!-- Swiper -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in list" :key="index">
          <img :src="item" alt="" />
        </div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
      <!-- Add Arrows -->
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
    <div class="content">
      <h3>
        曾经，<br />我们都梦想过也有一个哆啦A梦，<br />竹蜻蜓、任意门或者时光机，<br />哆啦A梦的神奇道具有着各种神奇的功能。
      </h3>
      <p class="tips">
        哆啦商城旨在为喜爱哆啦A梦的朋友们提供一个便捷的购物平台
      </p>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.css';
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    var getPic = async () => {
      //使用axios调用网易云音乐的banner图接口
      const res = await axios.get('http://net-music.penkuoer.com/banner');
      //   console.log(res.data.banners);
      res.data.banners.forEach((item) => {
        this.list.push(item.imageUrl);
      });
    };
    // console.log(this.list);
    var play = async () => {
      //设置当从接口取数据完毕后再执行轮播控制
      await getPic();
      swiperPic();
    };
    play();
    function swiperPic() {
      new Swiper('.swiper-container', {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    }
  },
  methods: {},
};
</script>

<style scoped>
/* scoped表示设置的样式只在当前组件内部有效 */
html,
body {
  position: relative;
  height: 100%;
}

body {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.swiper-slide img {
  width: 100%;
}
.content {
  text-align: left;
  padding: 5vh 5vw;
}
h3 {
  line-height: 4.133333rem;
  white-space: pre-wrap;
}
.tips {
  color: skyblue;
  font-size: 0.2rem;
}
</style>
