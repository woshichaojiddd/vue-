<template>
  <div class="box">
    <h1>{{descList.title}}</h1>
    <div class="content" v-html="descList.content"></div>
  </div>
</template>

<script>
export default {

  data () {
    return {
      descList: ''
    }
  },

  methods: {
    // 获取数据
    async getDesc() {
      const res = await this.$axios.get(`/api/goods/getdesc/${this.getId}`)
      console.log(res);
      this.descList = res.message[0]
    }

  },

  created () {
    this.getDesc()
  },
  computed: {
    getId() {
      return this.$route.params.id
    },
  }
}
</script>

<style lang='less' scoped>
.box {
    padding: 5px;
    h1 {
      font-size: 16px;
      text-align: center;
      color: #226aff;
      padding: 15px 0;
      margin: 0;
      border-bottom: 1px solid #aaa;
    }
    .content {
      width: 100%;
      font-size: 14px;
      
      
    }
}
</style>
