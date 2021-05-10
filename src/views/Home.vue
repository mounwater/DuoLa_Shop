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
      <van-grid :column-num="3">
        <van-grid-item
          v-for="c in categories"
          :key="c._id"
          :icon="c.coverImg"
          :text="c.name"
          :to="{ name: 'Hot', params: { id: c._id } }"
        >
        </van-grid-item>
        <div v-for="c in categories" :key="c._id">
          <p>
            <span>{{ c.name }}</span
            ><router-link :to="{ name: 'Hot', params: { id: c._id } }"
              >更多</router-link
            >
          </p>
        </div>
      </van-grid>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.css';
import axios from 'axios';
import { loadCategories } from '../services/categories';
import { loadProducts } from '../services/products';
export default {
  name: 'Home',
  data() {
    return {
      list: [],
      categories: [],
      products: [],
    };
  },
  async created() {
    const c = await loadCategories();
    const p = await loadProducts();
    console.log(c);
    this.categories = c.categories;
    this.products = p.products;
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
h3 {
  line-height: 4.133333rem;
  white-space: pre-wrap;
}
.tips {
  color: skyblue;
  font-size: 0.2rem;
}
</style>
