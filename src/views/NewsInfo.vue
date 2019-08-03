<template>
  <div class="box">
    <div class="details" v-for="item in newList" :key="item.id">
      <h5>{{item.title}}</h5>
      <van-row type="flex" justify="space-between" style="font-size:12px;color:blue;margin:10px 0">
        <van-col span="12">发表时间: {{item.add_time | format}}</van-col>
        <van-col span="12" style="text-align:right">点击: {{item.click}}次</van-col>
      </van-row>
      <hr />
      <div v-html="item.content" style="font-size:14px"></div>
      <!-- 评论区 -->
    <router-view></router-view>
    </div>  
  </div>
</template>

<script>
export default {

  data () {
    return {
      newList: []
    }
  },

  methods: {
    // 获取文章详情内容
    async getNewList() {
      const newid = this.$route.params.id
      console.log(newid);
      const res = await this.$axios.get(`/api/getnew/${newid}`)
      console.log(res);
      if(res.status != 0) {
        this.$toast('服务器出错')
      }
      this.newList = res.message      
    }
  },

  created () {
    this.getNewList()
  }
}
</script>

<style lang='less' scoped>
.details {
  padding: 1px 5px;
  h5 {
    margin: 15px 0;
    text-align: center;
  }
}

</style>
