<template>
    <view class="newcomer_wrap" @tap="clickMore">
        <image class="icon-bg" :src="getAssetsUrl('/leyou/icon/newcomer-bg.png')" mode="scaleToFill" />

        <view class="title tn-flex-center-between">
            <view class="left">限时专属红包 一键包邮</view>
            <view class="right tn-flex-row">更多
                <TnIcon name="right" />
            </view>
        </view>
        <view class="list tn-flex-center-around">
            <view class="coupon">
                <image class="coupon-bg" :src="getAssetsUrl('/leyou/icon/coupon-bg.png')" mode="scaleToFill" />
                <view class="content">
                    <view class="price tn-text-bold" v-if="dataObj.couponList.length > 0">
                        {{ showTPri(dataObj.couponList[0].typeId, dataObj.couponList[0]) }}
                        <view class="txt">{{ dataObj.couponList[0].desc }}</view>
                    </view>
                    <view class="btn tn-text-bold">去使用</view>
                </view>
            </view>
            <view class="wrap tn-flex-column" v-for="(item, index) in dataObj.itemList.splice(0, 3)" :key="index">
                <image class="img" :src="item.thumb" mode="scaleToFill" />
                <text class="txt">劵后￥{{ moneyFilter(item.price) }}元</text>
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
import { gotoNewActive } from '@/routes/active-routes'
// import { gotoNewcomerWelfare } from '@/routes/goods-routes'

interface Props {
    dataObj: any
}

const showTPri = computed(() => (cup: string, dats: any) => {
    const strPri = (cup + '').slice(-1)
    if (strPri == '0' || strPri == '1') {
        return "￥" + moneyFilter(dats.cfgOffer)
    }
    if (strPri == '4' || strPri == '2') {
        return dats.cfgOffer / 100 + '折'
    }
})

const props = defineProps<Props>()

const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})

const cupList = [
    { id: 100001, name: "活动满减券" },
    { id: 100000, name: "活动现金券" },
    { id: 100002, name: "活动满折券" },
    { id: 100003, name: "活动兑换码" },
    { id: 100004, name: "活动折扣券" },
]


// 更多
const clickMore = () => {
    gotoNewActive(props.dataObj.id)
}

</script>
  
<style lang="scss" scoped>
.newcomer_wrap {
    position: relative;
    margin-bottom: 20rpx;

    .icon-bg {
        width: 100%;
        height: 314rpx;
    }

    .title {
        width: 100%;
        position: absolute;
        left: 0;
        top: 60rpx;
        color: #FFF4BB;
        padding: 0 22rpx;

        .left {
            font-size: 26rpx;
        }

        .right {
            font-size: 22rpx;
        }
    }

    .list {
        width: 100%;
        height: 180rpx;
        position: absolute;
        left: 0;
        bottom: 28rpx;
        color: #FFF4BB;
        padding: 0 5rpx;

        .coupon,
        .wrap {
            position: relative;
            width: 156rpx;
            height: 180rpx;
        }

        .coupon-bg {
            width: 156rpx;
            height: 180rpx;
        }

        .content {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            color: #F46603;
            text-align: center;

            .unit,
            .time,
            .txt {
                font-size: 20rpx;
                font-weight: 400;
                margin-top: 10rpx;
            }

            .price {
                font-size: 40rpx;
                height: 106rpx;
                overflow: hidden;
                margin-top: 10rpx;
            }

            .btn {
                margin-top: 20rpx;
                font-size: 24rpx;
            }
        }

        .wrap {
            background: #FFFFFF;
            border-radius: 12rpx;

            .img {
                margin-bottom: 10rpx;
                width: 100%;
                height: 122rpx;
                border-radius: 12rpx 12rpx 0 0;
            }

            .txt {
                text-align: center;
                font-size: 22rpx;
                color: #E66F41;
            }
        }
    }
}
</style>
