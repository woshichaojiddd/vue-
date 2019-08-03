<template>
  <div class="box">
    <van-grid :border="false" :column-num="2">
      <van-grid-item v-for="item in goodList" :key="item.id">
        <div class="info" @click="next(item.id)">
          <img :src="item.img_url" />
          <h5>{{item.title}}</h5>
          <div class="price">
            <p>
              <span style="font-size:14px;color:red;margin-right:10px">￥{{item.market_price}}</span>
              <span style="font-size:12px;text-decoration:line-through">￥{{item.sell_price}}</span>
            </p>
            <van-row type="flex" justify="space-between">
              <van-col span="12">热卖中</van-col>
              <van-col span="12" style="text-align:right;">剩余{{item.stock_quantity}}件</van-col>
            </van-row>
          </div>
        </div>
      </van-grid-item>
    </van-grid>
    <van-button type="danger" @click="getMore">加载更多</van-button>
  </div>
</template>

<script>
export default {

  data () {
    return {
      pageindex: 1,
      goodList: []
    }
  },

  methods: {
    // 请求数据
    async getGoodList() {
      const res = await this.$axios.get(`/api/getgoods?pageindex=${this.pageindex}`)
      console.log(res);
      if(res.status != 0 ) {
        this.$toast('服务器出错')
      }
      this.goodList = [...this.goodList,...res.message]
    },
    // 加载更多
    getMore() {
      this.pageindex++
      this.getGoodList()
    },
    next(id) {
      this.$router.push(`/home/goodsinfo/${id}`)
    }
  },

  created () {
    this.getGoodList()
  }
}
</script>

<style lang='less' scoped>
.box {
  padding: 5px;
}
.info {
  position: relative;
  border: 1px solid #ccc;
  box-shadow: 0 0 8px #ccc;
  box-sizing: border-box;
  height: 78vw;
  img {
    width: 100%;
  }
  h5 {
    margin: 0;
    padding: 5px 0;
  }
  .price {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 16vw;
    background-color: #eee;
    font-size: 13px;
    color:#8f8f94;
    padding: 10px;
    box-sizing: border-box;
    p {
      margin: 0 0 5px;
    }
    .left {
      position: absolute;
      right: 0;
      
    }
  }
}
.van-button {
  width: 100%;

}

</style>
