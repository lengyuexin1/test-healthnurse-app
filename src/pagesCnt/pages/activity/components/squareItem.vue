<template>
    <view class="wrap tn-flex-column" @tap="clickItem">
        <view class="top">
            <image class="cover" :src="item?.thumb" mode="aspectFill" />
        </view>
        <view class="bottom tn-flex-column">
            <view class="title tn-text-ellipsis-2">
                {{ item?.name }} 
                <text class="tag" v-if="item.rewardType == 2 && item.moneyReward">总额奖金{{ (item.moneyReward * item.cntReward) / 100 }}元</text>
                <!-- <text class="tag" v-if="item.rewardType == 1 && item.moneyReward">优惠券{{ (item.moneyReward * item.cntReward) / 100 }}元</text> -->
                <text class="tag" v-if="item.status == 2">{{ endDate }}结束</text>
                <text class="start_tag" v-if="item.status == 1">未开始</text>
                <text class="end_tag" v-if="item.status == 3">已结束</text>
            </view>
            <view class="comment">{{ item?.desc }}</view>
            <view class="desc">{{ item?.cntTotal }}参与</view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { reactive, computed, defineEmits } from 'vue'
import { formattime } from '@/common/formatTime'


const props = defineProps({
    item: {
        type: Object,
        default: {}
    }
})

const endDate = computed(() => {
    return formattime(props.item.utcEnd, 'MM-DD')
})

const clickItem = () => {
    emit('clickItem', props.item)
}

const emit = defineEmits(["clickItem"])

</script>

<style lang="scss" scoped>
.wrap {
    width: 96%;
    background-color: #FFFFFF;
    margin: 30rpx 2%;
    border-radius: 16rpx;
}
.top {
    .cover {
        width: 100%;
        height: 320rpx;
        border-radius: 8rpx;
    }
}

.bottom {
    padding: 20rpx;
    background-color: #FFFFFF;
    justify-content: space-between;

    .title {
        color: #333333;
        font-size: 32rpx;
        font-weight: bold;
        display: flex;
        flex-wrap: wrap;

        .tag {
            font-size: 24rpx;
            line-height: 24rpx;
            padding: 10rpx 12rpx;
            background-color: #FFF2DF;
            color: #FF870E;
            border-radius: 8rpx;
            margin: 0rpx 8rpx;
        }
        .start_tag{
            font-size: 24rpx;
            padding: 10rpx 12rpx;
            background-color: #E8F1FC;
            color: #4487FB;
            border-radius: 8rpx;
            margin: 0rpx 8rpx;

        }
        .end_tag{
            font-size: 24rpx;
            padding: 10rpx 12rpx;
            background-color: #E5E5E5;
            color: #878787;
            border-radius: 8rpx;
            margin: 0rpx 8rpx;

        }
    }

    .comment {
        margin-top: 16rpx;
        color: #808080;
        font-size: 28rpx;
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
