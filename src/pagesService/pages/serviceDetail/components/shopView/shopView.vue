<template>
    <view class="seller_box" v-if="baseInfo.id">
        <view class="seller_about row">
            <view class="seller_pic">
                <image class="shop_img" mode="aspectFit" :src="baseInfo.thumb" @click="gotoShop"></image>
            </view>
            <view class="sel_out_rig">
                <view class="seller_name u-line-1" @click="gotoShop">{{
                    baseInfo.name
                }}</view>
                <view class="seller_more row i-center j-between">
                    <view class="row i-center">
                        <TnRate v-model="baseInfo.score" readonly active-color="#FCCF0A" size="32rpx"></TnRate>
                        <view class="seller_score">{{ baseInfo.score }}分</view>
                    </view>
                    <view class="seller_ser" v-if="baseInfo.applyId == 2">累计服务<text>{{
                        baseInfo.salesQuantity || 0
                    }}</text>用户</view>
                    <view class="seller_ser" v-else>累计售出<text>{{
                        baseInfo.salesQuantity || 0
                    }}</text>商品</view>
                </view>
            </view>
        </view>
        <view class="seller_exp row j-between">
            <view class="seller_exp_li">
                <view class="seller_exp_tit">店铺等级</view>
                <view class="seller_exp_desc">
                    <image class="seller_exp_img" mode="aspectFit" v-if="baseGrade(baseInfo.level)"
                        :src="baseGrade(baseInfo.level)"></image>
                    <view v-else>--</view>
                </view>
            </view>
            <view class="seller_exp_li">
                <view class="seller_exp_tit">{{ baseInfo.applyId == 2 ? '服务质量' : '商品质量' }}</view>
                <view class="seller_exp_desc">{{ baseInfo.applyId == 2 ? '服务好评率' : '商品好评率' }}<text>{{ baseInfo.applyId == 2
                    ?
                    (baseInfo.serviceGoodCommentRate * 100).toFixed(2) : (baseInfo.productGoodCommentRate * 100).toFixed(2) }}%</text></view>
            </view>
            <view class="seller_exp_li" style="padding:0px">
                <view class="seller_exp_tit">客服表现</view>
                <view class="seller_exp_desc">平均<text>20</text>秒回复</view>
            </view>
        </view>
        <view class="seller_btn">
            <TnButton shape="round" @click="gotoShop" width="100%" height="80rpx" border-color="#29C86F" plain bg-color="#fff" text-color="#29C86F" >进店逛逛</TnButton>
        </view>
    </view>
</template>

<script lang="ts" setup>
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnRate from '@tuniao/tnui-vue3-uniapp/components/rate/src/rate.vue'

import { getBaseInfo } from "@/api/service-api"
import { getAssetsPic } from "@/common/setPicture"
import { reactive, computed, toRefs } from "vue"
const props = defineProps({
    baseId: String
})
const shopInfo = reactive<{baseInfo:any}>({
    baseInfo: {}
})
const baseGrade = computed(() => {
    return (type: any) => {
        switch (type) {
            case 8:
                return getAssetsPic('/shop/shop_level_1.png')
            case 4:
                return getAssetsPic('/shop/shop_level_2.png')
            case 2:
                return getAssetsPic('/shop/shop_level_3.png')
            case 1:
                return getAssetsPic('/shop/shop_level_4.png')
            default:
                return getAssetsPic('/shop/shop_level_3.png')
        }
    }
})
const emit = defineEmits(["setShop", "gotoShop"])
const getShopInfo = () => {
    const data: any = {
        id: props.baseId
    }
    getBaseInfo(data).then((res) => {
        baseInfo.value = res
        emit('setShop', res)
        console.log('baseInfo', baseInfo.value)
    }).catch(err => {
        emit('setShop', {
            message: err.message
        })
    })
}
getShopInfo()

const gotoShop = () => {
    emit('gotoShop')
}
const { baseInfo } = toRefs(shopInfo)
</script>

<style lang="scss" scoped>
/* 店铺信息 ↓ */
.seller_box {
    border-radius: 24rpx;
    background-color: #ffffff;
    padding: 40rpx 30rpx;
    margin-top: 16rpx;

    .seller_pic {
        margin-right: 20rpx;
        flex-shrink: 0;
        .shop_img{
            width: 100rpx;
            height: 100rpx;
            border-radius: 50%;
        }
    }

    .sel_out_rig {
        flex: 1;
    }

    .seller_name {
        font-size: 32rpx;
        font-weight: bold;
        line-height: 52rpx;
        color: #333333;
        margin-bottom: 22rpx;
    }

    .seller_score {
        font-size: 24rpx;
        font-weight: 400;
        color: #999999;
        margin-left: 8rpx;
    }

    .seller_ser {
        font-size: 24rpx;
        font-weight: 400;
        color: #666666;
    }

    .seller_ser text {
        color: #29c86f;
    }

    .seller_exp {
        margin-top: 36rpx;
        padding-left: 20rpx;
    }

    .seller_exp_li {
        text-align: center;
        padding-right: 20rpx;
        border-right: 2rpx solid #f2f2f2;
    }

    .seller_exp_li:last-child {
        border: none;
    }

    .seller_exp_tit {
        font-size: 24rpx;
        font-weight: 400;
        line-height: 52rpx;
        color: #8a8a8a;
    }

    .seller_exp_desc {
        font-size: 28rpx;
        font-weight: bold;
        // line-height: 52rpx;
        color: #333333;
    }

    .seller_exp_img {
        width: 140rpx;
        height: 45rpx;
    }

    .seller_exp_desc text {
        color: #29c86f;
    }

    .seller_btn {
        margin-top: 32rpx;
    }
}

/* 店铺信息 ↑ */
</style>
