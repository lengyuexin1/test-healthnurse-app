<template>
	<view class="content">
		<TnPopup v-model="coupshow" open-direction="bottom" round="20">
			<view class="oldman-head">
				<view class="oldman-close" @click="coupshow = false">
					<TnIcon name="close" size="32"></TnIcon>
				</view>
				<view class="head-tit">优惠劵</view>
			</view>
			<scroll-view scroll-y style="height: 900rpx;padding: 20rpx 0;">
				<view class="coupbox column">
					<view class="coupli row" v-for="(item, index) in list[0]" :key="index">
						<view class="couplef row">
							<view class="">
								<view class="coupic">
									<template v-if="!typeList.includes(item.typeId)">
										<text class="unit">￥</text>{{ item.cfgOffer / 100 }}
									</template>
									<template v-else>
										{{ item.cfgOffer / 100 }}<text class="unit">折</text>
									</template>
								</view>
								<view class="couptpe">{{ item.typeName }}</view>
							</view>
							<view class="coupinfo">
								<view class="couptit u-line-1">{{ item.name }}</view><!-- 购买服务立减 -->
								<view class="couptie">有效期至 <view>{{ formatDate(item.utcEnd)  }}</view>
								</view>
							</view>
						</view>
						<view class="coupbtn">
							<TnButton shape="round" font-size="26" width="156rpx" height="60rpx" @click="receCoup(item)"
							bg-color="#ff5b39" text-color="#fff" :disabled="item.status != 10"> 
							{{ statelist[item.status] }}</TnButton>
						</view>
					</view>
					<template v-if="list[1] && list[1].length > 0">
						<view class="coupmore">更多优惠</view>
						<view class="coupli row" v-for="(item, index) in list[1]" :key="index">
							<view class="couplef row">
								<view class="">
									<view class="coupic">
										<template v-if="!typeList.includes(item.typeId)">
											<text class="unit">￥</text>{{ item.cfgOffer / 100 }}
										</template>
										<template v-else>
											{{ item.cfgOffer / 100 }}<text class="unit">折</text>
										</template>
									</view>
									<view class="couptpe">{{ item.type }}</view>
								</view>
								<view class="coupinfo">
									<view class="couptit u-line-1">{{ item.typeName }}</view><!-- 购买服务立减 -->
									<view class="couptie">有效期至 <view>{{ formatDate(item.utcEnd) }}</view>
									</view>
								</view>
							</view>
							<view class="coupbtn">
								<TnButton shape="round" font-size="26" width="156rpx" height="60rpx" bg-color="#ff5b39" text-color="#fff" disabled> 
									{{ statelist[item.status] }}</TnButton>
							</view>
						</view>
					</template>
				</view>
			</scroll-view>
			<view class="oneclaim row i-center j-center" v-if="isOnceClick">
				<TnButton shape="round" font-size="28" @click="checkAllCoupon" width="100%" height="90rpx" bg-color="#ff5b39"
					text-color="#fff">一键领取</TnButton>
			</view>
			<BCNotify ref="bcNotify"></BCNotify>

		</TnPopup>
	</view>
</template>

<script lang="ts" setup>
import dayjs from "dayjs"
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import BCNotify from '@/components/notify/index.vue'


import { takeCoupon } from '@/api/order-api'
import { ref, reactive, computed } from "vue"

const props = withDefaults(defineProps<{
	list:any
}>(),{
	list:[]
})

const bcNotify = ref()

const emit = defineEmits(["openSkunotice"])


const coupshow = ref<boolean>(false)
const statelist = ref<any>({
	0: '未开始',
	1: '已领取',
	10: '立即领取',
	20: '已结束',
	30: '已关闭'
})
const typeList = [1000004, 1000002, 10004, 10002]
const formatDate = (datetime : number) => {
		return datetime ? dayjs.unix(datetime).format("YYYY-MM-DD HH:mm") : ""
	}
const isOnceClick = computed(() => {
	return props.list[0] && props.list[0].filter((item:any) => item.status === 10).length > 0
})
// 打开弹窗
const openCpup = (item:any) => {
	coupshow.value = true
}


// 领券
const receCoup = (item:any) => {
	if (item.status == 1) { return }
	// 上报（照护原先的上报还不确定乐悠是否有上报需求，且共用可能会出现不知道哪个app进行上报的问题）
	// this.$store.dispatch('statistics/spotBowling', {
	// 	event_id: 25,
	// 	arg_id: item.id
	// })

	takeCoupon({ couponId: item.id }).then(() => {
		bcNotify.value.show('领取成功')
		item.status = 1
	}).catch((err:any) => {
		bcNotify.value.error(err.message)
	})
}
// 一键领取
const checkAllCoupon = () => {
	if (props.list.length && props.list[0].length) {
		const promiseList = props.list[0].filter((x:any) => x.status != 1).map((x:any) => takeCoupon({ couponId: x.id }).then(() => {
			x.status = 1
		}))
		if (promiseList.length > 0) {
			Promise.all(promiseList).then(() => {
				bcNotify.value.show('领取成功')
			})
			return
		}
	}
}

// 下单领卷
const placegetCoupon = () => {
	if (props.list.length && props.list[0].length) {
		const promiseList = props.list[0].filter((x:any) => x.status != 1).map((x:any) => takeCoupon({ couponId: x.id }).then(() => {
			x.status = 1
		}))
		if (promiseList.length > 0) {
			Promise.all(promiseList).then(() => {
				// 打开sku面板的提示
				emit('openSkunotice')
			})
			return
		}
	}
}

defineExpose({ openCpup, placegetCoupon })
</script>

<style lang="scss" scoped>
.oldman-head {
	padding: 40rpx 40rpx 20rpx;
	position: relative;

	.oldman-close {
		position: absolute;
		right: 40rpx;
		top: 50rpx;
	}

	.head-tit {
		font-size: 36rpx;
		font-weight: bold;
		color: #333333;
		text-align: center;
	}

	.head-tip {
		font-size: 28rpx;
		font-weight: 400;
		color: #999999;
		margin-top: 30rpx;
	}
}

.coupbox {
	align-items: center;
	justify-content: center;
	padding: 0rpx 30rpx;
	box-sizing: border-box;

	.coupmore {
		width: 630rpx;
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
		margin: 20rpx 0;
	}

	.coupli {
		width: 100%;
		height: 180rpx;
		background: #FFF6E9;
		border-radius: 20rpx;
		padding: 30rpx;
		margin: 0 30rpx;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20rpx;

		.couplef {
			align-items: center;

			.coupic {
				// font-size: 64rpx;
				font-size: 48rpx;
				font-weight: bold;
				color: #FF1616;

				.unit {
					// font-size: 40rpx;
					font-size: 24rpx;
				}
			}

			.couptpe {
				width: 106rpx;
				height: 38rpx;
				background: #FFE5C4;
				border-radius: 6rpx;
				font-size: 22rpx;
				font-weight: 400;
				line-height: 38rpx;
				color: #FF8A23;
				text-align: center;
			}

			.coupinfo {
				margin-left: 36rpx;

				.couptit {
					font-size: 30rpx;
					font-weight: bold;
					color: #333333;
				}

				.couptie {
					font-size: 26rpx;
					font-weight: 400;
					color: #999999;
					margin-top: 8rpx;
				}
			}
		}

		.coupbtn {
			width: 150rpx;
		}
	}
}

.oneclaim {
	margin: 30rpx;
}
</style>
