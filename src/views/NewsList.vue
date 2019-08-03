<template>
  <div class="box">
    <!-- 新闻列表 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">

    <van-list  route>
      <van-cell v-for="item in newList" :key="item.id" :to="'/home/newsinfo/' + item.id">
        <van-row gutter="10">
        <van-col span="4">
          <img :src="item.img_url" alt="">
        </van-col>
        <van-col span="20">
          <van-row style="white-space:nowrap;">
            <h4>{{item.title}}</h4>
          </van-row>
          <van-row type="flex" justify="space-between" style="font-size:10px;color:blue">
            <span>发布时间:{{item.add_time | format}}</span>
            <span>点击:{{item.click}}次</span>
          </van-row>
        </van-col>
      </van-row>
      </van-cell>
    </van-list>

    </van-pull-refresh>
  </div>
</template>

<script>
export default {

  data () {
    return {
      newList: [],
      loading: false,
      finished: false,
      isLoading: false
    }
  },

  methods: {
    // 请求数据
    async getNewList() {
      const res = await this.$axios.get('/api/getnewslist')
      // console.log(res);
      if(res.status != 0) {
        return this.$toast('服务器出错')
      }
      this.newList = res.message
    },
    
    // 下拉刷新
    onRefresh() {
        this.getNewList()
        this.$toast('刷新成功');
        this.isLoading = false;
        this.count++;
    }
  },

  created () {
    this.getNewList()
  }
}
</script>

<style lang='less' scoped>

.van-cell {
  img {
    height: 40px;
    width: 100%;
  }
  h4 {
    margin: 0;
  }
}
</style>
