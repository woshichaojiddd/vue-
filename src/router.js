import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NewsList from './views/NewsList.vue'
import NewsInfo from './views/NewsInfo.vue'
import Comments from './components/Comments.vue'
import Photolist from './views/Photolist.vue'
import PhotoInfo from './views/PhotoInfo.vue'
import GoodList from './views/GoodList.vue'
import GoodsInfo from './views/GoodsInfo.vue'
import GoodsDesc from './views/GoodsDesc.vue'
import Shopcar from './views/Shopcar.vue'
import Search from './views/Search.vue'



Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        redirect: '/home'
    }, {
        path: '/home',
        component: Home
    }, {
        path: '/home/newslist',
        component: NewsList
    }, {
        path: '/home/newsinfo/:id',
        component: NewsInfo,
        children: [{
            path: '/home/newsinfo/:id',
            component: Comments
        }]
    }, {
        path: '/home/photolist',
        component: Photolist
    }, {
        path: '/home/photoinfo/:id',
        component: PhotoInfo,
        children: [{
            path: '/home/photoinfo/:id',
            component: Comments
        }]
    }, {
        path: '/home/goodslist',
        component: GoodList
    }, {
        path: '/home/goodsinfo/:id',
        component: GoodsInfo
    }, {
        path: '/home/goodsdesc/:id',
        component: GoodsDesc
    }, {
        path: '/home/goodscomment/:id',
        component: Comments
    }, {
        path: '/shopcar',
        component: Shopcar
    }, {
        path: '/search',
        component: Search
    }]
})