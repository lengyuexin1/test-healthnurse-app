<template>
    <view class="tn-flex-row" @tap="clickShop">
        <view class="left">
            <image class="cover" :src="item.thumb" mode="aspectFill" />
        </view>
        <view class="right tn-flex-column">
            <view class="title tn-text-ellipsis-2">{{ item.name }}</view>
            <view class="tn-flex-row" style="margin-top: 12rpx;">
                <TnRate v-model="data.rate" :min="1" :max="5" readonly gutter="0rpx" activeColor="#FF9F3E" inactive-color="#EBEBEB" size="sm" allow-half />
                <view class="score">{{ item.score }}</view>
                <view class="comment">{{ item.reputation || '--' }}%好评</view>
            </view>
            <!-- <view class="desc">{{ item.shop?.categoriesName }} | {{ item.shop?.districtName }}</view> -->
            <!-- <view class="price tn-flex-row">
                ￥
                <text class="num">{{ item.extend?.minPrice / 100 }}</text>
                <text class="unit">起</text>
            </view> -->
        </view>
    </view>
</template>

<script lang="ts" setup>
import { reactive, defineEmits } from 'vue'
import TnRate from '@tuniao/tnui-vue3-uniapp/components/rate/src/rate.vue'

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
    rate: props.item.score
})

const clickShop = () => {
    emit('clickShop', props.item.id)
}

const emit = defineEmits(['clickShop'])

</script>

<style lang="scss" scoped>
.left {
    position: relative;

    .cover {
        width: 140rpx;
        height: 140rpx;
        border-radius: 8rpx;
        border: solid 1rpx #999999;
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
