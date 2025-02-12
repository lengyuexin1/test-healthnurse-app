<template>
    <view class="foryouUl">
        <view class="foryou_li" v-for="(item, index) in props.wfList" :key="index" @click="gotoDetail(item)">
            <image class="towPro_img" :src="item.thumb" mode="scaleToFill" />
            <view class="crazy_bottom">
                <view>
                    <view class="product_name">{{ item.name }}</view>
                    <view class="product_smal">{{ item.desc }}</view>
                </view>
                <view class="difMoney">
                    <view class="realMoney">￥{{ moneyFilter(item.price) }}</view>
                    <text class="item-info-optionName">/起</text>
                    <view class="ageMoney" v-if="item.fakePrice">￥{{ linePrice(item) }}</view>
                </view>
                <view class="seller row i-center" @click="navShopDetail"  v-if="item.sourceType !== 4">
					<image class="imgBox" v-if="item.shopThumb" :src="item.shopThumb || ''" mode="aspectFill"></image>
					<view class="sel-tit u-line-1">{{item.shopName || ''}}</view>
				</view>
				<view class="seller row i-center" @click="navShopDetail"  v-if="item.sourceType == 4">
					<image class="imgBox" v-if="item.accountAvatar" :src="item.accountAvatar || ''" mode="aspectFill"></image>
					<image class="imgBox" v-if="item.accountThumb" :src="item.accountThumb || ''" mode="aspectFill"></image>
					<view class="sel-tit u-line-1">{{item.accountName || ''}}</view>
				</view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { getAssetsPic } from '@/common/setPicture'
import { ref, computed, reactive, onMounted, watch, nextTick, getCurrentInstance } from 'vue'
import { PlatformManage } from "@bc/sys"
import { gotoLogin } from "@/routes/public-routes"
import { gotogoodsDetail } from '@/routes/goods-routes'
import { gotoserviceDetail } from '@/routes/service-routes'
import { moneyFilter } from "@/common/filters"

const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})
const linePrice = computed(() => (item:any) => {
    return moneyFilter(item.fakePrice / item.quantity)
})

const props = withDefaults(defineProps<{
    wfList?: any
}>(), {
    wfList: []
})

const gotoDetail = (item: any) => {
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            uni.showToast({
                text: '登录失效,请重新登录',
                icon: "none"
            })
            setTimeout(() => {
                gotoLogin({})
            }, 1000)
            return
        }
        if (item.businessType == 1) {
            gotoserviceDetail(item.id)
        }
        else {
            gotogoodsDetail(item.id)
        }

    })
}

const arrList = ref([
    { img: '', pri: 52516, realPri: 58229, text: '智能助行机器人', dec: '得力助手' },
    { img: '', pri: 4239, realPri: 4689, text: '扫地机器人', dec: '清洁达人' },
    { img: '', pri: 1068, realPri: 1288, text: '膝关节保护理疗仪', dec: '护理能手' },
    { img: '', pri: 839, realPri: 1240, text: '肩膀保护理疗仪', dec: '舒适怡人' }
])
// watch(() => props.wfList, (newVal, oldVal) => {
//     arrList.value = newVal
// }, { immediate: true, deep: true })



</script>

<style lang="scss" scoped>
.foryouUl {
    margin-top: 20rpx;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 16rpx;
}

.foryou_li {
    height: 550rpx;
    background: #FFFFFF;
    border-radius: 24rpx 24rpx 24rpx 24rpx;

    .towPro_img {
        width: 348rpx;
        height: 348rpx;
        // padding: 20rpx;
    }

    .crazy_bottom {
        margin-top: 8rpx;
        margin-left: 20rpx
    }

    .product_name {
        font-weight: 600;
        font-size: 28rpx;
        color: #020202;
    }

    .product_smal {
        margin-top: 8rpx;
        font-size: 20rpx;
        color: #666666;
    }

    .difMoney {
        display: flex;
        align-items: center;
        margin: 10rpx 0;
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
        margin-left: 6rpx;
    }
}

.item-info-optionName {
    font-size: 22rpx;
    color: #1A1A1A;
}
.imgBox{
    width:30rpx;
    height: 30rpx;
    border-radius: 20rpx;
}
.sel-tit {
    font-size: 24rpx;
    padding-left: 10rpx;
    color: #999999;
}
</style>

