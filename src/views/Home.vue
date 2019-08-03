<template>
  <div class="box">
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in swipList" :key="item.id">
        <img :src="item.img" alt="">
      </van-swipe-item>
    </van-swipe>
    <!-- 列表 -->
    <van-grid :border="false" :column-num="3">
      <van-grid-item to="/home/newslist">
        <img src="../assets/images/menu1.png" alt="">
        <p>新闻资讯</p>
      </van-grid-item>
      <van-grid-item to="/home/photolist">
        <img src="../assets/images/menu2.png" alt="">
        <p>图片分享</p>
      </van-grid-item>
      <van-grid-item to="/home/goodslist">
        <img src="../assets/images/menu3.png" alt="">
        <p>商品购买</p>
      </van-grid-item>
      <van-grid-item>
        <img src="../assets/images/menu4.png" alt="">
        <p>留言反馈</p>
      </van-grid-item>
      <van-grid-item>
        <img src="../assets/images/menu5.png" alt="">
        <p>视频专区</p>
      </van-grid-item>
      <van-grid-item>
        <img src="../assets/images/menu6.png" alt="">
        <p>联系我们</p>
      </van-grid-item>
    </van-grid>
      
  </div>
</template>

<script>
export default {

  data () {
    return {
      swipList: []
    }
  },

  methods: {
    // 发送请求接收轮播图数据
    async getSwipList() {
      const res = await this.$axios.get('/api/getlunbo')
      // console.log(res);
      if(res.status != 0 ) {
        this.$toast('服务器出错')
      }
      this.swipList = res.message
      console.log(this.swipList);         
    }
  },

  created () {
    this.getSwipList()
  }
}
</script>

<style lang='less' scoped>
.van-swipe {
  // vw 自适应高度 宽的百分比
    height: 45vw;
    img {
      width: 100%;
      height: 100%;
    }
}
.van-grid-item {
  width: 33.3333333%;
  img {
    width: 60px;
  }
}
</style>
