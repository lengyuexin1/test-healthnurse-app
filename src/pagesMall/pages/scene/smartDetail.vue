<template>
    <view class="container">
        <z-paging ref="paging" :auto="false" :refresher-enabled="false" :loading-more-enabled="false">
            <template #top>
                <bc-page-navbar title="智慧场景详情"></bc-page-navbar>
            </template>
            <template #bottom>
                <view class="smartfot">
                    <view class="smartbtn">
                        <TnButton @click="gotoSession" text-color="#FFFFFF" bg-color="#29C86F"
                            :customStyle="{ height: '90rpx', width: '100%', borderRadius: '50rpx' }">联系客服</TnButton>
                    </view>
                    <!-- <u-safe-bottom></u-safe-bottom> -->
                </view>
            </template>

            <view class="smartimg">
                <!-- <u-image :src="mation.thumb" width="750rpx" height="440rpx"></u-image> -->
                <TnSwiper :data="data.mation.mainImages" height="440rpx" indicator indicatorMode="dot"
                    @click="$preview">
                    <template #default="{ data }">
                        <view class="swiper-data">
                            <image style="width: 750rpx;height: 440rpx;" :src="data" mode="aspectFill" />
                        </view>
                    </template>
                </TnSwiper>
            </view>
            <view class="smartit">{{ data.mation.name }}</view>

            <view class="smartip">
                <!-- <view class="smartsu row i-center">{{mation.desc}}</view> -->
                <view class="smartdsc">{{ data.mation.desc }}</view>
            </view>

            <view class="smartfix row" @click="data.goodShow = true">
                <view class="fixbox row">
                    <image style="width: 44rpx;height: 44rpx;" :src="getAssetsUrl('/zhihu/shop.svg')"></image>
                    <view class="fixtit">购物</view>
                </view>
                <view class="fixmore">相关产品</view>
            </view>
        </z-paging>
        <TnPopup v-model="data.goodShow" open-direction="bottom" @close="data.goodShow = false" round="16">
            <view class="goodbox">
                <view class="goodicon row i-center j-center" @click="data.goodShow = false"></view>
                <view class="goodtop row i-center">
                    <view class="goodtit">购物</view>
                    <view class="goodtit">相关产品</view>
                </view>
                <scroll-view class="goodroll" scroll-y>
                    <block v-for="item in data.mation.products" :key="item">
                        <view class="goodli row i-center j-between">
                            <view class="row i-center">
                                <view class="goodimg">
                                    <image :src="item.thumb" style="width: 108rpx; height: 108rpx; border-radius: 8rpx;"
                                        :customStyle="{ border: '2rpx solid #F3F3F3' }"></image>
                                </view>
                                <view class="goodname u-line-1">{{ item.name }}</view>
                            </view>
                            <view class="goodbtn">
                                <TnButton @click="linkGoodsDetail(item)" bg-color="#29C86F" text-color="#FFFFFF"
                                    :customStyle="{ height: '60rpx', borderRadius: '50rpx' }">去查看</TnButton>
                            </view>
                        </view>
                    </block>
                </scroll-view>
            </view>
        </TnPopup>
    </view>
</template>

<script lang="ts" setup>
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import TnSwiper from '@tuniao/tnui-vue3-uniapp/components/swiper/src/swiper.vue'
import { getAssetsPic } from "@/common/setPicture"
import { gotoChatPage } from "@/routes/nim-routes"
import { gotogoodsDetail } from "@/routes/goods-routes"
import { sceneDetail } from "@/api/smart-api"
import { reactive, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
interface Data {
    mation: any
    goodShow: boolean
    id: string
}
const data = reactive<Data>({
    mation: {},
    goodShow: false,
    id: ""
})

const getAssetsUrl = computed(() => {
    return (str: string) => {
        return getAssetsPic(str)
    }
})
onLoad((options: any) => {
    data.id = options.id
    sceneDetail(data.id).then(res => {
        data.mation = res
    })
})

const gotoSession = () => {
    // 跳转永椿店铺客服
    // gotoChatPage()
}
const linkGoodsDetail = (item: any) => {
    gotogoodsDetail(item.id)
}
const $preview = (index: any) => {
    uni.previewImage({
        urls: data.mation.mainImages,
        current: index
    })
}
</script>

<style>
page {
    background-color: #FFFFFF;
}
</style>

<style lang="scss" scoped>
.smartfot {
    background: #FFFFFF;
    box-shadow: 0rpx -16rpx 8rpx rgba(0, 0, 0, 0.02);

    .smartbtn {
        padding: 20rpx 30rpx;
    }
}

.smartimg {
    height: 440rpx;
}

.smartit {
    font-weight: 500;
    font-size: 36rpx;
    color: #333333;
    line-height: 48rpx;
    padding: 30rpx 40rpx;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        width: 6rpx;
        height: 46rpx;
        background: #29C86F;
        left: 0rpx;
        top: 32rpx;
    }

    &::after {
        content: '';
        position: absolute;
        width: 690rpx;
        height: 0;
        bottom: 0rpx;
        left: 30rpx;
        border-bottom: 2rpx solid #F2F2F2;
    }
}

.smartip {
    margin: 30rpx;

    .smartsu {
        font-weight: 500;
        font-size: 28rpx;
        color: #333333;

        &::before {
            content: '';
            width: 10rpx;
            height: 10rpx;
            background: #8F8F8F;
            border-radius: 50%;
            margin-right: 12rpx;
        }
    }

    .smartdsc {
        font-weight: 400;
        font-size: 32rpx;
        color: #666666;
        line-height: 48rpx;
        word-wrap: break-word;
    }
}

.smartfix {
    width: 324rpx;
    height: 80rpx;
    background: #FFFFFF;
    box-shadow: 0rpx 0rpx 12rpx 2rpx rgba(0, 0, 0, 0.16);
    border-radius: 0rpx 40rpx 40rpx 0rpx;
    position: fixed;
    left: 0;
    bottom: 280rpx;
    z-index: 99;
    box-sizing: border-box;
    padding: 18rpx 28rpx 18rpx 16rpx;

    .fixbox {
        .fixtit {
            font-weight: bold;
            font-size: 28rpx;
            color: #333333;
            padding: 0 16rpx;
        }

        &::after {
            content: "";
            border-right: 2rpx solid #F2F2F2;
        }
    }

    .fixmore {
        font-weight: 400;
        font-size: 28rpx;
        color: #666666;
        margin-left: 16rpx;
    }
}

.goodbox {
    .goodicon {
        padding: 20rpx;

        &::before {
            content: "";
            width: 80rpx;
            height: 10rpx;
            background: #E4E4E4;
            box-shadow: 0rpx 4rpx 16rpx 2rpx rgba(0, 0, 0, 0.04);
            border-radius: 6rpx;
        }
    }

    .goodtop {
        padding: 10rpx 38rpx 20rpx;
        border-bottom: 2rpx solid #E9E9E9;

        .goodtit {
            font-weight: bold;
            font-size: 32rpx;
            color: #333333;

            &:first-child::after {
                content: "";
                border-right: 2rpx solid #F2F2F2;
                margin: 0 20rpx;
            }
        }
    }

    .goodroll {
        width: 750rpx;
        height: 600rpx;
        padding: 40rpx;
        box-sizing: border-box;

        .goodli {
            margin-bottom: 40rpx;

            &:last-child {
                margin-bottom: 0;
            }

            .goodname {
                font-weight: bold;
                font-size: 28rpx;
                color: #333333;
                margin-left: 24rpx;
                margin-right: 20rpx;
            }
        }
    }
}
</style>
