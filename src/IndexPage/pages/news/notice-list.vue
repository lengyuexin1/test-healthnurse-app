<template>
    <view class="notice-list">
        <z-paging ref="paging" v-model="data.dataList" @query="queryList" @onRefresh="getInitList"
                  :auto-show-back-to-top="true">
            <view class="list-box">
                <NoticeItem v-for="(item, index) in data.dataList" :key="index" :item="item"></NoticeItem>
            </view>
        </z-paging>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { onLoad } from "@dcloudio/uni-app"
import NoticeItem from './components/notice-item.vue'
import { dispatchWEvent, GlobalEvents } from '@/events/event-registry'
import { type MessageList, useNoticeList, SessionSDK } from '@bc/msg'
import { IMWEB_ENV } from "@/utils/handleEnv"

//============================
/** 基础参数 */
//============================
const limit = 10

interface Data {
    to: string
    dataList: any,
    sessionId: string
}

const data = reactive<Data>({
    to: '',
    dataList: [],
    sessionId: ''
})

const paging = ref(null) as any

let paper: any

const queryList = (pageNumber: number, pageSize: number) => {
    paper?.loadmore().then((res: any) => {
        console.log(res)
        paging.value.complete(res)
    })
}

const getInitList = () => {
    data.to = `${IMWEB_ENV()}41`
    paper = useNoticeList(data.to, limit, (res) => {
        console.log(res)
        paper.data.items.push(res)
    })
}

const resetSessionUnread = () => {
    SessionSDK.resetSessionUnread(`p2p-${data.to}`)
    dispatchWEvent(GlobalEvents.Refresh_Badge)
}

onLoad((options) => {
    data.to = options?.to
    uni.setNavigationBarTitle({ title: options?.name })

    getInitList()

    /** 延迟2s后标记已读 */
    setTimeout(() => {
        data.dataList.length && resetSessionUnread()
    }, 2000)
})

</script>

<style lang="scss" scoped>
.notice-list {
    width: 100%;
    height: 100%;
    background-color: #F1F2F6;
}

.tabs-box {
    width: 100%;
    border-bottom: solid 1rpx #F0F0F0;
}

.list-box {
    flex: 1;
    width: 100%;
    background-color: #F1F2F6;
}
</style>
