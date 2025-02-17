<template>
    <view class="newHanle towPro">
        <view class="getQuan">
            <view class="quanTitle">甄选推荐</view>
        </view>

        <view class="live_swiper tow_swiper">
            <swiper class="swiper" circular :autoplay="false" :interval="5000" :duration="500" :vertical="false"
                @change="liveswiperChange">
                <swiper-item class="swiper_item" v-for="(item, index) in newZhen" :key="item.id" @click="gotoDetail(item)">
                    <view class="towPro_box">
                        <image class="towPro_img" :src="item.thumb" />
                    </view>
                    <view class="givebot">
                        <view>
                            <view class="switTit">{{ item.name }}</view>
                            <view>
                                <view class="smalltit towtex">{{ item.desc }}</view>
                            </view>
                            <view class="howMoney bigMone">￥{{ moneyFilter(item.price) }} <view class="qics bigqi">起
                                </view>
                            </view>
                        </view>
                        <view class="nowBuy">立即购买</view>
                    </view>
                </swiper-item>
            </swiper>
            <view class="swiper_sign_box">
                <view class="sign_item tow_sign" :class="{ 'is_sign': signIndex == swiperIndex }"
                    v-for="(signItem, signIndex) in newZhen.length" :key="signIndex"></view>
            </view>
        </view>
    </view>
</template>
    
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnCountDown from '@tuniao/tnui-vue3-uniapp/components/count-down/src/count-down.vue'
import { getAssetsPic } from '@/common/setPicture'
import { moneyFilter } from "@/common/filters"
import { PlatformManage } from "@bc/sys"
import { gotoLogin } from "@/routes/public-routes"
import { gotoServiceStore } from '@/routes/service-routes'
import { gotogoodsDetail } from '@/routes/goods-routes'

interface Props {
    newZhen: any
}

const swiperIndex = ref(0)
const props = defineProps<Props>()

const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})

const liveswiperChange = (e: any) => {
    swiperIndex.value = e.detail.current
}
const gotoDetail = (item: any) => {
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            uni.showToast({
                title: '登录失效,请重新登录！', icon: 'none'
            })
            setTimeout(() => {
                gotoLogin({})
            }, 1000)
            return
        }
        console.log(item)
        if (item.businessType == 1) {
            gotoServiceStore({itemId: item.id})
        }
        if (item.businessType == 2) {
            gotogoodsDetail(item.id)
        }
    })
}

</script>
  
<style lang="scss" scoped>
.newHanle {
    background: #fff;
    border-radius: 24rpx 24rpx 24rpx 24rpx;
    margin: 0 0rpx 20rpx 0rpx;
    padding: 24rpx;
    overflow: hidden;
    height: 676rpx;

    .swiper {
        height: 578rpx !important;
    }

    .tow_swiper {
        height: 578rpx
    }

    .getQuan {
        display: flex;
        justify-content: space-between;
        align-items: baseline;

        .quanTitle {
            font-size: 36rpx;
            color: #020202;
            font-weight: 600;
        }

        .tenmonye {
            font-size: 28rpx;
            color: #020202;
            display: flex;
            align-items: center;

            .left_jin {
                margin-left: 10rpx;
            }
        }
    }

    .newDevList {
        margin-top: 24rpx;
        width: 100%;
        display: flex;
        justify-content: center;

        .newItem {
            width: 25%;
            display: flex;
            flex-direction: column;
            align-items: center;

            .new_img {
                width: 112rpx;
                height: 112rpx;
            }

            .useQuan {
                background: #F1F1F1;
                border-radius: 20rpx;
                padding: 6rpx 20rpx;
                font-size: 20rpx;
                color: #666666;
                margin-top: 20rpx;
            }
        }
    }

    .givebot {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .nowBuy {
            background: #F2F2F2;
            border-radius: 36rpx 36rpx 36rpx 36rpx;
            padding: 12rpx 30rpx;
            font-size: 28rpx;
            color: #000000;
            margin-right: 50rpx;
        }
    }

    .towPro_box {
        margin: 10rpx 0 20rpx 0;
        text-align: center;
        height: 390rpx;

        .towPro_img {
            width: 430rpx;
            height: 390rpx;
            margin-left: -30rpx;
            // margin-top: -80rpx;
        }
    }


    .switTit {
        font-weight: 600;
        font-size: 32rpx;
        color: #020202;
    }

    .smalltit {
        font-size: 20rpx;
        color: #666666;
        margin: 10rpx 0;
    }

    .towtex {
        font-size: 24rpx;
    }

    .howMoney {
        display: flex;
        align-items: baseline;
        margin-top: 10rpx;
        font-weight: 600;
        font-size: 24rpx;
        color: #000000;

        .qics {
            font-weight: 400;
            font-size: 18rpx;
            color: #000000;
            margin-left: 6rpx;
        }
    }

    .bigMone {
        margin-top: 20rpx;
        font-size: 32rpx;
    }

    .bigqi {
        font-size: 22rpx;
    }
}

.swiper_sign_box {
    position: absolute;
    bottom: 12rpx;
    left: 50%;
    transform: translate(-50%, 0rpx);
    display: flex;
    align-items: center;

    .sign_item {
        width: 12rpx;
        height: 12rpx;
        background: #CE0829;
        opacity: 0.3;
        margin-left: 8rpx;
        border-radius: 50%;

        &.is_sign {
            opacity: 1;
        }
    }
}

.live_swiper {
    position: relative;
    border-radius: 12rpx;
    overflow: hidden;
}
</style>
