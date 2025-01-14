<template>
    <view class="container">
        <z-paging ref="paging" :auto="false" v-model="dataList" @query="queryList" :defaultPageSize="10"
            :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')" empty-view-text="暂无数据~"
            :loading-more-enabled="false" :empty-view-img-style="{ width: '320rpx', height: '320rpx' }">
            <view slot="top">
                <bc-page-navbar :title="'通知人员设置'"></bc-page-navbar>
            </view>
            <view slot="bottom" style="background-color: #FFFFFF;">
                <!-- <view class="peoptips">
                    <view class="tipicon">
                        <u-image :src="getAssetsUrl('/zhihu/caller-tips.svg')" width="36rpx" height="36rpx"></u-image>
                    </view>
                    <text>提示：一个账号最多能绑定5个通知人员，请勿超过上限</text>
                </view> -->
                <view class="peopfot row i-center j-between">
                    <view class="peopback">
                        <u-button @click="goback" text="返回" color="#E3E3E3" plain shape="circle"
                            :customStyle="{ color: '#535353', height: '92rpx' }"></u-button>
                    </view>
                    <view class="peopbtn">
                        <u-button @click="linkCaller()" text="添加" color="#29C86F" shape="circle"
                            :customStyle="{ height: '92rpx' }"></u-button>
                    </view>
                </view>
                <u-safe-bottom></u-safe-bottom>
            </view>
            <view class="noticbox">
                <view class="peoption" v-for="(item, index) in dataList" :key="index">
                    <view class="row j-between">
                        <view class="peoplef">
                            <view class="peopmat">接警人：{{ item.name || '--' }}</view>
                            <view class="peopmat">接警人电话：{{ item.mobile || '--' }}</view>
                            <view class="peoptow row i-center">
                                <view class="peopmat">接受电话：{{ item.telNotify || '--' }}</view>
                                <view class="peopmat">接受短信：{{ item.smsNotify || '--' }}</view>
                            </view>
                            <view class="peopmat">绑定时间：{{ item.utcCreated || '--' }}</view>
                        </view>
                        <view class="peoprig">
                            <u-avatar :src="getAssetsUrl('/default/smart-caller.png')" size="116rpx"></u-avatar>
                        </view>
                    </view>
                    <view class="propfot row i-center j-between">
                        <view class="popfotlet row i-center j-between">更新时间：{{ item.utcModified || '--' }}</view>
                        <view class="popfotrig row i-center j-center" @click="linkCaller(item.id)">
                            <text>点击编辑</text>
                            <u-icon name="arrow-right-double" color="#ffffff" size="18"></u-icon>
                        </view>
                    </view>
                </view>
            </view>
        </z-paging>
    </view>
</template>

<script lang="ts" setup>
import { getAssetsPic } from "@/common/setPicture"
import { gotoCaller } from "@/routes/active-routes"
import { getCallerList } from "@/api/room-api"
import dayjs from "dayjs"
import { onShow } from "@dcloudio/uni-app"
import { ref, computed } from "vue"
const dataList: any = ref([])

const getAssetsUrl = computed(() => {
    return (str: any) => {
        return getAssetsPic(str)
    }
})
const paging = ref()
onShow(() => {
    paging.value.reload()
    queryList()
})
const queryList = () => {
    getCallerList().then((res:any) => {
        paging.value.complete(res.map(x => ({
            ...x,
            utcCreated: dayjs(x.utcCreated * 1000).format("YYYY-MM-DD HH:mm:ss"),
            utcModified: dayjs(x.utcModified * 1000).format("YYYY-MM-DD HH:mm:ss"),
            smsNotify: x.smsNotify === 1 ? '是' : '否',
            telNotify: x.telNotify === 1 ? '是' : '否'
        })))
    })
}
const goback = () => {
    uni.navigateBack()
}
// 跳转通知人员配置
const linkCaller = (id = '') => {
    gotoCaller(id)
}
</script>

<style lang="scss" scoped>
.noticbox {
    padding: 30rpx 20rpx;
}

.peoption {
    background: linear-gradient(270deg, #E3F2EE 0%, #F6FFFC 100%);
    box-shadow: 0rpx 8rpx 12rpx #CAE2D4;
    border-radius: 16rpx;
    overflow: hidden;
    padding: 40rpx 40rpx 0;
    position: relative;
    margin-bottom: 40rpx;

    &:last-child {
        margin-bottom: 0;
    }

    &::after {
        content: "";
        display: block;
        height: 72rpx;
        margin-top: 28rpx;
    }

    .peopmat {
        font-weight: 400;
        font-size: 28rpx;
        color: #666666;
        margin-bottom: 20rpx;
    }

    .peoptow {
        .peopmat:last-child {
            margin-left: 40rpx;
        }
    }


    .propfot {
        height: 72rpx;
        // background-color: #29C86F;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        font-weight: 400;
        font-size: 28rpx;
        color: #FFFFFF;
        overflow: hidden;

        &::after {
            content: "";
            position: absolute;
            width: 516rpx;
            top: 0;
            bottom: 0;
            left: 0;
            background-image: url("https://res.baochuncare.com/webapplet/zhihu/caller-bg1.png");
            background-size: cover;
            background-repeat: no-repeat;
            transform: translateX(-20rpx);
        }

        .popfotlet {
            padding-left: 40rpx;
            flex: 1;
            height: 72rpx;
            position: relative;
            z-index: 10;
        }

        .popfotrig {
            padding: 0 16rpx 0 48rpx;
            background-image: url("https://res.baochuncare.com/webapplet/zhihu/caller-bg2.png");
            background-size: cover;
            background-repeat: no-repeat;
            height: 72rpx;
            width: 224rpx;
            box-sizing: border-box;
        }
    }
}

.peoptips {
    position: fixed;
    left: 20rpx;
    right: 20rpx;
    bottom: 260rpx;
    background: #E5E7EB;
    border-radius: 16rpx;
    padding: 30rpx 42rpx;
    font-weight: 400;
    font-size: 28rpx;
    color: #616161;
    z-index: 100;

    .tipicon {
        margin-right: 12rpx;
        float: left;
    }
}

.peopfot {
    padding: 20rpx 30rpx;

    .peopback {
        width: 250rpx;
    }

    .peopbtn {
        width: 420rpx;
    }
}
</style>
