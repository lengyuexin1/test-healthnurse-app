<template>
    <view class="container">
        <!-- #ifdef APP || H5 -->
        <view class="top_navbar" :style="{ 'height': statusBarHeight }"></view>
        <!-- #endif -->

        <TnNavbar fixed :center="true" right-operation-width="80">
            <view class="title">{{ data.title }}</view>
            <template #back>
                <slot name="back">
                    <view class="nav_back" @click="clickNavBack">
                        <TnIcon name="left" color="#333333" size="38" :bold="true"/>
                    </view>
                </slot>
            </template>
        </TnNavbar>
        <!-- 基本信息 -->
        <view v-show="data.step === 1 && data.type">
            <BasicInfo ref="basicInfo" :type="data.type"></BasicInfo>
        </view>

        <!-- 法人信息 -->
        <view v-show="data.step === 2">
            <LegalInfo ref="legalInfo"></LegalInfo>
        </view>

        <!-- 营业执照 -->
        <view v-show="data.step === 3">
            <LicenseInfo ref="licenseInfo"></LicenseInfo>
        </view>

        <!-- 证书 -->
        <view v-show="data.step === 4">
            <PermitInfo ref="permitInfo"></PermitInfo>
        </view>

        <view class="btn-wrap">
            <view class="bottom_box">
                <view class="bottom_box_draft" @tap="last" v-if="data.step !== 1">上一步</view>
                <view class="bottom_box_btn" @tap="next">{{ data.step == 4 ? '提交(4/4)' : `下一步(${data.step}/4)` }}</view>
            </view>
        </view>
        <BCNotify ref="bcNotify"></BCNotify>
        <BCPopup
            ref="bcPopup"
            title="温馨提示"
            content="返回上一页数据将丢失，是否确认返回？"
            subBtn="确认"
            cancelBtn="取消"
            subBtnColor="#EA3E1A"
            @clickLeftBtn="back"
            @clickRightBtn="cancel">
        </BCPopup>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive,computed } from 'vue'
import { onLoad, onBackPress } from '@dcloudio/uni-app'
import BasicInfo from './components/basicInfo.vue'
import LegalInfo from './components/legalInfo.vue'
import LicenseInfo from './components/licenseInfo.vue'
import PermitInfo from './components/permitInfo.vue'
import BCNotify from '@/components/notify/index.vue'
import BCPopup from '@/components/popup/index.vue'
import { addAdminOrganization } from '@/api/create-api'
import { pageController } from '@bc/uni-tools'
import { gotoAddMerchantSuccess } from '@/routes/create-routes'
import TnNavbar from '@tuniao/tnui-vue3-uniapp/components/navbar/src/navbar.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'

interface Data {
    title: string
    type: string
    step: number
}

const data = reactive<Data>({
    title: '',
    type: '',
    step: 1
})

const bcNotify = ref()

const bcPopup = ref()

const basicInfo = ref()

const legalInfo = ref()

const licenseInfo = ref()

const permitInfo = ref()

onLoad((options: any) => {
    if (options.type == 'content') {
        data.title = '创作入驻'
    }
    else if (options.type == 'sale') {
        data.title = '商户入驻'
    }
    data.type = options.type
})

const statusBarHeight = computed(() => {
    return uni.getSystemInfoSync().statusBarHeight + 'px'
})

const clickNavBack = () => {
    bcPopup.value.open()
    return false
}

const back = () => {
    pageController.back()
}

const cancel = () => {
    bcPopup.value.close()
}

const last = () => {
    if (data.step == 1) {
        return
    }
    data.step--
}

const next = () => {
    let stepOneData
    let stepTwoData
    let stepThreeData
    let stepFourData

    if (data.step == 1) {
        stepOneData = basicInfo.value.data

        if (stepOneData.fileList.length == 0) {
            bcNotify.value.show('请上传店铺的logo')
            return
        }
        else if (!stepOneData.shopInfo.name) {
            bcNotify.value.show('店铺的名称不能为空')
            return
        }
        else if (!stepOneData.shopInfo.shortName) {
            bcNotify.value.show('店铺的简称不能为空')
            return
        }
        else if (!stepOneData.shopInfo.address) {
            bcNotify.value.show('请选择店铺的位置')
            return
        }
        else if (stepOneData.pickerMerchant.length == 0) {
            bcNotify.value.show('请选择商户类型')
            return
        }
        else if (stepOneData.businessList.length == 0) {
            bcNotify.value.show('请选择商户分类')
            return
        }
        else if (stepOneData.isSame == false) {
            if (!stepOneData.mobile) {
                bcNotify.value.show('请输入手机号')
                return
            }
            else if (!stepOneData.code) {
                bcNotify.value.show('请输入验证码')
                return
            }
        }
    }
    else if (data.step == 2) {
        stepTwoData = legalInfo.value.data

        if (stepTwoData.idCardFront.length == 0) {
            bcNotify.value.show('请上传法人身份证正面')
            return
        }
        else if (stepTwoData.idCardBack.length == 0) {
            bcNotify.value.show('请上传法人身份证反面')
            return
        }
        else if (!stepTwoData.organizationInfo.legalPersonName && !stepTwoData.organizationInfo.legalIdCardNumber) {
            bcNotify.value.show('身份证识别失败，请重新上传')
            return
        }
    }
    else if (data.step == 3) {
        stepThreeData = licenseInfo.value.data

        if (stepThreeData.fileList.length == 0) {
            bcNotify.value.show('请上传营业执照')
            return
        }
        else if (!stepThreeData.organizationInfo.name && !stepThreeData.organizationInfo.code && !stepThreeData.organizationInfo.address) {
            bcNotify.value.show('营业执照识别失败，请重新上传')
            return
        }
        else if (!stepThreeData.pickerName) {
            bcNotify.value.show('请选择主体类型')
            return
        }
    }
    else if (data.step == 4) {
        stepFourData = permitInfo.value.data

        if (stepFourData.certificates.length) {
            const hasImagesCheck = stepFourData.certificates.some(
                (v: any) => !v.images.length
            )
            const hasValidityCheck = stepFourData.certificates.some(
                (v: any) => !v.validity && !v.endTime
            )
            if (hasImagesCheck) {
                bcNotify.value.show('请上传经营许可证')
                return
            }
            else if (hasValidityCheck) {
                bcNotify.value.show('请选择许可证有效期')
                return
            }
        }
    }
    
    if (data.step == 4) {
        stepOneData = basicInfo.value.data
        stepTwoData = legalInfo.value.data
        stepThreeData = licenseInfo.value.data
        stepFourData = permitInfo.value.data
        
        const certificates = stepFourData.certificates.map((item: any) => {
            return {
                id: item.id,
                name: item.name,
                startTime: item.startTime,
                validity: item.validity == true ? 2 : 1,
                images: item.images,
                endTime: item.endTimeUnix
            }
        })

        const form = {
            mobile: stepOneData.isSame == false ? stepOneData.mobile : '',
            isSame: stepOneData.isSame ? 0 : 1,
            code: stepOneData.code,
            shopInfo: stepOneData.shopInfo,
            organizationInfo: {
                ...stepTwoData.organizationInfo,
                ...stepThreeData.organizationInfo
            } ,
            categories: [{
                categoryId: stepOneData.categories[0].categoryId,
                sonCategories: stepOneData.categories[0].sonCategories,
            }],
            certificates: certificates
        }

        addAdminOrganization(form).then(() => {
            gotoAddMerchantSuccess()
        }).catch((err: any) => {
            bcNotify.value.error(err.message)
        })
        return
    }
    data.step++
}
</script>

<style lang="scss" scoped>
// :deep(.tn-navbar__content) {
//     padding-right: 0 !important;
// }

.container {
    padding: 20rpx 20rpx 150rpx 20rpx;
}

.btn-wrap {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 10;
    width: 100%;
    height: 130rpx;
    background-color: white;
}

.bottom_box {
    display: flex;
    align-items: center;
    background-color: #FFFFFF;
    padding: 16rpx 30rpx;
    box-sizing: border-box;

    .bottom_box_draft {
        width: 250rpx;
        height: 80rpx;
        text-align: center;
        line-height: 80rpx;
        border-radius: 46rpx;
        border: 2rpx solid #E3E3E3;
        margin-right: 20rpx;
        font-size: 32rpx;
        color: #535353;
    }

	.bottom_box_btn {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
		font-size: 32rpx;
		height: 80rpx;
		color: #FFFFFF;
        background: #EA3E1A;
        line-height: 80rpx;
		border-radius: 46rpx;
    }
}

.title {
    color: rgb(51, 51, 51);
    font-size: 34rpx;
}

.nav_back {
    line-height: 34px;
    display: flex;
    align-items: center;
}
</style>
