<template>
    <view class="wrap">
        <!-- 法人信息 -->
        <view class="item">
            <view class="title">法人信息</view>
            <view class="element tn-flex-center-between">
                <view class="up_img_inp">
                    <ClUpload
                        ref="upload"
                        v-model="data.idCardFront"
                        :listStyle="data.uploadStyle"
                        :max="1"
                        fileType="image"
                        useBeforeDelete 
                        useBeforeUpload
                        @beforeDelete="beforeDelete"
                        @beforeUpload="beforeUpload">

                        <template v-slot:addImg>
                            <view class="up_box">
                                <image class="device_icon" :src="getAssetsUrl('/leyou/static/opposite.svg')" mode="scaleToFill" />
                            </view>
                        </template>
                    </ClUpload>
                </view>
                <view class="up_img_inp">
                    <ClUpload
                        ref="upload"
                        v-model="data.idCardBack"
                        :listStyle="data.uploadStyle"
                        :max="1"
                        fileType="image"
                        useBeforeUpload
                        @beforeUpload="beforeUpload1">

                        <template v-slot:addImg>
                            <view class="up_box">
                                <image class="device_icon" :src="getAssetsUrl('/leyou/static/identification.svg')" mode="scaleToFill" />
                            </view>
                        </template>
                    </ClUpload>
                </view>
            </view>
            <view class="tips tn-flex-center-around">
                <view>正面</view>
                <view>反面</view>
            </view>
            <view class="sub tn-flex-column">
                <view class="subTitle">法人姓名</view>
                <view class="tnInput info" :class="[data.organizationInfo.legalPersonName == '' ? 'empty' : '']">
                    {{ data.organizationInfo.legalPersonName || '营业执照上登记的经营者姓名' }}
                </view>
            </view>
            <view class="sub tn-flex-column">
                <view class="subTitle">法人身份证号码</view>
                <view class="tnInput info" :class="[data.organizationInfo.legalIdCardNumber == '' ? 'empty' : '']">
                    {{ data.organizationInfo.legalIdCardNumber || '与经营者姓名一致的身份证号码' }}
                </view>
            </view>
            <view class="sub tn-flex-column">
                <view class="subTitle">法人身份证有效期</view>
                <view class="tnInput info" :class="[data.organizationInfo.idCardUtcTime == '' ? 'empty' : '']">
                    {{ data.organizationInfo.idCardUtcTime || '法人身份证有效期' }}
                </view>
            </view>
        </view>
    </view>
    <BCNotify ref="bcNotify"></BCNotify>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick, computed } from 'vue'
import BCNotify from '@/components/notify/index.vue'
import { getRecognizeIdCard } from '@/api/create-api'
import ClUpload from '@/pagesCnt/uni_modules/cl-upload/components/cl-upload/cl-upload.vue'
import { uploadCertificate } from '@/api/file-api'
import { getAssetsPic } from '@/common/setPicture'

interface Data {
    uploadStyle: any
    idCardFront: any
    idCardBack: any
    organizationInfo: any
}

const data = reactive<Data>({
    uploadStyle: {
        columns: 1,
        columnGap: '0',
        rowGap:'0',
        padding:'0',
        height:'210rpx',
        radius:'20rpx'
    },
    idCardFront: [],
    idCardBack: [],
    organizationInfo: {
        legalPersonName: '',
        legalIdCardNumber: '',
        idCardUtcTime: '',
        positiveImg: '',
        negativeImg: ''
    }
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
        data.idCardFront.push(res.url)
        data.organizationInfo.positiveImg = data.idCardFront[0]
        uni.hideLoading()
        initRecognizeIdCard()
    })
}

const beforeUpload1 = (tempFile: any, next: any) => {
    uni.showLoading({
        title: '正在上传..'
    })
    uploadCertificate(tempFile.path).then((res: any) => {
        data.idCardBack.push(res.url)
        data.organizationInfo.negativeImg = data.idCardBack[0]
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
                data.organizationInfo.legalPersonName =  ''
                data.organizationInfo.legalIdCardNumber =  ''
                data.organizationInfo.idCardUtcTime =  ''
                data.organizationInfo.positiveImg =  ''
                data.organizationInfo.negativeImg =  ''
                next()
            }
        }
    })
}

const stringToTimestamp = (dateString: string) => {
    const parts = dateString.split('.') // 使用点分隔字符串
    const year = parseInt(parts[0])
    const month = parseInt(parts[1]) - 1 // 月份是从0开始的，需要减去1
    const day = parseInt(parts[2])
    const date = new Date(year, month, day)
    return Math.floor(date.getTime() / 1000) // 毫秒转换为秒
}

const initRecognizeIdCard = () => {
    if (data.idCardFront.length && data.idCardBack.length) {
        uni.showLoading({
            title: '识别中'
        })
        getRecognizeIdCard({ idCardFront: data.idCardFront[0], idCardBack: data.idCardBack[0] }).then(res => {
            data.organizationInfo = {
                idCardUtcTime: `${res.idCardUtcStart} - ${res.idCardUtcEnd}`,
                legalIdCardNumber: res.idCardNumber,
                positiveImg: res.idCardFront,
                negativeImg: res.idCardBack,
                legalPersonName: res.idCardName,
                idCardValidityType: res.idCardUtcEnd == '29991231' ? 2 : 1,
                idCardStartTime: stringToTimestamp(res.idCardUtcStart),
                idCardEndTime: stringToTimestamp(res.idCardUtcEnd)
            }
        }).catch(() => {
            bcNotify.value.error('身份证识别失败，请重试')
        }).finally(() => {
            uni.hideLoading()
        })
    }
}

defineExpose({ data })

</script>

<style lang="scss" scoped>
:deep(.tn-image-upload-item) {
    width: 316rpx !important;
    height: 210rpx !important;
}
:deep(.tn-image-upload) {
    width: 316rpx !important;
    height: 210rpx !important;
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
        // border-bottom: dashed 1rpx #E0E0E0;
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
    width: 316rpx;
    height: 210rpx;

    .up_box{
        width: 316rpx;
        height: 210rpx;
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
        width: 316rpx;
        height: 210rpx;
    }
}

.tips {
    height: 80rpx;
    font-weight: 400;
    font-size: 26rpx;
    color: #666666;
    border-bottom: dashed 1rpx #E0E0E0;
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

.empty {
    color: #9c9c9c;
}
</style>
