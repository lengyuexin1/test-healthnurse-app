<template>
    <view class="wf-item-page" @click="linkinfo">
		<slot>
            <image :src="props.item.thumb" mode="scaleToFill" :style="{ wdith: props.itemwidth + 'rpx', height: props.itemwidth + 'rpx' }" />

			<view class="item-info">
                <text class="item-info-tit tn-text-ellipsis-2" v-if="!props.isHtml">{{props.item.name}}</text>
                <view class="item-info-tit item-info-width tn-text-ellipsis-2" v-else>
                    <!-- <u-parse :content="item.name"></u-parse> -->
                </view>
				<view class="tgbox row">
					<block v-for="(tag,index) in props.item.itemtaggranted" :key="tag.id">
						<view class="tgli tn-flex-center-center" v-if="tag.itemtag.name && index < 3">
							<text class="tgtex">{{tag.itemtag.name}}</text>
						</view>
					</block>
				</view>

				<view class="item-info-box row">
					<text class="item-info-pric unit">￥</text>
					<text class="item-info-pric">{{props.item.price / 100 }}</text>
				</view>

                <view class="shop tn-flex-row" @click.stop="navShopDetail">
                    <image :src="props.item.shopThumb" mode="scaleToFill" style="width: 30rpx; height: 30rpx; border-radius: 30rpx; " />
                    <view class="shop-name tn-text-ellipsis-1">{{props.item.shopName || ''}}</view>
                </view>
			</view>
		</slot>
    </view>
</template>

<script setup lang="ts">
import { getServePic } from '@/common/setPicture.ts'

const props = defineProps({
    item: {
        type: Object,
        require: true
    },
    itemwidth: {
        type: Number
    },
    isHtml: {
        type: Boolean,
        default: false
    }
})

const getServeUrl = computed(() => {
    return (serid) => {
        return getServePic(serid)
    }
})

const linkinfo = () => {
}

const navShopDetail = () => {
}

</script>

<style lang="scss" scoped>
.wf-item-page {
	background-color: #FFFFFF;
	/* #ifndef APP-NVUE */
	box-shadow: 0rpx 0rpx 20rpx rgba(0,0,0,0.02);
	/* #endif */
	border-radius: 16rpx;

    .item-pic{
        width:338rpx;
        height:338rpx;
        border-radius: 12rpx 12rpx 0 0;
    }
}

.item-info {
	padding: 16rpx 18rpx;
    .item-info-tit{
        line-height: 32rpx;
        font-size: 26rpx;
        font-weight: 500;
        color: #1A1A1A;
    }
    .item-info-width{
        width: 300rpx;
    }
    .tgbox{
        align-items: center;
        flex-wrap: wrap;
        .tgli{
            margin-top: 8rpx;
            margin-right: 8rpx;
            padding: 0 12rpx;
            height: 28rpx;
            border-radius: 6rpx;
            .tgtex{
                font-size: 22rpx;
                font-weight: 400;
                line-height: 28rpx;
                color: #EC3E3E;
            }
        }
    }
    .item-info-box{
        align-items: center;
        margin-top: 24rpx;
        display: block;
        .item-info-pric{
            font-size: 28rpx;
            font-weight: 500;
            color: #1A1A1A;

            &.unit{
                font-size: 24rpx;
            }
        }
    }
    .shop{
        margin-top: 14rpx;
        .shop-name{
            margin-left: 8rpx;
            font-size: 20rpx;
            font-weight: 400;
            color: #999999;
        }
    }
}

</style>
