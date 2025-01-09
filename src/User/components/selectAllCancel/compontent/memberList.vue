<template>
    <view class="memberList">
        <view class="left">
            <image class="thumb" :src="props.item.thumb" mode="aspectFill" />
        </view>
        <view class="right tn-flex-column">
            <view class="title tn-text-ellipsis-1">{{ props.item.name }}</view>
        </view>
    </view>
</template>

<script lang="ts" setup>

const props = defineProps({
    item: {
        type: Object,
        default: {}
    }
})

</script>

<style lang="scss" scoped>
.memberList {
    display: flex;
    align-items: center;

    .thumb {
        width: 90rpx;
        height: 90rpx;
        border-radius: 50%;
        border: solid 1rpx #F2F2F2;
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
    }
}
</style>
