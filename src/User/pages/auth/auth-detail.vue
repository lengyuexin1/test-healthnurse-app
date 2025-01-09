<template>
	<view class="container">
		<view class="success_component">
			<view class="icon-wrap">
				<view class="icon tn-flex-center-center">
					<TnIcon name="check" color="#FFFFFF" size="100"/>
				</view>
				<template v-if="data.type == 'business'">
					<view class="title tn-mt-sm">商家认证成功</view>
					<view class="tips tn-mt-xs">商家认证已通过</view>
				</template>
				<template v-else-if="data.type == 'personal'">
					<view class="title tn-mt-sm">实名认证成功</view>
					<view class="tips tn-mt-xs">实名信息认证后不可修改</view>
				</template>
			</view>
			<view class="detail tn-mt-lg" v-if="data.type == 'business'">
				<view>商家名称：{{ data.businessDetail.shopName }}</view>
				<view class="tn-mt-sm">商家手机号码: {{ data.businessDetail.mobile }}</view>
				<view class="tn-mt-sm">经营者姓名：{{ data.businessDetail.adminName }}</view>
			</view>
			<view class="detail tn-mt-lg" v-else-if="data.type == 'personal'">
				<view>真实姓名：<text v-for="(item, index) in data.personalDetail.cardName">{{ formatCardName(item, index) }}</text></view>
				<view class="tn-mt-sm">证件号码: <text v-for="(item, index) in data.personalDetail.cardNumber">{{ formatCardNO(item, index) }}</text></view>
			</view>
			<view class="btn">
				<template v-if="data.type == 'personal'">
					<TnButton shape="round" class="btn" width="100%" height="90rpx" font-size="30rpx" bg-color="#EA3E1A" text-color="#FFFFFF" @tap="close">
						关闭
					</TnButton>
				</template>
				<template v-else-if="data.type == 'business'">
					<TnButton shape="round" class="close-btn" plain width="45%" height="90rpx" font-size="30rpx" border-color="#E7E7E7" text-color="#333333" @tap="close">
						关闭
					</TnButton>
					<TnButton shape="round" class="modify-btn" width="45%" height="90rpx" font-size="30rpx" bg-color="#EA3E1A" text-color="#FFFFFF" @tap="revise">
						修改认证
					</TnButton>
				</template>
			</view>
		</view>
		<BCPopup
            ref="bcPopup"
            title="操作提示"
            content="是否确认解绑？"
            subBtn="确认"
            cancelBtn="取消"
            subBtnColor="#EA3E1A"
            @clickLeftBtn="confirm"
            @clickRightBtn="cancel">
        </BCPopup>
        <BCNotify ref="bcNotify"></BCNotify>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import BCNotify from '@/components/notify/index.vue'
import BCPopup from '@/components/popup/index.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { authDetail, authUnbindShop } from '@/api/user-api'
import { homePage } from '@/api/create-api'
import { pageController } from '@bc/uni-tools'
import { gotoAuth } from '@/routes/user-routes'

interface Data {
	type: string
	businessDetail: any
	personalDetail: any
}

const data = reactive<Data>({
	type: '',
	businessDetail: {},
	personalDetail: {}
})

const bcNotify = ref()

const bcPopup = ref()

onLoad((options) => {
	data.type = options?.type

	if (options?.type == 'personal') {
		homePage({}).then((res) => {
			data.personalDetail = res
		})
	}
	else if (options?.type == 'business') {
		authDetail().then((res) => {
			data.businessDetail = res
		})
	}
})

// 格式化姓名
const formatCardName = (item: any, index: number) => {
	const len = data.personalDetail.cardName.length - 1

	if (index == len) {
		return item
	}
	return '*'
}

// 格式化身份证号码
const formatCardNO = (item: any, index: number) => {
	const len = data.personalDetail.cardNumber.length

	if (index < 4 || index > len - 5) {
		return item
	}
	return '*'
}

// 修改
const revise = () => {
	bcPopup.value.open()
}

const confirm = () => {
	bcPopup.value.close()
	uni.showLoading({ title: '加载中' })

	authUnbindShop().then(() => {
		uni.hideLoading()
		bcNotify.value.show('解绑成功')
		setTimeout(() => {
			gotoAuth(true)
		}, 1500)
	}).catch((err) => {
		bcNotify.value.error(err.message)
	})
}

const close = () => {
	pageController.back()
}

const cancel = () => {
	bcPopup.value.close()
}

</script>

<style>
page {
	background-color: white;
}
</style>
<style lang="scss" scoped>
.success_component {
	padding: 56rpx;

	.icon-wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.icon {
			width: 160rpx;
			height: 160rpx;
			background: #EA3E1A;
			border-radius: 50%;
		}
		.title {
			font-weight: bold;
			font-size: 36rpx;
			color: #000000;
		}
		.tips {
			font-weight: 400;
			font-size: 28rpx;
			color: #999999;
		}
	}

	.detail {
		padding: 30rpx 40rpx;
		border: 2rpx dashed #D8D8D8;
		font-size: 28rpx;
		color: #666666;
	}
}

.btn {
	margin-top: 50rpx;
}

.close-btn {
	margin-top: 50rpx;
	margin-right: 5%;
}

.modify-btn {
	margin-top: 50rpx;
	margin-left: 5%;
}
</style>
