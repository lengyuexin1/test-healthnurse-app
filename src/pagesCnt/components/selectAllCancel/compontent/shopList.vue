<template>
    <view class="tn-flex-row">
        <view class="left">
            <image class="cover" :src="item.shop?.thumb" mode="aspectFill" />
        </view>
        <view class="right tn-flex-column">
            <view class="title tn-text-ellipsis-2">{{ item.shop?.name }}</view>
            <view class="tn-flex-row" style="margin-top: 12rpx;">
                <TnRate v-model="data.rate" :min="1" :max="5" readonly gutter="0rpx" activeColor="#FF9F3E" inactive-color="#EBEBEB" size="sm" allow-half />
                <view class="score">{{ item.shop?.score }}</view>
                <view class="comment" v-if="item.extend?.commentCnt > 0">{{ item.extend?.commentCnt }}条评价</view>
                <view class="comment" v-else>暂无评价</view>
            </view>
            <view class="desc">
                <template v-if="item.shop?.categoriesName">
                    {{ item.shop?.categoriesName }} |
                </template>
                {{ item.shop?.districtName }}
            </view>
            <view class="price tn-flex-row" v-if="isHealthShop">
                <text class="num">{{ priceFormat(item.extend?.minPrice) }}</text> 
                <text class="unit">起</text>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { reactive, computed } from 'vue'
import TnRate from '@tuniao/tnui-vue3-uniapp/components/rate/src/rate.vue'
import { priceFormat } from '@/common/price-format'

const props = defineProps({
    item: {
        type: Object,
        default: {}
    }
})

interface Data {
    rate: number
}

const data = reactive<Data>({
    rate: props.item.shop?.score
})

/** @returns {boolean} 是否是康养机构店铺 */
const isHealthShop = computed(() => {
    return props.item.shop.applyId === 13
})

</script>

<style lang="scss" scoped>
.left {
    position: relative;

    .cover {
        width: 140rpx;
        height: 140rpx;
        border-radius: 8rpx;
        border: solid 1rpx #F2F2F2;
    }
}

.right {
    flex: 1;
    padding: 10rpx 0;
    margin-left: 20rpx;
    justify-content: space-between;

    .title {
        color: #1A1A1A;
        font-size: 30rpx;
        font-weight: bold;
    }

    .score {
        color: #FF9F3E;
        font-size: 24rpx;
        font-weight: bold;
        margin-left: 10rpx;
    }

    .comment {
        color: #808080;
        font-size: 24rpx;
        margin-left: 30rpx;
    }

    .desc {
        color: #999999;
        font-size: 24rpx;
        margin-top: 14rpx;
    }

    .price {
        color: #333333;
        font-size: 26rpx;
        margin-top: 10rpx;
        align-items: flex-end;

        .num {
            font-size: 32rpx;
            font-weight: 500;
        }

        .unit {
            padding-left: 5rpx;
            font-size: 26rpx;
        }
    }
}
</style>
