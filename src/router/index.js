import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
Vue.filter('dalImg', (v) => {
  if (v) {
    if (v.startsWith('http')) {
      return v;
    } else {
      return `http://localhost:3009${v}`;
    }
  } else {
    return 'https://img0.baidu.com/it/u=1262235066,623940843&fm=26&fmt=auto&gp=0.jpg';
  }
});

// @ 表示src目录
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home'),
  },

  {
    path: '/login',
    name: 'Login',
    meta: {
      hideNav: true,
    },
    component: () => import('@/views/Login'),
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      hideNav: true,
    },
    component: () => import('@/views/Register'),
  },
  {
    path: '/hot',
    name: 'Hot',
    meta: {
      hideNav: true,
    },
    component: () => import('@/views/Hot'),
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('@/views/Detail'),
  },
  {
    path: '/cart',
    name: 'Cart',
    meta: {
      needLogin: true,
    },
    component: () => import('@/views/Cart'),
  },
  {
    path: '/user',
    name: 'User',
    meta: {
      needLogin: true,
    },
    component: () => import('@/views/User'),
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('@/views/Order'),
  },
  {
    path: '/orderdetail',
    name: 'OrderDetail',
    component: () => import('@/views/OrderDetail'),
  },
  {
    path: '/address',
    name: 'Address',
    component: () => import('@/views/Address'),
  },
  {
    path: '/changeuserinfo',
    name: 'ChangeUserInfo',
    component: () => import('@/views/do/ChangeUserInfo'),
  },
  {
    path: '/changeaddress',
    name: 'ChangeAddress',
    component: () => import('@/views/do/ChangeAddress'),
  },
  {
    path: '/addaddress',
    name: 'AddAddress',
    component: () => import('@/views/do/AddAddress'),
  },
];

const router = new VueRouter({
  routes,
});
//前置守卫
router.beforeEach((to, from, next) => {
  console.log(to); //到哪去
  console.log(from); //从哪来
  if (to.meta.needLogin) {
    if (sessionStorage.getItem('token')) {
      next();
    } else {
      next({
        name: 'Login',
      });
    }
  } else {
    next();
  }
});
router.afterEach((to, from) => {
  console.log(to); //到哪去
  console.log(from); //从哪来
  console.log('路由跳转之后执行');
});

export default router;
