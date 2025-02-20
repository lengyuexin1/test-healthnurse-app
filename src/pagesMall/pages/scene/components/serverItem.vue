<template>
    <view class="manali row i-center j-between">
        <slot name="left"></slot>
        <view class="manacen row i-center">
            <view class="manaimg">
                <u-image
                    :src="getAssetsUrl('/empty/empty_icon_data.png')"
                    width="108rpx"
                    height="108rpx"
                    radius="20rpx"
                ></u-image>
            </view>
            <view class="manalef">
                <view class="row i-center">
                    <view class="mananame">血压测量</view>
                    <block>
                        <view class="manano">未激活</view>
                        <view class="manabuy">前往购买</view>
                    </block>
                </view>
                <view class="manatips">当用户发生意外情况时，按钮即可呼叫家人</view>
            </view>
        </view>
        <slot name="right"></slot>
    </view>
</template>

<script>
import { getAssetsPic } from "@/common/setPicture.js"
export default {
    computed: {
        getAssetsUrl() {
            return (str) => {
                return getAssetsPic(str)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.manali{
    margin-bottom: 20rpx;
    background-color: #FFFFFF;
    border-radius: 24rpx;
    padding: 0 40rpx 0 26rpx;
    height: 160rpx;
    box-sizing: border-box;

    .manalef{
        margin-left: 20rpx;

        .mananame{
            font-weight: 500;
            font-size: 30rpx;
            color: #FF5E5E;
        }
        .manano{
            font-weight: 400;
            font-size: 20rpx;
            color: #BEBEBE;
            margin-left: 12rpx;
        }
        .manabuy{
            font-weight: 400;
            font-size: 24rpx;
            color: #3E92FF;
            margin-left: 12rpx;
        }
        .manatips{
            font-weight: 400;
            font-size: 24rpx;
            color: #666666;
            line-height: 30rpx;
            margin-top: 6rpx;
        }
    }
}
</style>
