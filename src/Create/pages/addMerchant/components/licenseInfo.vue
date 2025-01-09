<template>
    <view class="wrap">
        <!-- 法人信息 -->
        <view class="item">
            <view class="title">营业执照</view>
            <view class="element">
                <view class="up_img_inp">
                    <ClUpload
                        ref="upload"
                        v-model="data.fileList"
                        :listStyle="data.uploadStyle"
                        :max="1"
                        fileType="image"
                        useBeforeDelete
                        useBeforeUpload
                        @beforeDelete="beforeDelete"
                        @beforeUpload="beforeUpload">

                        <template v-slot:addImg>
                            <view class="up_box">
                                    <image class="device_icon" :src="getAssetsUrl('/leyou/static/papers.svg')" mode="scaleToFill" />
                                </view>
                        </template>
                    </ClUpload>
                </view>
                <view class="tips tn-flex-center-center" v-if="data.fileList.length == 0">上传营业执照</view>
            </view>
            <view class="sub tn-flex-column">
                <view class="subTitle">公司名称</view>
                <view class="tnInput info" :class="[data.organizationInfo.name == '' ? 'empty' : '']">
                    {{ data.organizationInfo.name || '请输入公司名称' }}
                </view>
            </view>
            <view class="sub tn-flex-column">
                <view class="subTitle">统一社会信用代码</view>
                <view class="tnInput info" :class="[data.organizationInfo.code == '' ? 'empty' : '']">
                    {{ data.organizationInfo.code || '请输入统一社会信用代码' }}
                </view>
            </view>
            <view class="sub tn-flex-column">
                <view class="subTitle">主体类型</view>
                <view class="tnInput info" :class="[data.pickerName == '' ? 'empty' : '']" @tap="data.openPicker = true">
                    {{ data.pickerName || '请选择' }}
                </view>
            </view>
            <view class="sub tn-flex-column">
                <view class="subTitle">营业期限</view>
                <view class="tnInput info" :class="[data.organizationInfo.validPeriod == '' ? 'empty' : '']">
                    {{ data.organizationInfo.validPeriod || '请选择' }}
                </view>
            </view>
            <view class="sub tn-flex-column">
                <view class="subTitle">经营地址</view>
                <view class="tnInput address" :class="[data.organizationInfo.address == '' ? 'empty' : '']">
                    {{ data.organizationInfo.address || '请输入经营地址' }}
                </view>
            </view>
        </view>
    </view>
    <BCNotify ref="bcNotify"></BCNotify>
    <TnPicker v-model="data.pickerName" v-model:open="data.openPicker" :data="data.pickerData" @confirm="pickerConfirm" />
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { getAssetsPic } from '@/common/setPicture'

import BCNotify from '@/components/notify/index.vue'
import TnPicker from '@tuniao/tnui-vue3-uniapp/components/picker/src/picker.vue'
import ClUpload from '@/Create/uni_modules/cl-upload/components/cl-upload/cl-upload.vue'
import { recognizeBusinessLicense } from '@/api/create-api'
import { uploadCertificate } from '@/api/file-api'

interface Data {
    fileList: any
    uploadStyle: any
    organizationInfo: any
    pickerName: string
    openPicker: boolean
    pickerData: any
}

const data = reactive<Data>({
    fileList: [],
    uploadStyle: {
        columns: 1,
        columnGap: '0',
        rowGap:'0',
        padding:'0',
        height:'350rpx',
        radius:'20rpx'
    },
    organizationInfo: {
        businessLicense: [],
        name: '',
        code: '',
        validPeriod: '',
        address: '',
        type: 3
    },
    pickerName: '企业/公司',
    openPicker: false,
    pickerData: ['企业/公司'],
})

const bcNotify = ref()

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const beforeUpload = (tempFile: any, next: any) => {
    uni.showLoading({
        title: '正在上传..'
    })
    uploadCertificate(tempFile.path).then((res: any) => {
        data.fileList.push(res.url)
        data.organizationInfo.businessLicense.push(res.url)
        uni.hideLoading()
        initRecognizeIdCard()
    })
}

/**
* 删除前钩子
* @param {Object} item 当前删除的图片或者视频信息
* @param {Number} index 当前删除的图片或视频索引
* @param {Function} next 调用此函数继续执行组件删除逻辑
* */ 
const beforeDelete = (item: any, index: any, next: any) => {
    uni.showModal({
        title: '提示信息',
        content: '确定要删除这个文件嘛？',
        success: res => {
            if (res.confirm) {
                // 清除信息
                data.organizationInfo.businessLicense = []
                data.organizationInfo.name =  ''
                data.organizationInfo.code =  ''
                data.organizationInfo.validPeriod =  ''
                data.organizationInfo.address =  ''
                next()
            }
        }
    })
}

const integerToTimestamp = (time: any) => {
    const year = Math.floor(time / 10000);
    const month = Math.floor((time % 10000) / 100) - 1; // 月份是从0开始的，需要减去1
    const day = time % 100;
    const date = new Date(year, month, day);
    return Math.floor(date.getTime() / 1000); // 毫秒转换为秒
}

const initRecognizeIdCard = () => {
    if (data.organizationInfo.businessLicense) {
        uni.showLoading({
            title: '识别中'
        })
        recognizeBusinessLicense(
            { url: data.organizationInfo.businessLicense[0] },
            {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }).then((res: any) => {
            data.organizationInfo.name = res.companyName
            data.organizationInfo.code = res.creditCode
            data.organizationInfo.address = res.businessAddress
            data.organizationInfo.validPeriod = res.validToDate == '29991231' ? '长期' : res.validPeriod,
            data.organizationInfo.periodOfValidityStart = integerToTimestamp(res.validFromDate),
            data.organizationInfo.periodOfValidityEnd = res.validToDate != '29991231' ? integerToTimestamp(res.validToDate) : '',
            data.organizationInfo.periodType = res.validToDate == '29991231' ? 2 : 1
        }).catch(() => {
            bcNotify.value.error('营业执照别失败，请重试')
        }).finally(() => {
            uni.hideLoading()
        })
    }
}

const pickerConfirm = (value: string) => {
}

defineExpose({ data })

</script>

<style lang="scss" scoped>
:deep(.tn-image-upload-item) {
    width: 650rpx !important;
    height: 328rpx !important;
    margin-right: 0;
}
:deep(.tn-image-upload) {
    width: 650rpx !important;
    height: 328rpx !important;
}

.item {
    margin-bottom: 30rpx;
    padding: 0 30rpx 30rpx 30rpx;
    border-radius: 15rpx;
    background-color: #FFFFFF;


    .title {
        height: 90rpx;
        line-height: 90rpx;
        font-size: 30rpx;
        font-weight: bold;
    }

    .subTitle {
        color: #666666;
        font-size: 28rpx;
        font-weight: bold;
    }

    .element {
        padding: 0 0 30rpx 0;
        border-bottom: dashed 1rpx #E0E0E0;
    }

    .sub {
        padding: 30rpx 0 0 0;
        border-bottom: dashed 1rpx #E0E0E0;
    }

    .other {
        padding: 0 0 30rpx 0;
        border-bottom: solid 1rpx #F6F6F6;
    }
}

.up_img_inp {
    height: 350rpx;
    .up_box{
        width: 100%;
        height: 328rpx;
        // margin: 0 30rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .up_text{
            margin-top: 24rpx;
            font-size: 24rpx;
            color: #C9C9C9;
            font-weight: 400;
        }
    }

    .device_icon {
        width: 590rpx;
        height: 328rpx;
    }
}

.tips {
    height: 68rpx;
    margin-top: 20rpx;
    font-weight: 400;
    font-size: 28rpx;
    color: #FFFFFF;
    background: #5D93FF;
    border-radius: 0rpx 0rpx 16rpx 16rpx;
}

.tnInput {
    margin-top: 20rpx;
    padding-bottom: 16rpx;
}

.info {
    height: 70rpx;
    line-height: 70rpx;
    padding-left: 16rpx;
}

.address {
    min-height: 70rpx;
    padding-left: 16rpx;
    display: flex;
    align-items: center;
}

.empty {
    color: #9c9c9c;
}
</style>
