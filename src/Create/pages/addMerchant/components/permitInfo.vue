<template>
    <view class="wrap">
        <template v-if="data.certificates.length">
            <view class="item" v-for="(item, index) in data.certificates" :key="index">
                <view class="title">《{{ item.name }}》或经营备案</view>
                <view class="element">
                    <view class="up_img_inp" @tap="data.index = index">
                        <ClUpload
                            ref="upload"
                            v-model="item.images"
                            :listStyle="data.uploadStyle"
                            :max="1"
                            fileType="image"
                            useBeforeUpload
                            @beforeUpload="beforeUpload">

                            <template v-slot:addImg>
                                <view class="up_box">
                                    <image class="device_icon" :src="getAssetsUrl('/leyou/static/papers.svg')" mode="scaleToFill" />
                                </view>
                            </template>
                        </ClUpload>
                    </view>
                    <view class="tips tn-flex-center-center" v-if="item.images.length == 0">上传{{ item.name }}经营许可证</view>
                </view>
                <view class="sub tn-flex-column">
                    <view class="subTitle">许可证有效期</view>
                    <view class="tn-flex-center-between">
                        <view class="tnInput info" :class="[item.validity ? '' : item.endTime ? '' :  'empty']" @tap="clickDateTimePicker(index)">
                            {{ item.validity ? '长期有效' : item.endTime ? item.endTime : '请选择许可证有效期' }}
                        </view>
                        <view class="radio">
                            <TnCheckbox v-model="item.validity" checked-shape="square" active-color="#EA3E1A">长期</TnCheckbox>
                        </view>
                    </view>
                </view>
            </view>
        </template>
        <template v-else>
            <view class="empty-wrap">
                <TnEmpty mode="data" color="#666666">
                    <template #tips>您所选的分类不需要上传证书文件</template>
                </TnEmpty>
            </view>
        </template>
    </view>
    <BCNotify ref="bcNotify"></BCNotify>
    <TnDateTimePicker v-model="data.dateTimeValue" v-model:open="data.openDateTimePicker" @confirm="confirm" />
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { getAssetsPic } from '@/common/setPicture'

import TnDateTimePicker from '@tuniao/tnui-vue3-uniapp/components/date-time-picker/src/date-time-picker.vue'
import TnCheckbox from '@tuniao/tnui-vue3-uniapp/components/checkbox/src/checkbox.vue'
import TnEmpty from '@tuniao/tnui-vue3-uniapp/components/empty/src/empty.vue'
import BCNotify from '@/components/notify/index.vue'
import ClUpload from '@/Create/uni_modules/cl-upload/components/cl-upload/cl-upload.vue'
import { certificateList } from '@/api/create-api'
import { uploadCertificate } from '@/api/file-api'
import { addWEventsListener, GlobalEvents } from '@/events/event-registry'
import dayjs from 'dayjs'

interface Data {
    index: number
    uploadStyle: any
    certificates: any
    openDateTimePicker: boolean
    dateTimeValue: string
}

const data = reactive<Data>({
    index: 0,
    uploadStyle: {
        columns: 1,
        columnGap: '0',
        rowGap:'0',
        padding:'0',
        height:'350rpx',
        radius:'20rpx'
    },
    certificates: [],
    openDateTimePicker: false,
    dateTimeValue: ''
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
        console.log(res)
        data.certificates[data.index].images.push(res.url)
        uni.hideLoading()
    })
}

const clickDateTimePicker = (index: number) => {
    data.openDateTimePicker = true
    data.index = index
}

const confirm = (value: string) => {
    data.openDateTimePicker = false
    data.certificates[data.index].endTime = value

    const date = dayjs(value)
    data.certificates[data.index].endTimeUnix = date.unix()
}

const getCertificateList = (pack: any) => {
    certificateList(pack).then((res: any) => {
        data.certificates = res.map((item: any) => ({ startTime: Math.floor(Date.now() / 1000), images: [], validity: false, ...item }))
    })
}

const listener = () => {
    addWEventsListener(GlobalEvents.Add_Merchant_Sort, (pack) => {
        getCertificateList(pack)
    })
}

onMounted(() => {
    listener()
})

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
        height: 330rpx;
        // padding: 30rpx;
        display: flex;
        align-items: center;
        justify-content: center;

        .up_text{
            margin-top: 24rpx;
            font-size: 24rpx;
            color: #C9C9C9;
            font-weight: 400;
        }
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

.empty {
    color: #9c9c9c;
}

.empty-wrap {
    margin-top: 250rpx;
}

.radio {
    color: #666666;
    border-left: solid 4rpx #F6F6F6;
    padding-left: 30rpx;
}
</style>
