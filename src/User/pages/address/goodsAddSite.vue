<template>
	<view class="container">
        <PageTopbg bgstyle="background: linear-gradient(180deg, #DFF7EF 0%, #F2F3F5 100%);"></PageTopbg>
		<bc-page-navbar :title="data.pageTit"></bc-page-navbar>

		<view class="form-box">
            <TnForm ref="formRef" :model="data.form" label-width="130rpx">
                <TnFormItem label="联系人" prop="name">
                    <TnInput v-model="data.form.name" :underline="true" :maxlength="15" placeholder="请输入姓名" />
                </TnFormItem>
                <TnFormItem label="手机号码" prop="mobile">
                    <TnInput type="number" v-model="data.form.mobile" :underline="true" :maxlength="11" placeholder="请输入手机号码" />
                </TnFormItem>
                <TnFormItem label="所在地区" prop="area">
                    <view class="tn-flex-row" style="flex: 1;">
                        <TnInput v-model="data.form.area" :underline="true" placeholder="请选择" type="select" @click="openAuth">
                            <template #suffix>
                                <TnIcon name="right" color="#999999" size="24"></TnIcon>
                            </template>
                        </TnInput>
                    </view>
                </TnFormItem>
                <TnFormItem label="详细地址" prop="address">
                    <TnInput v-model="data.form.address" :underline="true" :maxlength="80" placeholder="请输入详细地址" />
                </TnFormItem>
            </TnForm>
		</view>
        <view class="form-box tn-flex-center-between">
            <view>设置默认地址</view>
            <TnSwitch v-model="data.form.isDefault" active-color="#EA3E1A" @change="handleSetDefault"/>
        </view>
		<!-- 底部操作按钮 -->
        <BottomSingleBtn btnName="保存" @clickBtn="saveGoodsAddress"></BottomSingleBtn>
        <yk-authpup ref="authpup" :isNativeHead="false" type="top" @changeAuth="changeAuth" permissionID="WRITE_EXTERNAL_STORAGE"></yk-authpup>
        <BCNotify ref="bcNotify"></BCNotify>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { onLoad, onShow } from "@dcloudio/uni-app"
import { addAddress, editAddress} from '@/api/goods-api'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnForm from '@tuniao/tnui-vue3-uniapp/components/form/src/form.vue'
import TnFormItem from '@tuniao/tnui-vue3-uniapp/components/form/src/form-item.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import TnSwitch from '@tuniao/tnui-vue3-uniapp/components/switch/src/switch.vue'
import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import BottomSingleBtn from '@/components/bottomSingleBtn/index.vue'
import BCNotify from '@/components/notify/index.vue'
import { pageController } from '@bc/uni-tools'

// 表单字段元素
const form = {
    name: '',
    mobile: '',
    code: '',
    area: '',
    address: '',
    lng: '',
    lat: '',
    detail: '',
    isDefault: false
}

interface Data {
    type: number
    form: any
    disabled: boolean
    show: boolean
    tips: string
    disabled1: boolean
    pageTit: string
    seleType: boolean
}

const data = reactive<Data>({ 
    type: 0,
    form: {
        ...form
    },
    // 按钮禁用
    disabled: false,
    show: false,
    tips: '',
    disabled1: false,
    pageTit: '',
    seleType: false
})

const authpup = ref()

const bcNotify = ref()

const openAuth = () => {
    // #ifdef APP-PLUS
    authpup.value.open() //调起自定义权限目的弹框,具体可看示例里面很详细
    // #endif
    // #ifndef APP-PLUS
    map()
    // #endif
}

//用户授权权限后的回调
const changeAuth = () => {
    //这里是权限通过后执行自己的代码逻辑
    console.log('权限已授权，可执行自己的代码逻辑了')
    map()
}

const map = () => {
    uni.chooseLocation({
        success: (res) => {
            console.log(res)
            data.form.area = res.address
            data.form.lat = res.latitude
            data.form.lng = res.longitude
        }
    })
}

// 默认地址
const handleSetDefault = (e: any) => {
    data.form.isDefault = e
}

const isValidPhoneNumber = (phoneNumber: any) => {
    const regex = /^1[0-9]{10}$/
    return regex.test(phoneNumber)
}

const saveGoodsAddress = () => {
    if (data.form.name == '') {
        bcNotify.value.show('联系人姓名不能为空')
        return
    }
    if (data.form.mobile == '') {
        bcNotify.value.show('手机号码不能为空')
        return
    }
    if (!isValidPhoneNumber(data.form.mobile)) {
        bcNotify.value.show('请填写正确的手机号码')
        return
    }
    if (data.form.area == '') {
        bcNotify.value.show('请所在地区不能为空')
        return
    }
    if (data.form.address == '') {
        bcNotify.value.show('详细地址不能为空')
        return
    }
    const postData = {
        area: data.form.area,
        mobile: data.form.mobile,
        name: data.form.name,
        lat: data.form.lat,
        lng: data.form.lng,
        isDefault: data.form.isDefault ? 1 : 0,
        address: data.form.address
    }
    if (data.type == 1) {	//新增地址
        addAddress(postData).then(() => {
            bcNotify.value.show('保存成功')
            setTimeout(() => {
                pageController.back()
            }, 1200)
        }).catch((err) => {
            bcNotify.value.error(err.message)
        })
    }
    if (data.type == 2) {	//编辑地址
        editAddress({
            ...postData,
            addressId: data.form.id
        }).then(() => {
            bcNotify.value.show('修改成功')
            setTimeout(() => {
                pageController.back()
            }, 1200)
        }).catch((err) => {
            bcNotify.value.error(err.message)
        })
    }
}

onLoad((options) => {
    console.log(options);
    data.type = options?.type
    data.seleType = !!options?.seleType
    if (options?.type == 2) {
        data.pageTit = '编辑地址'
        if (options?.item) {
            const item = JSON.parse(options?.item)
            data.form = {
                ...data.form,
                ...item,
                isDefault: !!item.isDefault
            }
        }
        else {
            data.form = {
                ...form
            }
        }
    }
    else {
        data.pageTit = '新增地址'
    }
})

</script>


<style lang="scss" scoped>
	// 单选框
	.item-radio {
		font-size: 28rpx;
		margin-left: auto;

		.radio {
			vertical-align: middle;
			transform: scale(0.76)
		}

		.text {
			vertical-align: middle;
		}
	}

	.form-box {
        margin: 20rpx;
		padding: 20rpx;
        background-color: white;
        border-radius: 20rpx;
        position: relative;
        z-index: 10;
	}

	.form-wrapper {
		padding: 0rpx 40rpx;
		box-shadow: 0 1rpx 5rpx 0px rgba(0, 0, 0, 0.05);
		border-radius: 16rpx;
		background: #fff;
	}

	// 底部操作栏
	.footer-fixed {
		position: fixed;
		bottom: var(--window-bottom);
		left: 0;
		right: 0;
		min-height: 120rpx;
		z-index: 11;
		// box-shadow: 0 -4rpx 40rpx 0 rgba(151, 151, 151, 0.24);
		background: #fff;

		// 设置ios刘海屏底部横线安全区域
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);

		.btn-wrapper {
			height: 130rpx;
			display: flex;
			align-items: center;
			padding: 0 30rpx;
		}

		.btn-item {
			flex: 1;
			font-size: 28rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			color: #fff;
			border-radius: 50rpx;
		}

		.btn-item-main {
			background: #29C86F;
		}

	}
</style>
