<template>
    <view class="container">
        <customNavbar pageTitle="场景条件"></customNavbar>
        <u-swiper :list="innerList" height="440rpx" radius="0" indicator indicatorMode="dot"></u-swiper>
        <view class="content">
            <view class="conhed">
                <view class="contit">体征监测</view>
                <view class="contip">每天定时通过Pad推送消息提示用户测量血压、体温</view>
            </view>
            <view class="conability row i-center j-between">
                <view class="bilitit">紧急求助</view>
                <u-switch v-model="checkout" size="23" activeColor="#29C86F" inactiveColor="#DFDFDF"></u-switch>
            </view>
            <view class="conability row i-center j-between">
                <view class="bilitit">智能提醒</view>
                <u-switch v-model="checkout" size="23" activeColor="#29C86F" inactiveColor="#DFDFDF"></u-switch>
            </view>
            <view class="condevice">
                <view class="devitit">场景设备</view>
                <block v-for="(item,index) in 3" :key="index">
                    <view class="devili row i-center j-between">
                        <view class="devidot row i-center j-center"></view>
                        <view class="deviinfo row i-center j-between">
                            <view class="deviname">体温计</view>
                            <view class="devirig row i-center">
                                <view class="devistus">已绑定</view>
                                <u-icon name="arrow-right" size="18" color="#B5B5B5"></u-icon>
                            </view>
                        </view>
                    </view>
                </block>
            </view>
        </view>
        <view class="factfot">
            <view class="factbox">
                <!-- <view class="factcon">
                    <u-button :customStyle="{ height: '90rpx' }" shape="circle" color="#29C86F" text="开启场景"></u-button>
                </view> -->
                <view class="factcon row i-center j-between">
                    <view class="facttip">缺少开启条件，无法启动场景</view>
                    <view class="factbtn">
                        <u-button :customStyle="{ height: '90rpx' }" shape="circle" color="#29C86F" text="前往购买"></u-button>
                    </view>
                </view>
                <u-safe-bottom></u-safe-bottom>
            </view>
            <u-safe-bottom></u-safe-bottom>
        </view>
    </view>
</template>

<script>
import { getAssetsPic } from "@/common/setPicture.js"
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
export default {
    components: {
        customNavbar
    },
    data() {
        return {
            innerList: [
                'https://cdn.uviewui.com/uview/swiper/swiper1.png',
                'https://cdn.uviewui.com/uview/swiper/swiper2.png',
                'https://cdn.uviewui.com/uview/swiper/swiper3.png'
            ],
            checkout: false
        }
    },
    computed: {
        getAssetsUrl() {
            return (str) => {
                return getAssetsPic(str)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.content{
    padding: 30rpx 20rpx;

    .conhed{
        margin-left: 16rpx;
        margin-bottom: 30rpx;

        .contit{
            font-weight: bold;
            font-size: 34rpx;
            color: #333333;
            line-height: 48rpx;
        }
        .contip{
            font-weight: 400;
            font-size: 24rpx;
            color: #999999;
            margin-top: 8rpx;
        }
    }
    .conability{
        margin-bottom: 20rpx;
        height: 112rpx;
        background: #FFFFFF;
        border-radius: 24rpx;
        padding: 0 30rpx;

        .bilitit{
            font-weight: bold;
            font-size: 28rpx;
            color: #333333;
        }
    }
    .condevice{
        padding: 40rpx 30rpx;
        background: #FFFFFF;
        border-radius: 24rpx;

        .devitit{
            font-weight: bold;
            font-size: 32rpx;
            color: #333333;
            line-height: 48rpx;
            margin-bottom: 30rpx;
        }

        .devili{
            margin-top: 24rpx;

            .devidot{
                width: 28rpx;
                height: 28rpx;
                background: #29C86F;
                border-radius: 50%;
                position: relative;
                z-index: 20;

                &::before{
                    content: '';
                    position: relative;
                    width: 12rpx;
                    height: 12rpx;
                    background: #FFFFFF;
                    border-radius: 50%;
                }
                &::after{
                    content: '';
                    width: 0;
                    border-right: 2rpx solid #ECECEC;
                    position: absolute;
                    left: 13rpx;
                    top: 28rpx;
                    bottom: -110rpx;
                    z-index: 10;
                }
            }

            &:last-child{
                .devidot::after{
                    display: none;
                }
            }

            .deviinfo{
                width: 606rpx;
                height: 100rpx;
                background: #F8F8F8;
                border-radius: 20rpx;
                padding: 0 30rpx;
                box-sizing: border-box;
            }

            .deviname{
                font-weight: 500;
                font-size: 32rpx;
                color: #333333;
            }
            .devistus{
                font-weight: 400;
                font-size: 28rpx;
                color: #999999;
                margin-right: 12rpx;

                &.set{
                    color: #29C86F;
                }
            }
        }
    }
}
.factfot{
    &::before{
        content: '';
        display: block;
        height: 130rpx;
        opacity: 0;
    }
    .factbox{
        background: #FFFFFF;
        position: fixed;
        z-index: 100;
        left: 0;
        right: 0;
        bottom: 0;
        .factcon{
            width: 750rpx;
            height: 130rpx;
            padding: 20rpx 30rpx;
            box-sizing: border-box;
            .facttip{
                width: 404rpx;
                height: 72rpx;
                background: #FFF2F2;
                border-radius: 40rpx;
                font-weight: 400;
                font-size: 26rpx;
                color: #FF5E5E;
                line-height: 72rpx;
                text-align: center;
            }
            .factbtn{
                width: 260rpx;
            }
        }
    }
}
</style>
