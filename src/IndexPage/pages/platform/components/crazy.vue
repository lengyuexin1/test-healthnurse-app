<template>
    <view class="crazy">
        <view class="newTitle">爆品精选</view>
        <view class="crezy_ul">
            <view class="crezy_li" v-for="(item, index) in orgSelect" :key="index" @click="gotoDetail(item)">
                <image class="towPro_img" :src="item.thumb" mode="scaleToFill" />
                <!-- <TnLazyLoad :src="item.thumb" class="towPro_img" /> -->
                <view class="crazy_bottom">
                    <view class="textBox">
                        <view class="product_name">{{ item.name }}</view>
                        <view class="product_smal">{{ item.desc }}</view>
                    </view>
                    <view class="difMoney">
                        <view class="realMoney">￥{{ moneyFilter(item.price) }}</view>
                        <!-- <view class="ageMoney">￥{{ item.realPri }}</view> -->
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
    orgSelect: any
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
.crazy {
    .newTitle {
        text-align: center;
        font-weight: 600;
        font-size: 32rpx;
        color: #020202;
    }

    margin: 20rpx 0rpx 20rpx 0rpx;

    .crezy_ul {
        margin-top: 20rpx;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 16rpx;

        .crezy_li {
            background-color: #fff;
            height: 430rpx;
            border-radius: 24rpx;
            padding: 0 6rpx;

            .towPro_img {
                width: 226rpx;
                height: 226rpx;
                padding: 20rpx;
            }

            .crazy_bottom {
                margin-top: 8rpx;
                margin-left: 16rpx;
                display: flex;
                flex-direction: column;

                .textBox {
                    height: 120rpx;
                }

            }

            .product_name {
                font-weight: 600;
                font-size: 24rpx;
                color: #020202;
                display: -webkit-box !important;
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-all;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical !important;
            }

            .product_smal {
                margin-top: 8rpx;
                font-weight: 400;
                font-size: 20rpx;
                color: #666666;
                display: -webkit-box !important;
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-all;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical !important;
            }

            .difMoney {
                display: flex;
                align-items: center;
            }

            .realMoney {
                font-weight: 600;
                font-size: 28rpx;
                color: #000000;
                padding-right: 10rpx;
            }

            .ageMoney {
                font-size: 20rpx;
                color: #999999;
                text-decoration: line-through;
            }
        }
    }
}
</style>
