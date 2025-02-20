<template>
    <view class="neds" >
        <view class="newTitle">新品上市</view>
        <view class="newUp">
            <view class="everyItem" v-for="(item, index) in newGoodList"  @click="gotoDetail(item)" :key="index">
                <image class="towPro_img" :src="item.thumb" mode="scaleToFill" />
                <view class="img_right">
                    <view>
                        <view class="text_tit">{{ item.name }}</view>
                        <view class="text_small">{{ item.desc }}</view>
                    </view>
                    <view class="price_text">
                        <view class="realPrice">￥{{ moneyFilter(item.price) }} <span class="piz">起</span>
                        </view>
                        <view class="nowBuy">立即购买</view>
                    </view>
                </view>
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
    newGoodList: any
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
            gotoServiceStore({ itemId: item.id })
        }
        if (item.businessType == 2) {
            gotogoodsDetail(item.id)
        }
    })
}

</script>
  
<style lang="scss" scoped>
.neds {
    margin-top: 20rpx;
}

.newTitle {
    text-align: center;
    font-weight: 600;
    font-size: 32rpx;
    color: #020202;
}

.newUp {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 30rpx 0rpx 0 0rpx;

    .everyItem {
        display: flex;
        flex: 1;
        background: #fff;
        padding: 20rpx;
        margin-bottom: 20rpx;
        height: 240rpx;
        border-radius: 24rpx;
    }

    .towPro_img {
        width: 200rpx;
        height: 200rpx;
    }

    .img_right {
        flex: 1;
        margin-left: 30rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .text_tit {
            font-weight: 600;
            font-size: 28rpx;
            color: #020202;
        }

        .text_small {
            margin-top: 12rpx;
            font-weight: 400;
            font-size: 24rpx;
            color: #666666;
        }

        .price_text {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20rpx;
            padding-top: 10rpx;

            .realPrice {
                font-weight: 600;
                font-size: 32rpx;
                color: #000000;

                .piz {
                    margin-left: 2rpx;
                    font-size: 22rpx;
                    color: #000000;
                }
            }

            .nowBuy {
                border: 1rpx solid #8F8F8F;
                border-radius: 36rpx;
                font-size: 24rpx;
                color: #000000;
                padding: 8rpx 18rpx;
                margin-right: 20rpx;
            }
        }
    }
}
</style>
