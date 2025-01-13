<template>
    <view class="wrap">
        <view class="title">今日直播数据</view>
        
        <view class="tn-flex-row tn-flex-wrap">
            <view class="item" v-for="(item, index) in data.tabsData" :key="index">
                <view class="name">{{ item.name }}</view>
                <view class="num">
                    <TnCountScroll :value="item.num" :duration="500" />
                </view>
            </view>
        </view>
        
        <BCNotify ref="bcNotify"></BCNotify>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import BCNotify from '@/components/notify/index.vue'
import TnCountScroll from '@tuniao/tnui-vue3-uniapp/components/count-scroll/src/count-scroll.vue'
import { liveStat } from '@/api/live-api'
import dayjs from "dayjs"

interface Props {
    /** 直播间信息 */
    liveInfo: any
}

interface Data {
    tabsData: any
}

const data = reactive<Data>({
    tabsData: [
        { name: '新增粉丝', num: 0 },
        { name: '观众人数', num: 0 },
        { name: '评论人数', num: 0 },
        { name: '点赞次数', num: 0 }
    ]
})

const props = defineProps<Props>()

const bcNotify = ref()

onMounted(() => {
    const nowTime = Math.floor(dayjs().valueOf() / 1000)

    liveStat({
        channelId: props.liveInfo.id,
        startTime: nowTime,
        endTime: nowTime
    }).then((res: any) => {
        data.tabsData[0].num = res?.totalFans ?? 0
        data.tabsData[1].num = res?.totalUsers ?? 0
        data.tabsData[2].num = res?.totalComments ?? 0
        data.tabsData[3].num = res?.totalLikes ?? 0
    }).catch((err) => {
        bcNotify.value.error(err.message)
    })
})

</script>

<style lang="scss" scoped>
.wrap {
    margin: 30rpx;
    padding: 30rpx;
    background-color: #FFFFFF;
    border-radius: 16rpx;
}

.title {
    font-size: 30rpx;
    font-weight: bold;
    color: #333333;
}

.item {
    width: 33.33%;
    margin-top: 45rpx;

    .name {
        font-size: 28rpx;
        color: #666666;
    }
    
    .num {
        margin-top: 15rpx;
        font-size: 28rpx;
        font-weight: bold;
        color: #333333;
    }
}
</style>
