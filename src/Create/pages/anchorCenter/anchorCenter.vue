<template>
    <z-paging 
        ref="paging"
        :auto="false"
        :fixed="true"
        @query="queryList"
        :defaultPageSize="10"
        :hide-empty-view="true"
        :auto-show-system-loading="true"
        :loading-more-enabled="false"
        >
        <view class="wrap">
            <view class="box">
                <view class="top info tn-flex-row">
                    <image class="avatar" :src="data.userInfo.avatar" mode="scaleToFill" />
                    <view class="userInfo">
                        <view class="name">{{ data.userInfo.nickname }}</view>
                        <view class="desc">欢迎来到主播中心</view>
                    </view>
                </view>
                <view class="bottom tab">
                    <view class="tn-flex-center-between">
                        <view class="tn-flex-row">
                            <view :class="['tab-item tn-flex-center-center', data.tabsActive == index ? 'active' : '']" v-for="(item, index) in data.tabs" :key="index" @tap="clickTabs(index)">
                                {{ item.name }}
                            </view>
                        </view>
                        <view class="tn-flex-center-center" @tap="clickDataCenter" v-if="data.liveInfoData?.id">
                            <view class="nextName">数据中心</view>
                            <TnIcon name="right" color="#666666"/>
                        </view>
                    </view>
                    <view class="liveData_wrap tn-flex-row">
                        <view class="liveData tn-flex-column" v-for="(item, index) in data.liveData" :key="index">
                            <view>{{ item.name }}</view>
                            <view class="num_wrap">
                                <TnCountScroll :value="item.num" :duration="500" />
                                <text class="num">{{ item.unit }}</text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>

            <view class="box">
                <view class="title">直播工具</view>
                <view class="tools_wrap tn-flex-row">
                    <view class="item tn-flex-column" v-for="(item, index) in data.tools" :key="index" @tap="clickTools(index)">
                        <image class="icon" :src="getAssetsUrl(item.img)" mode="scaleToFill" />
                        <view class="icon_name">{{ item.name }}</view>
                    </view>
                </view>
            </view>

            <!-- #ifdef APP-PLUS -->
            <view class="btn-wrap">
                <TnButton width="100%" height="80rpx" font-size="28rpx" shape="round" bg-color="#EA3E1A" text-color="#FFFFFF" :debounce="true" @tap="clickBtn">
                    去开播
                </TnButton>
            </view>
            <!-- #endif -->
        </view>
    </z-paging>
    <BCNotify ref="bcNotify"></BCNotify>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnCountScroll from '@tuniao/tnui-vue3-uniapp/components/count-scroll/src/count-scroll.vue'
import { getAssetsPic } from '@/common/setPicture'
import BCNotify from '@/components/notify/index.vue'
import { gotoCreateLive } from '@/routes/create-routes'
import { gotoDataCenter, gotoLiveSetting, gotoMyAudience } from '@/routes/user-routes'
import { PlatformManage } from '@bc/sys'
import { liveInfo, liveStat } from '@/api/live-api'
import dayjs from "dayjs"

interface Data {
    nowTime: number,
    userInfo: any
    liveInfoData: any
    tabs: any
    tabsActive: number
    tools: any
    liveData: any
}

const data = reactive<Data>({
    nowTime: 0,
    userInfo: {},
    liveInfoData: {},
    tabs: [
        { id: 0, name: '今日' },
        { id: 1, name: '近7日' },
        { id: 2, name: '近30日' }
    ],
    tabsActive: 0,
    tools: [
        { id: 0, name: '我的观众', img: '/leyou/icon/live-audience.png' },
        { id: 1, name: '直播设置', img: '/leyou/icon/live-setting.png' },
        // { id: 2, name: '合约中心', img: '/leyou/icon/live-contract.png' }
    ],
    liveData: [
        { id: 0, name: '观众人数', num: 0, unit: '人' },
        { id: 1, name: '新增粉丝', num: 0, unit: '人' },
        { id: 2, name: '开播时长', num: 0, unit: '分钟' }
    ]
})

const bcNotify = ref()

const paging = ref()

const getAssetsUrl = computed(()=>(src: string)=> {
    return getAssetsPic(src)
})

const queryList = () => {
    clickTabs(data.tabsActive)
    paging.value.complete([])
}

const clickTabs = (index: number) => {
    data.tabsActive = index

    if (index == 0) {
        getLiveStat(data.nowTime, data.nowTime)
    }
    else if (index == 1) {
        const now = dayjs()
        // 获取7天前的时间 
        const sevenDaysAgo = now.subtract(7, 'day')
        // 获取7天前的时间戳（毫秒）  
        const sevenTimestamp = Math.floor(sevenDaysAgo.valueOf() / 1000)
        getLiveStat(sevenTimestamp, data.nowTime)
    }
    else if (index == 2) {
        const now = dayjs()
        // 获取30天前的时间 
        const thirtyDaysAgo = now.subtract(30, 'day')
        // 获取30天前的时间戳（毫秒）  
        const thirtyTimestamp = Math.floor(thirtyDaysAgo.valueOf() / 1000)
        getLiveStat(thirtyTimestamp, data.nowTime)
    }
}

const clickBtn = () => {
    gotoCreateLive()
}

const clickDataCenter = () => {
    gotoDataCenter()
}

const clickTools = (index: number) => {
    index == 0 && gotoMyAudience()
    index == 1 && gotoLiveSetting()
}

const getLiveStat = (startTime: number, endTime: number) => {
    if (data.liveInfoData?.id) {
        liveStat({
            channelId: data.liveInfoData.id,
            startTime,
            endTime
        }).then((res: any) => {
            data.liveData[0].num = res?.totalUsers ?? 0
            data.liveData[1].num = res?.totalFans ?? 0
            data.liveData[2].num = res?.totalLiveDuration ?? 0
        }).catch((err) => {
            bcNotify.value.error(err.message)
        })
    }
}

onMounted(() => {
    data.nowTime = Math.floor(dayjs().valueOf() / 1000)

    PlatformManage.getToken().then((token) => {
        data.userInfo = token
    })
    
    liveInfo().then((info: any) => {
        data.liveInfoData = info

        getLiveStat(data.nowTime, data.nowTime)
    }).catch((err) => {
        bcNotify.value.error(err.message)
    })
})

</script>

<style lang="scss" scoped>
.wrap {
    padding: 30rpx;
}

.box {
    padding: 30rpx;
    background-color: #FFFFFF;
    border-radius: 24rpx;
    margin-bottom: 30rpx;

    .top {
        padding-bottom: 30rpx;
    }

    .avatar {
        width: 96rpx;
        height: 96rpx;
        border-radius: 50%;
    }

    .icon {
        width: 92rpx;
        height: 92rpx;
    }
}

.title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333333;
}

.info {
    align-items: center;
    border-bottom: solid 1rpx #E5E5E5;
}

.userInfo {
    margin-left: 24rpx;

    .name {
        font-size: 36rpx;
        font-weight: bold;
        color: #202020;
    }

    .desc {
        margin-top: 8rpx;
        font-size: 24rpx;
        color: #999999;
    }
}

.tab {
    margin-top: 30rpx;
}

.tab-item {
    width: 104rpx;
    height: 52rpx;
    margin-right: 40rpx;
    font-size: 28rpx;
    color: #666666;
    border-radius: 12rpx 12rpx 12rpx 12rpx;
}

.active {
    color: #333333;
    font-weight: bold;
    background: #F0F0F0;
}

.tools_wrap {
    margin-top: 40rpx;

    .item {
        width: 25%;
        align-items: center;
        justify-content: center;
    }

    .icon_name {
        margin-top: 20rpx;
        font-size: 24rpx;
        color: #202020;
    }
}

.liveData_wrap {
    margin-top: 40rpx;

    .liveData {
        width: 190rpx;
        font-size: 24rpx;
        color: #333333;

        .num_wrap {
            margin-top: 10rpx;
            font-size: 32rpx;
            font-weight: bold;

            .num {
                padding-left: 5rpx;
                font-size: 20rpx;
                font-weight: 400;
                color: #666666;
            }
        }
    }
}

.nextName {
    font-size: 24rpx;
    color: #666666;
}

.btn-wrap {
    margin-top: 40rpx;
}

</style>
