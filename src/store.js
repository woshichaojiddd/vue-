import Vue from 'vue'
import Vuex from 'vuex'
import { stringify } from 'querystring';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        goods: JSON.parse(localStorage.getItem('goods')) || [],
        num: 0
    },
    mutations: {
        addGoods(state, info) {
            // 如果id值相同 则添加 不同则push
            if (state.goods.length == 0) {
                return state.goods.push(info)
            }
            const index = state.goods.findIndex(item => {
                return info.id == item.id
            })
            if (index != -1) {
                state.goods[index].num += info.num
            } else {
                state.goods.push(info)
            }
            // 存入本地
            localStorage.setItem('goods', JSON.stringify(state.goods))
        },
        // 修改数量
        changenum(state, nums) {
            const index = state.goods.findIndex(item => {
                return nums.id == item.id
            })
            if (index != -1) {
                state.goods[index].num = nums.num
            }
            // 存入本地
            localStorage.setItem('goods', JSON.stringify(state.goods))
        },
        // 修改状态
        changecheck(state, checks) {
            const index = state.goods.findIndex(item => {
                return checks.id == item.id
            })
            if (index != -1) {
                state.goods[index].checked = checks.checked
            }
            // 存入本地
            localStorage.setItem('goods', JSON.stringify(state.goods))
        },
        // 删除购物车商品
        del(state, id) {
            const index = state.goods.findIndex(item => {
                return id == item.id
            })
            if (index != -1) {
                state.goods.splice(index, 1)
            }
            // 存入本地
            localStorage.setItem('goods', JSON.stringify(state.goods))
        }
    },
    actions: {

    },
    getters: {
        getnum(state) {
            var nums = 0;
            state.goods.forEach(item => {
                if (item.checked == true) {
                    nums += item.num
                }
            })
            return nums
        },
        gettotal(state) {
            var total = 0;
            state.goods.forEach(item => {
                if (item.checked == true) {
                    total += item.num * item.sell_price
                }
            })
            return total
        }
    }
})