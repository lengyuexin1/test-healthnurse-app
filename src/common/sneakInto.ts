/* vue混入 */
// import { jumpOrder } from '@/common/sneakInfo.js';		mixins:[jumpOrder],

import { reactive } from 'vue'
import { onLoad, onReachBottom } from '@dcloudio/uni-app'

interface Data {
    listName: string,
    getUrl: string,
    dalist: any[],
    params: any,
    loaded: boolean,
    nomore: string,
    empshow: boolean,
    autoLoad: boolean,
    ambient: string,

    [key: string]: any
}

/**
 * 分页 */
export const pagination = () => {
    const data = reactive<Data>({
        listName: "data",
        getUrl: "", // 需要分页的接口地址
        dalist: [], //数据列表
        params: {
            //请求参数
            size: 12,
            page: 1
        },
        loaded: false,
        nomore: "loading",
        empshow: false,
        autoLoad: true, //自动请求
        ambient: "local"
    })


    onLoad(() => {
        if (data.autoLoad) {
            getListInit()
        }
    })

    onReachBottom(() => {
        loadMore()
    })

    // 初始化加载
    const getListInit = () => {
        data.dalist = []
        data.nomore = "loading"
        data.params.page = 1
        getList()
    }

    // 加载接口

    const getList = async () => {
        if (data.getUrl === "") {
            return
        }
        data.loaded = false
        try {
            const res = []
            data.loaded = true
            getListResult(res[data.listName])
        } catch (e) {
            //TODO handle the exception
        }
    }

    // 规则判断
    const getListResult = (items) => {
        console.log(items)
        const arr = items.list ? items.list : items
        console.log(arr)
        if (arr.length <= 0) {
            data.nomore = "nomore"
            if (data.params.page == 1) {
                data.empshow = true
            }
            return false
        }
        else {
            data.empshow = false
            if (arr.length < data.params.size) {
                data.nomore = "nomore"
            }
        }
        data.dalist = [...data.dalist, ...arr]
    }

    // 上拉加载
    const loadMore = () => {
        if (data.nomore == "nomore") {
            return
        }
        data.params.page++
        data.getList()
    }
    return {
        PaginationData: data,
        getListInit,
        getListResult,
        loadMore
    }
}
