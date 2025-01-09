<template>
    <view class="userInfo">
        <view class="top tn-flex-row">
            <image :src="props.item.avatar" mode="aspectFill" />
            <view class="info">
                <view class="name-wrap tn-flex-row">
                    <view class="name">{{ props.item.nickName }}</view>
                </view>
                <view class="txt">{{ props.item.sex == 1 ? '男' : '女' }}<text class="dot">·</text>{{ props.item.cityName }}</view>
                <view class=txt>IP属地：{{ props.item?.ipCityName || '--' }} <text class="gap"></text> {{ props.item?.photoAlbum.length }}张照片</view>
            </view>
        </view>
        <view class="bottom tn-text-ellipsis-3" v-if="props.item.innerMonologue">{{ props.item.innerMonologue }}</view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
    item: {
        type: Object,
        default: {}
    }
})

</script>

<style lang="scss" scoped>
.userInfo {
    // padding: 24rpx;
    // margin: 20rpx;
    border-radius: 16rpx;
    background-color: #FFFFFF;

    .top {
        image {
            width: 130rpx;
            height: 130rpx;
            border-radius: 12rpx;
        }

        .info {
            flex: 1;
            margin-left: 20rpx;

            .name-wrap {
                align-items: center;

                .name {
                    font-size: 30rpx;
                    font-weight: bold;
                    color: #333333;
                }

                .line {
                    width: 52rpx;
                    height: 30rpx;
                    margin-left: 12rpx;
                    padding: 2rpx 8rpx;
                    font-weight: 500;
                    font-size: 18rpx;
                    border-radius: 6rpx;
                }

                .online {
                    color: #683C05;
                    background: linear-gradient(90deg, #FFDB6E 0%, #ECA427 100%);
                }

                .offline {
                    color: #5D5D5D;
                    background: linear-gradient(90deg, #D9D9D9 0%, #A7A7A7 100%);
                }
            }

            .txt {
                margin-top: 12rpx;
                font-size: 24rpx;
                color: #666666;
                display: flex;
                align-items: center;
            }
        }
    }

    .bottom {
        margin-top: 24rpx;
        font-weight: 400;
        font-size: 24rpx;
        color: #999999;
    }
}

.dot {
    color: #666666;
    padding: 0 10rpx;
}

.gap {
    width: 0;
    height: 20rpx;
    margin: 0 20rpx;
    display: inline-block;
    border: 1rpx solid #DBDBDB;
}
</style>
