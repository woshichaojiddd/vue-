<template>
  <div class="box">
    <h4>{{photoInfoList.title}}</h4>
    <van-row class="time" type="flex" justify="space-between">
      <van-col span="18">发表时间:{{photoInfoList.add_time | format}}</van-col>
      <van-col span="6" style="text-align:right">点击:{{photoInfoList.click}}次</van-col>
    </van-row>
    <hr />
    <!-- 图片区域 -->
    <van-grid :border="false" :column-num="3">
      <van-grid-item v-for="item in photoList" :key="item.id">
          <van-image :src="item.src" @click="seePhoto()"/>
        </van-grid-item>
    </van-grid>
    <div class="content" v-html="photoInfoList.content"></div>
    <!-- 评论区 -->
    <router-view></router-view>
    <!-- 预览图片 -->
    <van-image-preview v-model="show" :images="images" @change="onChange">
      <template v-slot:index>第{{ index+1 }}页</template>
    </van-image-preview>
  </div>
</template>


<script>
import { ImagePreview } from 'vant';
export default {

  data () {
    return {
      show: false,
      index: 0,
      photoInfoList: '',
      photoList: [],
      images: [],
    }
  },

  methods: {
    // 请求数据
    async getInfoList() {
      const imgid = this.$route.params.id
      const res = await this.$axios.get(`/api/getimageInfo/${imgid}`)
      // console.log(res);
      this.photoInfoList = res.message[0]     
    },
    // 获取图片
    async getphotoList() {
      const imgid = this.$route.params.id
      const res = await this.$axios.get(`/api/getthumimages/${imgid}`)
      // console.log(res);
      this.photoList = res.message
      this.photoList.forEach(item=> {
        this.images.push(item.src)
      })       
    },
    // 预览图片
    seePhoto() { 
      this.show = true
      
    },
     onChange(index) {
      this.index = index;
    }
  },
  created () {
    this.getInfoList()
    this.getphotoList()
  },
  computed: {
    
  }
}
</script>

<style lang='less' scoped>
.box {
  padding: 5px;
  h4 {
    text-align: center;
    color: #26a2ff;
  }
  .time {
    font-size: 13px;
    color: #8f8f94;
  }
  .content {
    font-size:14px;
    line-height: 2;
  }
  .van-image {
    box-shadow: 0 0 4px;
  }
}
</style>
