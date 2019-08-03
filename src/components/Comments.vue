<template>
  <div class="box">
    <h3>发表评论</h3>
    <hr />
    <!-- 输入框 -->
    <van-cell-group>
      <van-field type="textarea" v-model="content" placeholder="请输入要BB的内容（做多吐槽120字）" style="resize:none;"/>
      <van-button type="info" @click="addCom">发表评论</van-button>
    </van-cell-group>
    <!-- 评论显示区域 -->
    <div v-for="(item,i) in commentList" :key="i">
      <p>
        <span>第{{i+1}}楼</span>
        <span>用户:{{item.user_name}}</span>
        <span>发布时间:{{item.add_time | format}}</span>
      </p>
      <div style="font-size: 14px;word-wrap:break-word;word-break:normal;">{{item.content}}</div>
    </div>
    <!-- 加载更多 -->
    <van-button plain hairline type="danger" @click="getMore">加载更多</van-button>
  </div>
</template>

<script>
export default {

  data () {
    return {
      content: '',
      commentList: [],
      pageindex: 1,
    }
  },

  methods: {
    // 获取请求数据(10条)
    async getCommentList() {
      const artid = this.$route.params.id
      const res = await this.$axios(`/api/getcomments/${artid}?pageindex=${this.pageindex}`)
      console.log(res);
      if(res.status != 0) {
        this.$toast('获取评论数据失败')
      }
      this.commentList = [...this.commentList, ...res.message]
    },
    // 加载更多
    getMore() {
      this.pageindex++
      this.getCommentList()
    },
    // 发表评论
    async addCom() {
      const artid = this.$route.params.id
      if(this.content.trim() == '') {
        return this.$toast('请填写评论内容')
      }
      const res = await this.$axios.post(`/api/postcomment/${artid}`,{content:this.content})
      console.log(res);
      if(res.status != 0) {
        this.$toast('提交评论失败')
      }
      this.$toast('提交评论成功') 
      // 提交成功后 由于数据是拼接形式 不能再调用函数 只能先在页面追加数据
      this.commentList.unshift({
        add_time: new Date(),
        content: this.content,
        user_name: '匿名用户'
      }) 
      this.content = ''
    }
  },

  created () {
    this.getCommentList()
  }
}
</script>

<style lang='less' scoped>
h3 {
  margin: 0;
  margin-bottom: 10px;
}
.van-field {
  width: 100%;
  height: 100px;
  border: 1px solid #ccc
}
.van-button {
  margin-top: 10px;
  width: 100%;
  height: 50px;
  border-radius: 5px;
}
p {
  background-color: #ccc;
  font-size: 13px;
  padding: 5px 0;
  span {
    display: inline-block;
    margin-right: 10px;
  }
}
</style>
