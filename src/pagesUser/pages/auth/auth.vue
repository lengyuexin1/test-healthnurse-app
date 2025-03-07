<template>
	<view class="container">
        <view class="user tn-flex-row">
			<image class="avatar" :src="data.userInfo.avatar" mode="scaleToFill" />
			<text class="name">{{ data.userInfo.nickname }}</text>
		</view>
		<view class="person tn-flex-center-between tn-mt-xl">
			<view class="tn-flex-row">
				<image class="icon" :src="getAssetsUrl('/leyou/icon/person_auth.png')" mode="scaleToFill" />
				<view class="tn-ml-sm">
					<view class="title tn-mt-xs">个人身份认证</view>
					<view class="tips tn-mt-sm">实名认证</view>
					<view class="tips">身份信息已认证</view>
				</view>
			</view>
			<TnButton shape="round" class="btn" width="132rpx" height="60rpx" font-size="28rpx" bg-color="#FFFFFF" :text-color="isPersonalBinding" @tap="toPersonAuth">
				{{ personalBtnTxt }}
			</TnButton>
		</view>
		<view class="business tn-flex-center-between tn-mt">
			<view class="tn-flex-row">
				<image class="icon" :src="getAssetsUrl('/leyou/icon/business_auth.png')" mode="scaleToFill" />
				<view class="tn-ml-sm">
					<view class="title tn-mt-xs">商家认证</view>
					<view class="tips tn-mt-sm">关联商家</view>
					<view class="tips">适用于保椿商户端已有账号</view>
				</view>
			</view>
			<TnButton shape="round" class="btn" width="132rpx" height="60rpx" font-size="28rpx" bg-color="#FFFFFF" :text-color="isBusinessBinding" @tap="toBusinessAuth">
				{{ businessBtnTxt }}
			</TnButton>
		</view>
        <BCNotify ref="bcNotify"></BCNotify>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { getAssetsPic } from '@/common/setPicture'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import { gotoAuthDetail, gotoBusinessAuth } from '@/routes/user-routes'
import { authDetail } from '@/api/user-api'
import { PlatformManage } from '@bc/sys'
import { homePage, initFaceVerifyIdPlus, certificateByCertifyId } from '@/api/create-api'
import BCNotify from '@/components/notify/index.vue'

interface Data {
	getClient: string
	userInfo: any
	personal: any
	businessDetail: any
}

const data = reactive<Data>({
	getClient: '',
	userInfo: {},
	personal: {},
	businessDetail: {}
})

const bcNotify = ref()

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

/** @return {string} 个人认证 */
const isPersonalBinding = computed(() => {
	return data.personal.cardId == null ? '#EA3E1A' : '#656565'
})

/** @return {string} 商家认证 */
const isBusinessBinding = computed(() => {
	return data.businessDetail.isBinding == 0 ? '#EA3E1A' : '#656565'
})

const personalBtnTxt = computed(() => {
	return !data.personal.cardId ? '去认证' : '去查看'
})

const businessBtnTxt = computed(() => {
	return data.businessDetail.isBinding == 0 ? '去认证' : '去查看'
})

onLoad(() => {
	// #ifdef MP-WEIXIN || H5
	data.getClient = 'WEIXIN'
		// #endif

    // #ifdef APP-PLUS
    data.getClient = 'APP'
    // #endif
})

onShow(() => {
	getAuthData()
})

const getAuthData = () => {
	PlatformManage.getToken().then((res) => {
		data.userInfo = res
	})
	homePage({}).then((res) => {
		data.personal = res
	})
	authDetail().then((res) => {
		data.businessDetail = res
	}).catch((err) => {
		bcNotify.value.error(err.message)
	})
}

const toPersonAuth = () => {
	if (data.personal.cardId) {
		gotoAuthDetail('personal')
		return
	}

	// #ifdef MP-WEIXIN || H5
	bcNotify.value.show('因技术升级原因,请您前往保椿照护APP进行实名认证')
	// #endif

	// #ifdef APP-PLUS
	const n = uni.requireNativePlugin('AP-FaceDetectModule')

	const platform = uni.getSystemInfoSync().platform

	let metaInfo = n.getMetaInfo()
	if (platform == 'ios') {
		metaInfo=JSON.stringify(metaInfo)
	}
	console.log('metaInfo',metaInfo)
	initFaceVerifyIdPlus({ metaInfo }).then((res: any) => {
		// this.certifyId = res.certifyId
		n.verify({ certifyId: res.certifyId}, (v: any) => {
			if(v.code == 1000) {
				certificateByCertifyId({
					certifyId: res.certifyId
				}).then((res: any) => {
					console.log('实名认证提交成功',res)
					bcNotify.value.show(getResultString(v.code))
					getAuthData()
				}).catch((err: any) => {
					console.log('实名认证提交失败',err)
					bcNotify.value.error(getResultString(v.code))
				})
				return
			}
			bcNotify.value.error(getResultString(v.code))
		})
	}).finally(() => {
		bcNotify.value.show('正在调起人脸识别')
	}).catch(() => {
		bcNotify.value.error('人脸识别调用失败')
	})
	// #endif
}

const getResultString = (code: any) => {
    const statusCode = {
        1000: '认证成功',
        1001: '系统错误',
        1003: '验证中断',
        2002: '网络错误',
        2003: '客户端设备时间错误',
        2006: '认证失败',
    }
    return statusCode[code]
}

const toBusinessAuth = () => {
	if (data.businessDetail.isBinding == 1) {
		gotoAuthDetail('business', true)
	}
	else {
		gotoBusinessAuth(true)
	}
}

</script>

<style>
page {
	background-color: white;
	padding: 30rpx;
}
</style>
<style lang="scss" scoped>
.user {
	align-items: center;
	.avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
	}
	.name {
		margin-left: 24rpx;
		font-weight: bold;
		font-size: 36rpx;
		color: #202020;
	}
}

.person,
.business {
	width: 690rpx;
	padding: 30rpx;
	border-radius: 20rpx 20rpx 20rpx 20rpx;

	.icon {
		width: 136rpx;
		height: 136rpx;
	}
	.title {
		font-size: 32rpx;
		font-weight: bold;
		color: #202020;
	}
}

.person {
	background: #E2EFFF;

	.tips {
		font-size: 24rpx;
		color: #8A9FB9;
	}
}
.business {
	background: #FDEBD4;

	.tips {
		font-size: 24rpx;
		color: #BBA07D;
	}
}
</style>
