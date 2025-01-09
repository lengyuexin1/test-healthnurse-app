<template>
	<view class="container">
        <view class="input_component" v-if="data.step == 1">
			<view class="title">商家手机号码：</view>
			<view class="input">
				<TnInput type="number" :maxlength="11" height="108rpx" :clearable="true" v-model="data.mobile" placeholder="请输入手机号码" custom-class="inp" >
                    <template #prefix>
                        <view class="prefix">+86</view>
                    </template>
                </TnInput>
				<TnInput type="number" :maxlength="4" height="108rpx" :clearable="true" v-model="data.code" placeholder="验证码" custom-class="inp">
                    <template #suffix>
                        <TnButton bg-color="white" text-color="#41A0FE" font-size="26rpx" :disabled="data.countdown > 0" @tap="getCode">
                            {{ data.countdown > 0 ? `${data.countdown}秒后重新获取` : '获取验证码' }}
                        </TnButton>
                    </template>
                </TnInput>
			</view>
			<view class="tn-mt-xl">
				<TnButton shape="round" class="btn" width="100%" height="90rpx" font-size="32rpx" bg-color="#EA3E1A" text-color="#FFFFFF" @tap="next">
					下一步
				</TnButton>
			</view>
		</view>

		<view class="info_component" v-else-if="data.step == 2">
			<view class="info">认证商家后，修改商家认证需重新提交审核，请谨慎确认一下信息：</view>
			<view class="list">
				<view class="tn-flex-row tn-mt-lg">
					<view class="desc">商家名称：</view>
					<view>{{ data.businessInfo.shopName }}</view>
				</view>
				<view class="tn-flex-row tn-mt-lg">
					<view class="desc">商家手机号码：</view>
					<view>{{ data.businessInfo.mobile }}</view>
				</view>
				<view class="tn-flex-row tn-mt-lg">
					<view class="desc">经营者名称：</view>
					<view>{{ data.businessInfo.adminName }}</view>
				</view>
				<view class="btn">
					<TnButton shape="round" class="btn" width="100%" height="90rpx" font-size="30rpx" bg-color="#EA3E1A" text-color="#FFFFFF" @tap="submit">
						确认提交
					</TnButton>
				</view>
			</view>
		</view>

		<view class="success_component" v-else>
			<view class="icon-wrap">
				<view class="icon tn-flex-center-center">
					<TnIcon name="check" color="#FFFFFF" size="100"/>
				</view>
				<view class="title tn-mt-sm">商家认证成功</view>
				<view class="tips tn-mt-xs">商家认证已通过</view>
			</view>
			<view class="detail tn-mt-lg">
				<view>商家名称：{{ data.businessInfo.shopName }}</view>
				<view class="tn-mt-sm">商家手机号码: {{ data.businessInfo.mobile }}</view>
				<view class="tn-mt-sm">经营者姓名: {{ data.businessInfo.adminName }}</view>
			</view>
			<view class="btn">
				<TnButton shape="round" class="btn" width="100%" height="90rpx" font-size="30rpx" bg-color="#EA3E1A" text-color="#FFFFFF" @tap="close">
					关闭
				</TnButton>
			</view>
		</view>
		
        <BCNotify ref="bcNotify"></BCNotify>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import BCNotify from '@/components/notify/index.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { userGetCode } from '@/api/open-api'
import { authDetail, authShopBinding, authShopVerifyBinding } from '@/api/user-api'
import { gotoAuth } from '@/routes/user-routes'

interface Data {
	step: number
	mobile: string
	countdown: number
	code: string
	businessInfo: any
}

const data = reactive<Data>({
	step: 1,
	mobile: '',
	countdown: 0,
	code: '',
	businessInfo: {}
})

const bcNotify = ref()

// 获取验证码
const getCode = () => {
	if (!data.mobile) {
        bcNotify.value.show('请输入手机号码')
        return
    }
    userGetCode({ mobile: Number(data.mobile) }).then(() => {
        bcNotify.value.show('验证码发送成功')
        if (data.countdown === 0) {
            data.countdown = 60
            const intervalId = setInterval(() => {
                if (data.countdown > 0) {
                    data.countdown--
                }
                else {
                    clearInterval(intervalId)
                }
            }, 1000)
        }
    })
}

// 下一步
const next = () => {
	if (!data.mobile) {
		bcNotify.value.show('手机号码不能为空')
		return
	}
	else if (!data.code) {
		bcNotify.value.show('验证码不能为空')
		return
	}
	authShopBinding({ mobile: data.mobile, code: data.code }).then((res) => {
		authDetail().then((res) => {
			data.businessInfo = res
			data.step = 2
		})
	}).catch((err) => {
		bcNotify.value.error(err.message)
	})
}

// 确认提交
const submit = () => {
	uni.showLoading({
		title: '提交中...'
	})
	authShopVerifyBinding({}).then((res) => {
		data.step = 3
	}).catch((err) => {
		bcNotify.value.error(err.message)
	}).finally(() => {
		uni.hideLoading()
	})
}

const close = () => {
	gotoAuth(true)
}

</script>

<style>
page {
	background-color: white;
}
</style>
<style lang="scss" scoped>
.input_component {
	padding: 40rpx;

	.title {
		font-weight: bold;
		font-size: 36rpx;
		color: #000000;
	}
	.input {
		.inp {
			padding-left: 40rpx;
			margin-top: 30rpx;
			background-color: #F3F5F7;
			border-radius: 16rpx;
		}

		.prefix {
			border-right: 1rpx solid #E0E0E0;
			padding-right: 10rpx;
		}
	}
}

.info_component {
	.info {
		padding: 30rpx;
		color: #EB9B10;
		font-size: 28rpx;
		background: #FFF2DF;
	}
	.list {
		padding: 40rpx;
		color: #666666;
		font-size: 28rpx;

		.desc {
			width: 220rpx;
			
		}
	}
}

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
</style>
