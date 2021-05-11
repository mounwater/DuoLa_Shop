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
        <div class="showthere" v-for="(item, index) in categories" :key="index">
          <p class="showtitle">
            <span class="fenlei">{{ item.name }}</span
            ><router-link :to="{ name: 'Hot', params: { id: item._id } }"
              >更多&gt;</router-link
            >
          </p>
          <div class="showbottom">
            <ul>
              <li
                class="card"
                v-for="itemCom in products.find((c) => c.cid == item._id)
                  .product"
                :key="itemCom._id"
              >
                <router-link
                  :to="{
                    name: 'Detail',
                    params: {
                      id: itemCom._id,
                    },
                  }"
                >
                  <img :src="itemCom.coverImg" alt="" />
                  <p>
                    {{ itemCom.name }}
                  </p>
                  <p>
                    <span class="red">{{ itemCom.price }}</span
                    >元
                  </p>
                </router-link>
              </li>
            </ul>
          </div>
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
    await loadCategories().then((res) => {
      console.log(res);
      this.categories = res.categories;
    });
    this.categories.forEach(async (res) => {
      const comRes = await loadProducts(1, res._id);
      this.products.push({ cid: res._id, product: comRes.products });
    });
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
.showthere {
  width: 100%;
  min-height: 30vh;
  border-top: 1px solid gray;
}
.showtitle {
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  line-height: 2rem;
  font-size: 0.9rem;
}
.showbottom {
  overflow-x: auto;
}
.showbottom ul {
  min-width: 1500px;
  display: flex;
  justify-content: space-around;
}
.showbottom li {
  width: 8%;
  font-size: 0.5rem;
  padding: 0.6rem 0;
}
.card img {
  width: 100%;
}
.red {
  color: red;
}
.fenlei {
  font-weight: bold;
}
.van-grid-item {
  position: relative;
  box-sizing: border-box;
  padding: 0.3rem;
  overflow: hidden;
  background: #f6f6f6;
}
</style>
