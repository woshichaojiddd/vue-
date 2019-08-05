<template>
  <div class="box">
    <!-- 搜索框 -->
    <van-row type="flex" justify="space-between">
      <van-col span="20" style="position: relative;">
        <input type="text" v-model="keyword" placeholder="请输入搜索关键字" v-focus @keyup.enter="showPro">
        <van-icon class="sou" name="search" />
      </van-col>
      <van-col span="4" style="line-height:50px;font-size:14px;text-align:center;">
        <span  @click="hidePro">取消</span>
      </van-col>
    </van-row>
    <!-- 搜索历史 -->
    <div class="history" v-show="hishow" >
      <van-row type="flex" justify="space-around">
        <van-col span="20">搜索历史</van-col>
        <van-col span="4" style="text-align:center;">
          <div @click='delKey'><van-icon name="delete" /></div>
        </van-col>
      </van-row>
      <div class="tag">
        <van-tag size="medium" v-for="(item,i) in historyList" :key="i">{{item}}</van-tag>
      </div>
      <p v-show="dershow"><van-divider>暂无搜索历史</van-divider></p>
    </div>
    
    <!-- 品牌数据列表 -->
    <div class="hiscon" v-show="proshow">
      <van-row type="flex" justify="space-between" v-for="item in prodList" :key="item.id" >
        <van-col span="12">{{item.name}}</van-col>
        <van-col span="12" style="text-align:right;color:#aaa">{{item.ctime | format}}</van-col>
      </van-row>
    </div>
  </div>
</template>

<script>

export default {

  data () {
    return {
      keyword: '',
      prodList: '',
      // 品牌数据列表的显示与隐藏
      proshow: false,
      hishow: true,
      dershow: false,
      historyList: JSON.parse(localStorage.getItem('keyword')) || []
    }
  },

  methods: {
    // 请求品牌数据列表
    async getHistory() {
      const res = await this.$axios.get('/api/getprodlist')
      // console.log(res);
      if(res.status != 0) {
        this.$toast('服务器出错')
      }
      this.prodList = res.message
      console.log(this.prodList);      
    },
    // 点击enter显示品牌数据 同时保存关键词到本地
    showPro() {
      if(this.keyword.trim() == '') {
        return this.$toast('请输入搜索内容')
      }
      this.hishow = false;
      this.proshow = true;
      // 如果关键字不重复 则保存到本地
      const index = this.historyList.findIndex(item=>{
        return item == this.keyword
      })
      if(index != -1) {
        this.historyList.splice(index,1)
        this.historyList.unshift(this.keyword)
      } else {
        this.historyList.unshift(this.keyword)
      }
      localStorage.setItem('keyword',JSON.stringify(this.historyList))
    },
    // 点击取消隐藏品牌数据
    hidePro() {
      this.proshow = false;
      this.hishow = true;
      this.keyword = ''
      this.dershow = this.historyList.length ==0?true:false
    },
    // 删除关键字
    delKey() {
      localStorage.removeItem('keyword')
      this.historyList = []
      this.dershow = true
    }
  },

  created () {
    this.getHistory()
  }
}
</script>

<style lang='less' scoped>
.box {
  padding: 5px;
}
input {
  background-color: #eee;
  padding: 0 5px 0 25px;
  box-sizing: border-box;
  margin: 10px 0;
  height: 30px;
  width: 100%;
  line-height: 30px;
  border: none;
  font-size: 14px;
}
.sou {
  position: absolute;
  top: 18px;
  left: 5px;
}
.history {
  margin-top: 10px;
  padding-left: 5px;
  .tag {
    margin: 15px 5px 0;
    .van-tag {
      margin-left: 10px;
    }
  }
}
.hiscon {
  padding:0  5px;
  .van-row {
    margin: 15px 0;
    font-size: 14px;
    
  }
}
</style>
