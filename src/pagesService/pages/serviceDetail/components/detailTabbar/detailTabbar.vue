<template>
	<view class="navigation">
		<view class="left">
			<view class="item" @tap="bottomClick('linkAttendShop')">
				<image class="imgIcon" :src="getAssetsUrl('/platform/serSell.svg')"></image>
				<view class="text u-line-1">进店</view>
			</view>
			<view class="item" @tap="bottomClick('getCoupon')">
				<image class="imgIcon" :src="getAssetsUrl('/platform/serRed.svg')"></image>
				<view class="text u-line-1">卡券/红包</view>
			</view>
			<view class="item" @tap="bottomClick('linkCart')">
				<image class="imgIcon" :src="getAssetsUrl('/platform/serCard.svg')"></image>
				<view class="text u-line-1">购物车</view>
			</view>
		</view>
		<view class="right">
			<view class="btn u-line-1" @tap="bottomClick('addCart')" v-if="props.canConsult == 0">加入购物车</view>
			<view class="btn u-line-1" @tap="bottomClick('balanceOrder')">{{btnTxt}}</view>
			<view class="btn u-line-1" @tap="bottomClick('balanceReserva')" v-if="props.canConsult == 1">预约</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from "vue"
import { getAssetsPic } from "@/common/setPicture"
// import { gotoLogin } from "@/route/public-routes"


interface Events {
    (e: 'formBtn', type: number | boolean): void,
	(e: 'linkShop') :void,
	(e: 'openCoupon') :void,
	(e: 'goCart') :void,
	(e: 'clickTab', type: string) : void,
	(e: 'balanceReserva', type: string) : void
}
const emit = defineEmits<Events>()


const props = withDefaults(defineProps<{
	btnTxt:string,
	canConsult:number,
}>(), {
    btnTxt: '立即下单',
    canConsult: 0
})

const getAssetsUrl = computed(() => (url:string) => {
    return getAssetsPic(url)
})

const bottomClick = (linkType:string) => {
    emit('clickTab', linkType)
}


</script>

<style lang="scss" scoped>
	.navigation {
		/* position: fixed;
		bottom: 0;
		left: 0; */
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		border-top: solid 2rpx #f2f2f2;
		background-color: #ffffff;

		.left {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 24rpx;
			font-weight: 400;
			color: #666666;

			.item {
				padding-left: 20rpx;
				display:flex;
				align-items:center;
				justify-content:center;
				flex-direction: column;

				.text{
                    font-size: 24rpx;
                    font-weight: 400;
                    color: #888888;
				}

			}
		}

		.right {
			margin: 25rpx 0;
			display: flex;
			font-size: 28rpx;
			align-items: center;
			padding-right: 25rpx;
			justify-content: space-between;

			.btn {
				line-height: 76rpx;
				width: 200rpx;
				height: 76rpx;
				font-size: 30rpx;
				text-align: center;
                font-weight: 400;
                color: #FFFFFF;

                &:first-child{
                    background: linear-gradient(90deg, #FFD07E 0%, #FFA033 100%);
                    border-radius: 46rpx 0rpx 0rpx 46rpx;
                }
                &:last-child{
                    background: linear-gradient(90deg, #33CC85 0%, #04AF50 100%);
                    border-radius: 0rpx 46rpx 46rpx 0rpx;
                }
			}
		}
	}
	.imgIcon {
		width: 68rpx;
		height: 68rpx;
	}
</style>
