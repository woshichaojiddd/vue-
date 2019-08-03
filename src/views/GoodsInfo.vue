<template>
  <div class="box">
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in getimagesList" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
    <!-- 商品详情 -->
    <div class="details">
      <h1>{{goodsList.title}}</h1>
      <div style="padding:10px">
        <p class="price">
        市场价: <span style="margin-right:10px; text-decoration:line-through">￥{{goodsList.market_price}}</span>
        销售价: <span style="color:red;font-weight:700;">￥{{goodsList.sell_price}}</span>
        </p>
        <p class="num">
        购买数量:<van-stepper  v-model="num" min="1" :max="goodsList.stock_quantity" />
        </p>
        <van-button type="info" style="margin-right:10px">立即购买</van-button>
        <van-button type="danger" @click='addCar(goodsList.id,goodsList.title,goodsList.sell_price)'>加入购物车</van-button>
      </div>
    </div>
    <!-- 商品参数 -->
    <div class="param">
      <div style="border-bottom: 1px solid #eee;">
        <h1 style="">商品参数</h1>
        <div style="padding:0 10px">
          <p>商品货号: {{goodsList.goods_no}}</p>
          <p>库存情况: {{goodsList.stock_quantity}}</p>
          <p>上架时间: {{goodsList.add_time | format}}</p>
        </div>
      </div>
      <div style="text-align: center;">
        <van-button class="intro" plain type="info" size="large" @click="goDesc(goodsList.id)">图文介绍</van-button>
        <van-button class="comment" plain type="danger" size="large" @click="goComment(goodsList.id)">商品评论</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      photosList: [],
      imagesList: [],
      goodsList: '',
      id: '',
      // 购买数量
      num: 1,
    }
  },

  methods: {
    // 获取轮播图 /api/getthumimages/:imgid
    async getPhotoList() {     
      const res = await this.$axios.get(`/api/getthumimages/${this.getId}`)
      // console.log(res);
      this.photosList = res.message
    },
    // 获取商品参数区和价格标题  /api/goods/getinfo/:id
    async getGoodsList() {
      const res = await this.$axios.get(`/api/goods/getinfo/${this.getId}`)
      console.log(res);
      this.goodsList = res.message[0]  
    },
    // 跳转到图片介绍
    goDesc(id) {
      this.$router.push(`/home/goodsdesc/${id}`)
    },
    // 跳转到评论页
    goComment(id) {
      this.$router.push(`/home/goodscomment/${id}`)
    },
    ...mapMutations(['addGoods']),
    // 加入购物车 存储商品id和数量
    addCar(id,title,price) {
      // console.log(this.num);
      // console.log(id);
      const info = {
        id: id,
        num: this.num,
        checked: true,
        title: title,
        sell_price: price,
        thumb_path: this.imagesList[0]
      };
      this.addGoods(info)

    }
    
  },

  created () {
    this.getPhotoList()
    this.getGoodsList()
  },
  computed: {
    getId() {
      return this.$route.params.id
    },
    getimagesList() {
        this.photosList.forEach(item=> {
          this.imagesList.push(item.src)
        })
        return this.imagesList
      }
    },
    
}
</script>

<style lang='less' scoped>
.box {
  padding: 10px;
  background-color: #eee;
  .van-swipe {
    width: 100%;
    height: 55vw;
    text-align: center;
    box-shadow: 0 0 10px #aaa;
    padding: 10px 0;
    background: #fff;
    border-radius: 5px;
    img {
      width: 50%;
      height: 100%;
    }
  }
  .details,
  .param {
    background: #fff;
    border-radius: 5px;
    padding: 5px 0;
    margin-top:10px;
    box-shadow: 0 0 10px #aaa;
    font-size: 14px;
    color: #8f8f94;
  }
  h1 {
    font-size: 17px;
    font-weight: normal;
    margin: 0;
    padding : 10px;
    border-bottom: 1px solid #eee;
    color: #000;
  }
  .van-stepper {
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;
  }
  .van-button {
    border-radius: 5px;
  }
  .intro,
  .comment {
    margin: 10px;
    width: 93%;
    font-size: 18px;
  }

  
}
</style>
