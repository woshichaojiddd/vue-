<template>
  <div class="box">
    <van-tabs @click="getPhotoList($event)" type="line" :border="false" router>
      <van-tab v-for="item in cateList" :title="item.title" :key="item.id" :name="item.id">
        <!-- 内容区域 -->
        <div class="container" v-for="item in  photoList" :key="item.id" >
          <div class="photo" @click="next(item.id)">
            <img :src="item.img_url" v-lazy="item.img_url">
            <div class="content">
              <h4>{{item.title}}</h4>
              <span>{{item.zhaiyao}}</span>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {

  data () {
    return {
      photoList: [],
      // 分类
      cateList: [],
      id: 0,
    }
  },

  methods: {
    // 获取数据
    async getPhotoList(e) {
      this.id = e?e:0
      const res = await this.$axios.get(`/api/getimages/${this.id}`)
      console.log(res);
      if(res.status != 0) {
        this.$toast('服务器出错')
      }
      this.photoList = res.message
    },
    // 获取分类数据
    async getCate() {
      const res = await this.$axios.get('/api/getimgcategory')
      // console.log(res);
      const list = res.message
      list.unshift({
        id: 0,
        title: "全部"
      })
      this.cateList = list
      // console.log(this.cateList);
    },
    // 点击跳转页面
    next(id) {
      this.$router.push(`/home/photoinfo/${id}`)
    }

  },

  created () {
    this.getCate()
    this.getPhotoList()
  }
}
</script>

<style lang='less' scoped>
.box {
  padding: 5px 10px;
}
.container {
  margin-top: 10px;
  .photo {
    position: relative;
    box-shadow: 0 0 4px;
    img {
      width: 100%;
      display: block;
    }
    .content {
      background-color: rgba(0,0,0,.5);
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      box-sizing: border-box;
      padding-left: 5px;
      padding-bottom: 10px;
      color: #fff;
      font-size: 12px;
      overflow: hidden;
      h4 {
        margin: 5px 0;

      }
    }
  }
  
 
}
</style>
