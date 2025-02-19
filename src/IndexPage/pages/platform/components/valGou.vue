<template>
    <view class="activityCed row i-center j-between">
        <view class="activili" @click="gotoMark">
            <view class="activiname">
                <view>超值购</view>
                <text class="activitit">优惠抢购，机不可失</text>
            </view>
            <scroll-view class="sett-seler" scroll-x>
                <view class="sett-seli column i-center j-center" v-for="(item) in dataObjTwo.itemList" :key="item.id">
                    <view class="sett-seli-img">
                        <image class="imgsel" :src="item.thumb"></image>
                    </view>
                    <view class="sett-seli-name u-line-1">{{ item.name }}</view>
                    <view class="priceText">低至<text class="priceNum">299</text>元起</view>
                </view>
            </scroll-view>
        </view>
    </view>
</template>
    
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnCountDown from '@tuniao/tnui-vue3-uniapp/components/count-down/src/count-down.vue'
import { getAssetsPic } from '@/common/setPicture'
import { gotoShopDetail } from "@/routes/service-routes"
// import { gotoNewcomerWelfare } from '@/routes/goods-routes'
import { gotoPiMark } from '@/routes/active-routes'

interface Props {
    dataObjTwo: any
}

const props = defineProps<Props>()

const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})

const gotoMark = () => {
    gotoPiMark('1716988256624369666')
}

// 更多
const gotoSettled = (item: any) => {
    console.log(item)
    gotoShopDetail(item.id)
}

</script>
  
<style lang="scss" scoped>
.activityCed {
    margin: 20rpx 0;

    .activili {
        width: 100%;
        height: 304rpx;
        background: linear-gradient(180deg, #FDF9F0 0%, #FEEDDD 100%);
        background-size: cover;
        border-radius: 24rpx;
        box-sizing: border-box;
        padding: 20rpx;

        &:first-child {
            padding-bottom: 1rpx;
        }

        &:last-child {
            background: linear-gradient(180deg, #FEF7F1 0%, #FDE6D8 100%);
        }

        .activiname {
            line-height: 48rpx;
            font-weight: bold;
            font-size: 34rpx;
            color: #773807;
        }

        .activitit {
            line-height: 34rpx;
            font-weight: 400;
            font-size: 24rpx;
            color: #DB9976;
        }
    }
}

.sett-seler {
    margin-top: 10rpx;
    width: 100%;
    height: 160rpx;
    overflow: hidden;
    white-space: nowrap;
    padding: 0 10rpx;
    box-sizing: border-box;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    background: #fff;
    display: flex;
    align-items: center;

    .sett-seli {
        display: inline-flex;
        margin-right: 42rpx;
        margin-top: 10px;

        .sett-seli-img {
            width: 120rpx;
            height: 90rpx;

            .imgsel {
                width: 86rpx;
                height: 86rpx;
            }
        }

        .sett-seli-name {
            width: 110rpx;
            height: 38rpx;
            padding: 0 6rpx;
            background: #fff;
            border-radius: 18rpx;
            font-weight: 400;
            line-height: 36rpx;
            font-size: 18rpx;
            color: #461800;
            text-align: center;
            margin-top: -30rpx;
            position: relative;
            z-index: 30;
        }

        .priceText {
            font-size: 18rpx;
            color: #F51F1F;
            .priceNum {
                font-size: 22rpx;
                font-weight: 600;
            }
        }
    }
}
</style>
