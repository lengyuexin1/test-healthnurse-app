<template>
    <view>
        <view class="top">
            <view class="title">投诉/建议原因</view>
            <view class="pick tn-flex-center-between" @tap="clickPick(1)">
                <view>问题类型</view>
                <view>
                    <text :class="[data.typeName ? 'noEmpty' : 'empty']">{{ data.typeName || '请选择问题类型' }}</text>
                    <TnIcon name="right" color="#CCCCCC" />
                </view>
            </view>
            <view class="pick tn-flex-center-between" @tap="clickPick(2)">
                <view>问题原因</view>
                <view>
                    <text :class="[data.reasonName ? 'noEmpty' : 'empty']">{{ data.reasonName || '请选择问题原因' }}</text>
                    <TnIcon name="right" color="#CCCCCC"/>
                </view>
            </view>
        </view>
        <view class="bottom">
            <view class="title">问题描述</view>
            <view>
                <TnInput custom-class="textarea" v-model="data.content" type="textarea" height="300rpx" :maxlength="200" show-word-limit placeholder="请描述你使用过程中遇见的问题，或需要投诉的详细内容，我们会优先帮您处理" />
            </view>
            <view class="cover">
                <view class="desc">请上传图片，最多可上传8张</view>
                <imgUpload v-model:imageArr="data.fileList" :limit="8" ref="imgUploadref">
                    <template #uploadBtn>
                        <view @click="openUp" class="up_box">
                            <view class="up_icon">
                                <TnIcon name="add" color="#C9C9C9" size="60"/>
                            </view>
                            <view class="up_text">图片</view>
                        </view>
                    </template>
                </imgUpload>
            </view>
        </view>
        <BottomSingleBtn btnName="提交" @clickBtn="clickSubmit"></BottomSingleBtn>
        <TnPicker v-model="data.pickValue" v-model:open="data.openPicker" :data="data.pickerData" @confirm="typeConfirm" />
        <TnPicker v-model="data.reasonPickValue" v-model:open="data.reasonOpenPicker" :data="data.reasonPickerData" @confirm="reasonConfirm" />
        <BCNotify ref="bcNotify"></BCNotify>
    </view>
</template>
    
<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import ImgUpload from '@/components/upload/img-upload.vue'
import BottomSingleBtn from '@/components/bottomSingleBtn/index.vue'
import BCNotify from '@/components/notify/index.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import TnPicker from '@tuniao/tnui-vue3-uniapp/components/picker/src/picker.vue'
import { getTypeReason, saveTypeReason } from '@/api/user-api'
import { pageController } from '@bc/uni-tools'

interface Data {
    content: string
    fileList: any
    pickValue: string
    pickerData: any
    openPicker: boolean

    reasonPickValue: string
    reasonPickerData: any
    reasonOpenPicker: boolean

    typeReason: any
    typeId: number
    typeName: string
    reasonName: string
    reasonId: number

    tempData: any
}

const data = reactive<Data>({
   content: '',
   fileList: [],
   pickValue: '',
   pickerData: [],
   openPicker: false,

   reasonPickValue: '',
   reasonPickerData: [],
   reasonOpenPicker: false,

   typeReason: [],
   typeId: 0,
   typeName: '',
   reasonName: '',
   reasonId: 0,

   tempData: {}
})

const imgUploadref = ref()

const bcNotify = ref()

const clickPick = (type: number) => {
    if (type == 1) {
        getTypeReason({ industryId: '0' }).then((res) => {
            console.log(res)
            data.typeReason = res
            data.pickerData = res.map((item) => item.title)
            data.openPicker = true
        })
    }
    if (type == 2) {
        if (data.typeId == 0) {
            bcNotify.value.show('请选择问题类型')
            return
        }
        data.reasonOpenPicker = true
    }
}

const typeConfirm = (value: any) => {
    data.typeName = value

    data.tempData = data.typeReason.filter((item: any) => item.title == value)
    
    data.typeId = data.tempData[0].typeId

    if (data.tempData[0].reasons.length) {
        data.reasonPickerData = data.tempData[0].reasons.map((item: any) => item.title)
    }
}

const reasonConfirm = (value: any) => {
    data.reasonName = value

    const filter = data.tempData[0].reasons.filter((item: any) => item.title == value)
    data.reasonId = filter[0].id
}

const clickSubmit = () => {
    if (data.typeId == 0) {
        bcNotify.value.show('请选择问题类型')
        return
    }
    else if (data.reasonId == 0) {
        bcNotify.value.show('请选择问题原因')
        return
    }
    else if (data.content == '') {
        bcNotify.value.show('请填写问题描述')
        return
    }
    else if (data.fileList.length == 0) {
        bcNotify.value.show('请上传图片')
        return
    }

    saveTypeReason({
        reasonId: data.reasonId,
        content: data.content,
        images: data.fileList,
        typeId: data.typeId,
        sourceId: 2,
        orderId: ''
    }).then((res) => {
        bcNotify.value.show('提交成功')

        setTimeout(() => {
            pageController.back()
        }, 1200)
    })
}

const openUp = () => {
    nextTick(() => {
        console.log('手动调用',imgUploadref ,imgUploadref.value)
        imgUploadref.value.chooseFileFun()
    })
}

</script>
  
<style lang="scss" scoped>
.top,
.bottom {
    padding: 30rpx;
    margin: 20rpx 20rpx 0 20rpx;
    background-color: white;
    border-radius: 24rpx;
}

.title {
    margin-bottom: 30rpx;
    font-weight: bold;
    font-size: 32rpx;
    color: #333333;
}

.pick {
    height: 100rpx;
    color: #333333;
    border-bottom: 1rpx solid #F7F7F7;
}

.cover {
    margin-top: 30rpx;
    font-weight: 400;
    font-size: 30rpx;
    font-weight: bold;
    color: #333333;

    .desc {
        font-weight: 400;
        font-size: 24rpx;
        color: #666666;
        margin-bottom: 20rpx;
    }
}

.up_box {
    width: 180rpx;
    height: 180rpx;
    background: #F8F8F8;
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

.textarea {
    border: none;
    background-color: #F8F8F8;
    border-radius: 8rpx;
}

.noEmpty {
    color: #333333;
}

.empty {
    color: #BCBCBC;
}
</style>
 
