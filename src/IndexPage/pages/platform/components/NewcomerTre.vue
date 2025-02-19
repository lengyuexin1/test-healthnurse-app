<template>
    <view class="activityCed row i-center j-between" @click="gotoShop">
        <view class="activili">
            <view class="activiname">
                <text>优选店铺</text>
                <text class="activitit">品质服务的首选</text>
            </view>
            <scroll-view class="sett-seler row i-center" scroll-x>
                <view class="sett-seli column i-center j-center" v-for="(item) in dataObjTre.shopList" :key="item.id"
                    @click.stop="gotoSettled(item)">
                    <view class="sett-seli-img">
                        <image class="imgsel" :src="item.thumb"></image>
                    </view>
                    <view class="sett-seli-name u-line-1">{{ item.name }}</view>
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
import { gotoPingP } from '@/routes/active-routes'

interface Props {
    dataObjTre: any
}

const props = defineProps<Props>()

const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})

// 更多
const gotoSettled = (item: any) => {
    console.log(item)
    gotoShopDetail(item.id)
}

const gotoShop = () => {
    gotoPingP(props.dataObjTre.id)
}

</script>
  
<style lang="scss" scoped>
.activityCed {
    margin: 20rpx 0;

    .activili {
        width: 100%;
        height: 240rpx;
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
            padding-left: 20rpx;
            line-height: 34rpx;
            font-weight: 400;
            font-size: 24rpx;
            color: #DB9976;
        }
    }
}

.sett-seler {
    margin-top: 30rpx;
    justify-content: space-around;
    width: 100%;
    height: 118rpx;
    overflow: hidden;
    white-space: nowrap;
    padding: 0 10rpx;
    box-sizing: border-box;

    .sett-seli {
        display: inline-flex;
        margin-right: 32rpx;

        .sett-seli-img {
            border: 4rpx solid #FFFFFF;
            border-radius: 50%;
            width: 86rpx;
            height: 86rpx;

            .imgsel {
                width: 86rpx;
                height: 86rpx;
            }
        }

        .sett-seli-name {
            width: 110rpx;
            height: 38rpx;
            padding: 0 6rpx;
            background: #FFAD65;
            border: 3rpx solid #FFFFFF;
            border-radius: 18rpx;
            font-size: 20rpx;
            font-weight: 400;
            line-height: 36rpx;
            color: #FFFFFF;
            text-align: center;
            margin-top: -20rpx;
            position: relative;
            z-index: 30;
            overflow: hidden;
        }
    }
}
</style>
