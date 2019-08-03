<template>
  <div class="box">
    <!-- 商品栏 -->
    <van-row v-for="item in goods" :key="item.id">
      <van-col span="5">
        <van-switch v-model="item.checked" active-color="#07c160" inactive-color="#f44" @change="changeCheck(item.id,item.checked)"/>
      </van-col>
      <van-col span="19">
        <van-card num="num" :price="item.sell_price" :title="item.title" :thumb="item.thumb_path">
          <template slot="num">
            <van-stepper v-model="item.num" min="1" @change="changeNum(item.id,item.num)"/>
          </template>
          <div slot="footer">
            <van-button size="mini" @click="dele(item.id)">删除</van-button>
          </div>
        </van-card>
      </van-col>
    </van-row>
    <!-- 提交订单 -->
    <div class="submit">
      <p>总计(不含运费)</p>
      <p>已勾选商品 <span style="color:red">{{getnum}}</span> 件,总价 <span style="color:red">￥{{gettotal}}</span></p>
      <van-button class="count" type="danger">去结算</van-button>
    </div>
    
  </div>
</template>

<script>
import { mapState,mapGetters,mapMutations } from 'vuex'
export default {

  data () {
    return {
      checked: true,
      value: '',
      total: 0
    }
  },

  methods: {
    ...mapMutations(['changenum','changecheck','del']),
    // 改变数值
    changeNum(id,num) {
      const nums = {
      id,
      num
    }
      this.changenum(nums)
    },
    // 改变状态
    changeCheck(id,checked) {
      const checks = {
        id,
        checked
      } 
      this.changecheck(checks)  
    },
    // 删除商品
    dele(id) {  
      this.del(id)
    }
  },

  created () {
    console.log(this.goods);
    
  },
  computed: {
    ...mapGetters(['getnum','gettotal']),
    // 获取商品数据
    ...mapState(['goods']),
    

  }
}
</script>

<style lang='less' scoped>
.box {
  padding: 10px;
  background-color: #eee;
  .van-row {
    position: relative;
    background-color: #fff;
    margin-bottom: 10px;
    box-shadow: 0 0 10px #ccc;
    border-radius: 5px;
    overflow: hidden;
    .van-switch {
      position: absolute;
      top:50%;
      left: 5px;
      transform: translate(0,-50%)
    }
    .van-card__title {
    margin-bottom: 10px;
    }
  }
  .submit {
    background-color: #fff;
    margin-bottom: 10px;
    box-shadow: 0 0 10px #ccc;
    border-radius: 5px;
  }
  .submit {
    position: relative;
    padding: 20px 10px;
    font-size: 14px;
    color: #8f8f94;
    .count {
      position: absolute;
      top:50%;
      right: 15px;
      transform: translate(0,-50%);
      border-radius: 5px;
    }
  }
  
  
}
</style>
