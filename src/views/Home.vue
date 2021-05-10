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
        <div class="showthere">
          <p class="showtitle">
            <span class="fenlei">手机</span
            ><router-link
              :to="{ name: 'Hot', params: { id: '60923bd00cac5712dc34e5ee' } }"
              >更多&gt;</router-link
            >
          </p>
          <div class="showbottom">
            <ul>
              <li class="card" v-for="phoneCom in phone" :key="phoneCom._id">
                <router-link
                  :to="{
                    name: 'Detail',
                    params: {
                      id: phoneCom._id,
                    },
                  }"
                >
                  <img :src="phoneCom.coverImg" alt="" />
                  <p>
                    {{ phoneCom.name }}
                  </p>
                  <p>
                    <span class="red">{{ phoneCom.price }}</span
                    >元
                  </p>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="showthere">
          <p class="showtitle">
            <span class="fenlei">智能手表</span
            ><router-link
              :to="{ name: 'Hot', params: { id: '60923bd00cac5712dc34e5ef' } }"
              >更多&gt;</router-link
            >
          </p>
          <div class="showbottom">
            <ul>
              <li class="card" v-for="watchCom in watches" :key="watchCom._id">
                <router-link
                  :to="{
                    name: 'Detail',
                    params: {
                      id: watchCom._id,
                    },
                  }"
                >
                  <img :src="watchCom.coverImg" alt="" />
                  <p>
                    {{ watchCom.name }}
                  </p>
                  <p>
                    <span class="red">{{ watchCom.price }}</span
                    >元
                  </p>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="showthere">
          <p class="showtitle">
            <span class="fenlei">耳机</span
            ><router-link
              :to="{ name: 'Hot', params: { id: '60923bd00cac5712dc34e5f0' } }"
              >更多&gt;</router-link
            >
          </p>
          <div class="showbottom">
            <ul>
              <li
                class="card"
                v-for="headsetCom in headset"
                :key="headsetCom._id"
              >
                <router-link
                  :to="{
                    name: 'Detail',
                    params: {
                      id: headsetCom._id,
                    },
                  }"
                >
                  <img :src="headsetCom.coverImg" alt="" />
                  <p>
                    {{ headsetCom.name }}
                  </p>
                  <p>
                    <span class="red">{{ headsetCom.price }}</span
                    >元
                  </p>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="showthere">
          <p class="showtitle">
            <span class="fenlei">电视</span
            ><router-link
              :to="{ name: 'Hot', params: { id: '60923bd00cac5712dc34e5f1' } }"
              >更多&gt;</router-link
            >
          </p>
          <div class="showbottom">
            <ul>
              <li class="card" v-for="tvCom in tv" :key="tvCom._id">
                <router-link
                  :to="{
                    name: 'Detail',
                    params: {
                      id: tvCom._id,
                    },
                  }"
                >
                  <img :src="tvCom.coverImg" alt="" />
                  <p>
                    {{ tvCom.name }}
                  </p>
                  <p>
                    <span class="red">{{ tvCom.price }}</span
                    >元
                  </p>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="showthere">
          <p class="showtitle">
            <span class="fenlei">灯具</span
            ><router-link
              :to="{ name: 'Hot', params: { id: '60923bd00cac5712dc34e5f2' } }"
              >更多&gt;</router-link
            >
          </p>
          <div class="showbottom">
            <ul>
              <li class="card" v-for="lightCom in light" :key="lightCom._id">
                <router-link
                  :to="{
                    name: 'Detail',
                    params: {
                      id: lightCom._id,
                    },
                  }"
                >
                  <img :src="lightCom.coverImg" alt="" />
                  <p>
                    {{ lightCom.name }}
                  </p>
                  <p>
                    <span class="red">{{ lightCom.price }}</span
                    >元
                  </p>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="showthere">
          <p class="showtitle">
            <span class="fenlei">口红</span
            ><router-link
              :to="{ name: 'Hot', params: { id: '60923bd00cac5712dc34e5f3' } }"
              >更多&gt;</router-link
            >
          </p>
          <div class="showbottom">
            <ul>
              <li
                class="card"
                v-for="lipstickCom in lipstick"
                :key="lipstickCom._id"
              >
                <router-link
                  :to="{
                    name: 'Detail',
                    params: {
                      id: lipstickCom._id,
                    },
                  }"
                >
                  <img :src="lipstickCom.coverImg" alt="" />
                  <p>
                    {{ lipstickCom.name }}
                  </p>
                  <p>
                    <span class="red">{{ lipstickCom.price }}</span
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
      phone: [],
      watches: [],
      headset: [],
      tv: [],
      light: [],
      lipstick: [],
    };
  },
  created() {
    loadCategories().then((res) => {
      this.categories = res.categories;
    });
    loadProducts(1, '60923bd00cac5712dc34e5ee').then((res) => {
      this.phone = res.products;
    });
    loadProducts(1, '60923bd00cac5712dc34e5ef').then((res) => {
      this.watches = res.products;
    });
    loadProducts(1, '60923bd00cac5712dc34e5f0').then((res) => {
      this.headset = res.products;
    });
    loadProducts(1, '60923bd00cac5712dc34e5f1').then((res) => {
      this.tv = res.products;
    });
    loadProducts(1, '60923bd00cac5712dc34e5f2').then((res) => {
      this.light = res.products;
    });
    loadProducts(1, '60923bd00cac5712dc34e5f3').then((res) => {
      this.lipstick = res.products;
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
</style>
