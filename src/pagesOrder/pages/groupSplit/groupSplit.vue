<template>
	<view class="container">
		<z-paging
			ref="paging"
			v-model="data.dataList"
			:auto="true"
			:fixed="true"
			@query="queryList"
			:defaultPageSize="data.defaultPageSize"
			:empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
			empty-view-text="还没有数据哦~"
			:empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
		>
			<!-- <view class="splt_bg"></view> -->
			<view class="splt-con">
				<view class="splt_bg">
					<view class="splt-tit">超优惠！快来和我一起拼团</view>
					<view class="splt-info">
						<block v-if="data.orderObj">
							<image class="splt-img" :src="data.orderObj.thumb" mode="aspectFill"></image>
							<view class="splt-some">
								<view class="splt-inf-tit u-line-2">{{ data.orderObj.name }}</view>
								<view class="splt-inf-mony">
									<template v-if="data.orderObj.price">
										<text class="splt-inf-moy-tex">拼团价</text>
										<text class="splt-inf-moy-unit">￥</text>
										<text class="splt-inf-moy-price">{{ data.joinSingleInfo?.collagePrice / 100 }}</text>
										<!-- <text class="splt-inf-moy-line">￥{{ data.orderObj.price / 100 }}</text> -->
									</template>
								</view>
								<view class="splt-inf-per" v-if="data.joinSingleInfo">
									<view class="splt-inf-pin">拼</view>
									<view class="splt-inf-end">已拼出{{ data.joinSingleInfo.cntUsers }}份</view>
								</view>
							</view>
						</block>
					</view>
				</view>
				
			</view>
			<view class="splt-situa">
				<template v-if="isSuccess">
					<view class="over">
						<TnIcon name="check" color="#19be6b" size="70rpx" />
						<view class="txt">拼团已经完成！</view>
					</view>
				</template>
				<template v-else-if="isOnGoing">
					<view class="situa-tit">仅剩<text>{{ data.joinSingleInfo.cntCollage }}</text>人，快呼唤小伙伴参与拼团吧！</view>
						<view class="situa-peop tn-flex-center-between">
							<view class="situa-pep-li" v-for="(item,index) in data.joinSingleInfo.recordUsers" :key="index">
								<image class="situa-pep-img" :src="item.userThumb" mode="aspectFill"></image>
								<view class="situa-pep-up tn-flex-center-center" v-if="item.isFirst == 1">拼主</view>
							</view>

							<view class="situa-pep-li situa-pep-add tn-flex-center-center" @tap="getGods" v-if="data.joinSingleInfo.cntCollage > 0">
								<TnIcon name="add" color="#CFCFCF" size="52rpx" bold />
							</view>

							<view class="situa-pep-li situa-pep-add tn-flex-center-center" @tap="getGods" v-if="data.joinSingleInfo.cntCollage >= 2">
								<TnIcon name="add" color="#CFCFCF" size="52rpx" bold />
							</view>

						</view>
						<view class="situa-time tn-flex-center-center">
							<text class="situa-tme-lef">剩余</text>
							<TnCountDown :time="data.joinSingleInfo.utcResidual" text-color="#666666" @end="getinfo" />
							<text class="situa-tme-rig">结束</text>
						</view>
						<view class="situa-btn">
							<TnButton width="100%" height="90rpx" shape="round" bg-color="#FC3748" text-color="#FFFFFF" @tap="getGods">参与拼团</TnButton>
						</view>
				</template>
				<template v-else-if="isFail">
					<view class="over">
						<TnIcon name="warning" color="#ff9900" size="70rpx" bold />
						<view class="txt">很遗憾，该拼团活动已经结束！</view>
					</view>
				</template>

				<view class="situa-bet"></view>
				<view class="situa-rule">
					<view class="situa-rul-tit">拼团规则</view>
					<view class="situa-rul-more tn-flex-center-between">
						<view class="situa-rul-li">
							<image class="situa-rul-img" :src="getAssetsUrl('/leyou/icon/deliver.svg')" mode="aspectFill"></image>
							<view class="">开团或参加</view>
							<view class="">拼团享团购价</view>
						</view>

						<view class="situa-rul-arrow"><u-icon name="arrow-rightward" color="#DEDEDE" size="42rpx"></u-icon></view>

						<view class="situa-rul-li">
							<image class="situa-rul-img" :src="getAssetsUrl('/leyou/icon/invitation.svg')" mode="aspectFill"></image>
							<view class="">邀请朋友参与</view>
							<view class="">优惠多多</view>
						</view>

						<view class="situa-rul-arrow"><u-icon name="arrow-rightward" color="#DEDEDE" size="42rpx"></u-icon></view>

						<view class="situa-rul-li">
							<image class="situa-rul-img" :src="getAssetsUrl('/leyou/icon/pinduoduo.svg')" mode="aspectFill"></image>
							<view class="">拼团满发货</view>
							<view class="">不满退款</view>
						</view>
					</view>
				</view>
			</view>
			<view class="spli-all tn-flex-center-center">
				<view class="spli-all-line"></view>
				<view class="spli-all-tit">大家都在拼</view>
				<view class="spli-all-line"></view>
			</view>
			<view class="watebox" v-if="data.dataList.length">
				<WaterfallsFlow :wfList="data.dataList" @waterItem="clickwaterItem"></WaterfallsFlow>
			</view>

			<!-- 商品弹窗 -->
			<optionSelect ref="optSel" :type="1" :info="data.orderObj" />

		</z-paging>
		<BCNotify ref="bcNotify"></BCNotify>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { onLoad, onShow } from "@dcloudio/uni-app"
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnCountDown from '@tuniao/tnui-vue3-uniapp/components/count-down/src/count-down.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import optionSelect from './components/optionSelect.vue'
import { getAssetsPic } from '@/common/setPicture'
import WaterfallsFlow from './components/WaterfallsFlow.vue'
import { getCollageRecord, goodsDetail, productlist } from '@/api/goods-api'
import BCNotify from '@/components/notify/index.vue'
import { gotogoodsDetail } from "@/routes/goods-routes"
import { PlatformManage } from '@bc/sys'
import { gotoLogin } from '@/routes/public-routes'

interface Data {
	timeData: number
	type: number
	pageNumber: number
	pageSize: number
	orderObj: any
	defaultPageSize: number
	joinSingleInfo: any
	dataList: any
	item_id: string
	collage_id: string
	isCollageOver: boolean
}

const data = reactive<Data>({
	timeData: 0,
	type: 1,
	pageNumber: 1,
	pageSize: 10,
	orderObj: null,
	defaultPageSize: 10,
	joinSingleInfo: null,
	dataList: [],
	item_id: '',
	collage_id: '',
	isCollageOver: false	//活动是否结束
})

const paging = ref() as any

const optSel = ref()

const bcNotify = ref()

onLoad((option) => {
	PlatformManage.isRequireLogin().then((isRequireLogin) => {
		if (isRequireLogin) {
			bcNotify.value.show('您还没登录，现在去登录')
			setTimeout(() => {
				gotoLogin({})
			}, 1500)
			return
		}

		data.item_id = option?.id
		data.collage_id = option?.collage_id
		goodsDetail({ id: option?.id }).then((res: any) => {
			data.type = res.type
			data.orderObj = res
		})
		getinfo()
	})
})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

/** @return {boolean} 拼团中 */
const isOnGoing = computed(() => {
	return data.joinSingleInfo.status == 1
})

/** @return {boolean} 拼团失败 */
const isFail = computed(() => {
	return data.joinSingleInfo.status == 2
})

/** @return {boolean} 拼满团未支付 */
const unPaid = computed(() => {
	return data.joinSingleInfo.status == 3
})

/** @return {boolean} 拼团成功 */
const isSuccess = computed(() => {
	return data.joinSingleInfo.status == 4
})

const getinfo = () => {
	getCollageRecord({ recordId: data.collage_id }).then((res: any) => {
		data.joinSingleInfo = res
		data.joinSingleInfo.id = res.recordId
	}).catch((err: any) => {
		bcNotify.value.error(err.message)
		data.isCollageOver = true
	})
}

const queryList = (pageNumber: number, pageSize: number) => {
	getinfo()

	productlist({
		pageSize,
		pageNumber,
		query: {}
	}).then(res => {
		paging.value.complete(res.data)
	}).catch(() => {

	})
}

const getGods = () => {
	data.joinSingleInfo.joinTheteamType = 1
	optSel.value.godOpen(false, data.joinSingleInfo, 4)
}

const clickwaterItem = (item: any) => {
	gotogoodsDetail(item.id)
}

</script>

<style lang="scss" scoped>

	:-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
		display: none;
	}
	.splt_bg {
		// position: absolute;
		width: 100%;
		height: 460rpx;
		// overflow-x: hidden;

		// overflow-y: auto;
		background: linear-gradient(90deg, #FF5E35 0%, #FF3150 100%);
		border-radius: 0 0 20rpx 20rpx;
	}

	.splt-con{
		width: 750rpx;
		// position: relative;
		.splt-tit{
			padding: 24rpx;
			text-align: center;
			font-size: 36rpx;
			font-weight: bold;
			color: #FFFFFF;
		}
		.splt-info{
			display: flex;
			flex-direction: row;
			align-items: center;
			margin: 0 20rpx;
			padding: 24rpx;
			background-color: #FFFFFF;
			border-radius: 20rpx;
			.splt-img{
				width: 192rpx;
				height: 192rpx;
				border-radius: 12rpx;
				margin-right: 28rpx;
			}
			.splt-some{
				flex: 1;

				.splt-inf-tit{
					font-size: 30rpx;
					font-weight: bold;
					line-height: 44rpx;
					color: #333333;
					margin-bottom: 12rpx;
				}
				.splt-inf-mony{
					.splt-inf-moy-tex{
						font-size: 24rpx;
						font-weight: bold;
						color: #F51F1F;
					}
					.splt-inf-moy-unit{
						font-size: 24rpx;
						font-weight: bold;
						color: #F51F1F;
						margin-left: 4rpx;
					}
					.splt-inf-moy-price{
						font-size: 36rpx;
						font-weight: bold;
						color: #F51F1F;
					}
					.splt-inf-moy-line{
						margin-left: 10rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: #CECECE;
						text-decoration: line-through;
					}
				}
				.splt-inf-per{
					display: flex;
					flex-direction: row;
					align-items: center;
					margin-top: 10rpx;
					.splt-inf-pin{
						width: 32rpx;
						height: 32rpx;
						line-height: 32rpx;
						background-color: #F51F1F;
						border-radius: 6rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: #FFFFFF;
						text-align: center;
					}
					.splt-inf-end{
						margin-left: 10rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: #666666;
					}
				}
			}
		}

		
	}

	.splt-situa{
		width: 88%;
		// position: absolute;
		// top: 330rpx;
		// z-index: 22;
		margin: -100rpx 6% 24rpx 6%;
		padding: 24rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;

		.situa-tit{
			font-size: 28rpx;
			font-weight: bold;
			line-height: 40rpx;
			color: #333333;
			text-align: center;

			text{
				color: #F51F1F;
			}
		}
		.situa-peop{
			margin:50rpx 0 30rpx 0;
			justify-content: center;
			align-items: center;
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			.situa-pep-li{
				width: 80rpx;
				height: 80rpx;
				
				border-radius: 50%;
				margin: 0 20rpx 20rpx 20rpx;
				position: relative;

				.situa-pep-img{
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
					border: 4rpx solid #FC3848;
				}

				.situa-pep-up{
					width: 60rpx;
					height: 40rpx;
					border: 4rpx solid #FFFFFF;
					background: linear-gradient(90deg, #FF5C36 0%, #FF3150 100%);
					border-radius: 16rpx;
					font-size: 20rpx;
					font-weight: 400;
					color: #FFFFFF;
					text-align: center;
					position: absolute;
					left: 40rpx;
					margin-left: -30rpx;
					bottom: -16rpx;
				}

				&.situa-pep-add{
					background-color: #F9F9F9;
					border: 2rpx solid #DCDCDC;
				}
			}
		}
		.situa-time{
			margin-top: 34rpx;
			font-size: 28rpx;
			font-weight: bold;
			line-height: 40rpx;
			color: #333333;

			.situa-tme-lef{
				margin-right: 30rpx;
			}
			.situa-tme-rig{
				margin-left: 30rpx;
			}

			.time {
				align-items: center;

				&__custom {
					width: 22px;
					height: 22px;
					background-color: #FFEFF0;
					border-radius: 4px;
					/* #ifndef APP-NVUE */
					display: flex;
					/* #endif */
					justify-content: center;
					align-items: center;

					&__item {
						color: #F51F1F;
						font-size: 12px;
						text-align: center;
					}
				}

				&__doc {
					color: #F51F1F;
					padding: 0px 4px;
				}

				&__item {
					color: #606266;
					font-size: 15px;
				}
			}
		}
		.situa-btn{
			margin: 50rpx 14rpx 0;
		}
		.over {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			color: #333333;
			font-size: 32rpx;
			text-align: center;
			padding: 60rpx 0 60rpx 0;

			.txt {
				margin-top: 30rpx;
			}
		}
		.situa-bet{
			margin: 50rpx 14rpx 0;
			border-bottom: 2rpx solid #F2F2F2;
		}
		.situa-rule{
			margin: 30rpx 14rpx 0;
			padding-bottom: 40rpx;

			.situa-rul-tit{
				font-size: 30rpx;
				font-weight: bold;
				line-height: 40rpx;
				color: #333333;
			}

			.situa-rul-more{
				margin-top: 32rpx;

				.situa-rul-li{
					font-size: 24rpx;
					font-weight: 400;
					line-height: 30rpx;
					color: #4D4D4D;
					text-align: center;

					.situa-rul-img{
						width: 60rpx;
						height: 60rpx;
						margin-bottom: 8rpx;
					}
				}
			}
		}
	}

	.spli-all{
		margin: 0 0 20rpx 20rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #333333;

		.spli-all-tit{
			margin: 0 30rpx;
		}

		.spli-all-line{
			border-bottom: 1rpx solid #B7B7B7;
			width: 68rpx;
			height: 0rpx;
		}
	}
	.watebox{
		width: 718rpx;
		margin: 24rpx auto;
	}

</style>
