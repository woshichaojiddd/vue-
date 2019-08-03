<template>
  <div>
    <!-- 头部 -->
    <div class="header_box">
      <!-- 返回功能 -->
      <div class="goBack" @click="back" :style="$route.path=='/home'?'display:none':'display:block'">
        <van-icon name="arrow-left" />返回
      </div>
      vue移动端项目</div>
    <!-- 路由占位符 -->
    <router-view></router-view>
    <!-- 底部导航 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="coupon-o" to="/home">
        <i slot="icon" class="iconfont icon-index-fill"></i>
        <span>首页</span>
        </van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/member">
        <i slot="icon" class="iconfont icon-icon_zhanghao"></i>
        <span>会员</span>
      </van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/shopcar" :info="getnum">购物车</van-tabbar-item>
      <van-tabbar-item icon="search" to="/search">搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {

  data () {
    return {
      active: 0,
    }
  },

  methods: {
    back() {
      this.$router.go(-1)
    }
  },

  created () {

  },
  computed: {
    ...mapState(['goods']),
    ...mapGetters(['getnum'])
  }
}
</script>

<style lang='less' scoped>
.header_box {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 50px;
  background-color: #1989fa;
  text-align: center;
  line-height: 50px;
  color: #fff;
  font-size: 14px;
  .goBack {
    position: absolute;
    top:-1px;
    left:10px;
  }
  .van-icon {
    vertical-align: middle;
    margin-right: 3px;
  }
}
</style>
