<template>
    <view class="wf-item-page" @click="todetail(item)">
        <image class="oneImg" :src="item.thumb || item.cover || ''" mode="aspectFill"></image>
        <view class="item-info">
            <view class="item-info-tit u-line-2">{{ item.name }}</view>
            <view class="item-info-tex u-line-2">{{ item.desc || '' }}</view>
            <view class="tgbox row" v-if="item.itemtaggranted && item.itemtaggranted.length && item.sourceType !== 4">
                <block v-for="(tag, index) in item.itemtaggranted" :key="tag.id">
                    <view class="tgli row i-center j-center" v-if="tag.itemtag.name && index < 3">
                        <text class="tgtex">{{ tag.itemtag.name }}</text>
                    </view>
                </block>
            </view>
            <!-- <text class="act-text">活动时间剩余4天</text> -->
            <view class="item-info-box row" v-if="item.sourceType !== 4">
                <text class="item-info-pric" v-if="item.quantity">￥{{ moneyFilter(item.price / item.quantity) }}</text>
                <text class="item-info-pric" v-else>￥{{ moneyFilter(item.price) }}</text>
                <text class="item-info-optionName" v-if="item.businessType !== 2">/起</text>
                <text class="item-info-fakePrice" v-if="item.fakePrice">￥{{ moneyFilter(item.fakePrice)
                }}</text>
                <!-- <view class="item-info-tag row">
						<text class="item-info-tag-tex">可用券</text>
					</view> -->

                <view class="customer row i-center j-center">
                    <image src="/static/custip.svg" class="imgkf" mode="aspectFill"></image>
                    <text class="custtxt">客服</text>
                </view>
            </view>
            <!-- <view class="pybox row" v-if="item.salesVolume">
					<view class="pyli">
						<text class="pyli_tex">{{item.salesVolume + '人已购买服务'}}</text>
					</view>
				</view> -->
            <view class="seller row i-center" v-if="item.sourceType !== 4">
                <image v-if="item.shopThumb" :src="item.shopThumb || ''" class="imgTow" mode="aspectFill">
                </image>
                <view class="sel-tit u-line-1">{{ item.shopName || '' }}</view>
            </view>
            <view class="seller row i-center" v-if="item.sourceType == 4">
                <image style="width: 30rpx;height: 30rpx;border-radius: 20rpx" v-if="item.accountAvatar" :src="getAssetsPic(item.accountAvatar) || ''" errorIcon="error-circle" mode="aspectFill"></image>
                <image style="width: 30rpx;height: 30rpx;border-radius: 20rpx" v-if="item.accountThumb" :src="getAssetsPic(item.accountThumb) || ''" errorIcon="error-circle" mode="aspectFill"></image>
                <view class="sel-tit u-line-1">{{ item.accountName || '' }}</view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { moneyFilter } from "@/common/filters"
import { ref, computed, reactive, onMounted } from 'vue'
import BarPlaying from '@/components/barPlaying/barPlaying.vue'
import { getAssetsPic } from '@/common/setPicture'


interface Props {
    item: any,
    direction: number,
    isSmall: boolean,
}

const props = defineProps<Props>()

interface Data {
    rateValue: number
}
const data = reactive<Data>({
    rateValue: 3
})

interface Events {
    (e: 'clickwaterItem', item: any): void
}
const emit = defineEmits<Events>()


onMounted(() => {

})

const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})


const todetail = (item: any) => {
    emit('clickwaterItem', item)
}




</script>

<style lang="scss" scoped>
.wf-item-page {
    background-color: #FFFFFF;
    /* #ifndef APP-NVUE */
    box-shadow: 0rpx 0rpx 20rpx rgba(0, 0, 0, 0.02);
    /* #endif */
    border-radius: 24rpx;
    width: 350rpx;
    overflow: hidden;
    margin-bottom: 20rpx;

    .oneImg {
        width: 346rpx;
        height: 346rpx;
    }
}

.item-info {
    padding: 14rpx 16rpx 24rpx;
}

.item-info-tit {
    font-size: 30rpx;
    line-height: 42rpx;
    font-weight: 600;
    color: #333333;
}

.item-info-tex {
    margin-top: 6rpx;
    font-size: 26rpx;
    line-height: 34rpx;
    font-weight: 400;
    color: #808080;
}

.tgbox {
    align-items: center;
    flex-wrap: wrap;
    margin-top: 6rpx;

    .tgli {
        margin-top: 8rpx;
        margin-right: 8rpx;
        padding: 0 12rpx;
        height: 38rpx;
        background-color: #FFF0E9;
        border-radius: 4rpx;

        .tgtex {
            font-size: 22rpx;
            font-weight: 400;
            color: #F6672B;
        }
    }
}

.pybox {
    align-items: center;
    margin-top: 4rpx;

    .pyli_tex {
        font-size: 24rpx;
        font-weight: 400;
        color: #AAAAAA;
        line-height: 28rpx;
        padding-left: 4rpx;
    }
}

.seller {
    margin-top: 10rpx;

    .sel-tit {
        font-size: 24rpx;
        font-weight: 400;
        color: #999999;
        line-height: 30rpx;
        padding-left: 10rpx;
    }
}

.act-text {
    margin-top: 12rpx;
    font-size: 24rpx;
    font-weight: 400;
    color: #DBAF5A;
}

.item-info-box {
    align-items: center;
    margin-top: 20rpx;
    margin-bottom: 10rpx;
    position: relative;
    /* #ifndef APP-NVUE */
    display: block;

    /* #endif */
    .item-info-tag {
        margin-left: 8rpx;
        width: 72rpx;
        height: 30rpx;
        border: 1rpx solid #F51F1F;
        border-radius: 4rpx;
        align-items: center;
        justify-content: center;

        .item-info-tag-tex {
            font-size: 20rpx;
            font-weight: 400;
            color: #F51F1F;
        }
    }

    .customer {
        width: 72rpx;
        height: 34rpx;
        background: #E6F2FF;
        border-radius: 6rpx 0rpx 0rpx 6rpx;
        position: absolute;
        right: -16rpx;
        top: 50%;
        transform: translateY(-50%);

        .imgkf {
            width: 22rpx;
            height: 22rpx;
        }

        .custtxt {
            font-weight: 400;
            font-size: 16rpx;
            color: #4E8AF3;
            margin-left: 4rpx;
        }
    }
}

.item-info-pric {
    font-size: 28rpx;
    font-weight: bold;
    color: #333333;

}

.item-info-optionName {
    font-size: 22rpx;
    color: #1A1A1A;
}

.item-info-fakePrice {
    margin-left: 6rpx;
    font-size: 22rpx;
    color: #999999;
    text-decoration: line-through;
}

.shop_box {
    display: flex;
    align-items: center;

    .shop_name {
        margin-left: 8rpx;
        font-size: 20rpx;
        color: #999999;
    }
}

.imgTow {
    width: 30rpx;
    height: 30rpx;
    border-radius: 50%;
}
</style>
