<template>
    <view class="bar"></view>
    <view class="container">
        <z-paging 
		    ref="paging"
            :auto="false"
		    :refresher-enabled="false"
		>
            <view class="article_page">
                <view class="textarea_box">
                    <textarea 
                    placeholder-style="color:#B2B2B2" 
                    placeholder="请输入正文" 
                    v-model="data.describe"
                    :maxlength="500" 
                    @blur="secondInpblur" 
                    class="textarea_inp"
                    :auto-height="true"
                    />
                </view>
                <view class="clupload_box">
                    <ClUpload
                        ref="upload"
                        v-model="data.list"
                        fileType="video"
                        :listStyle="data.uploadStyle"
                        :max="1"
                        useBeforeDelete 
                        useBeforeUpload
                        @onError="uploadError"
                        @onVideo="onVideo"
                        @onSuccess="onSuccess"
                        @closePreviewVideo="closePreviewVideo"
                        @beforeDelete="beforeDelete"
                        @beforeUpload="beforeUpload">

                        <template v-slot:addImg>
                            <view class="addVideo tn-flex-column">
                                <TnIcon name="camera" size="120rpx" />
                                <text class="txt">选择视频</text>
                            </view>
                        </template>
                    </ClUpload>
                </view>
                
                <view class="up_img_inp" v-if="false">
                    <imgUpload v-model:imageArr="data.fileList" :limit="1" ref="imgUploadref" @upchange="changeisNext">
                        <template #uploadBtn>
                            <view @click="openUp" class="up_box">
                                <view class="up_icon">
                                    <TnIcon name="add" color="#C9C9C9" size="60"/>
                                </view>
                                <view class="up_text">封面图片</view>
                            </view>
                        </template>
                    </imgUpload>
                </view>

                <view class="position_box" @click="positionFun">
                    <view class="position_left">
                        <TnIcon name="location" color="#D8D8D8" size="32rpx"/>
                        <view class="position_text"> {{ !data.regionText ? '点击设置坐标' : data.regionText }} </view>
                    </view>
                    <view class="position_right">
                        <TnIcon name="right" color="#BBBBBB" size="32rpx"/>
                    </view>
                </view>

                <view class="sign_box">
                    <view class="sign_left">
                        <image
                            class="sign_icon"
                            :src="getAssetsUrl('/leyou/create/createMemoirs.svg')"
                            mode="scaleToFill"
                        />
                        <view class="sign_text">标记为大事记</view>
                    </view>
                    <view class="sign_right">
                        <TnSwitch v-model="data.selectValue" active-color="#EA3E1A"/>
                    </view>
                </view>

                <view class="record_time_box">
                    <view class="record_time_left">
                        <image
                            class="record_time_icon"
                            :src="getAssetsUrl('/leyou/create/createTime.svg')"
                            mode="scaleToFill"
                        />
                        <view class="record_time_text">记录时间</view>
                    </view>
                    <view class="record_time_right" @click="openTimePicker">
                        <view class="time_text">
                            {{ !data.dateTimeValue ? data.nowTime : data.dateTimeValue }}
                        </view>
                        <TnIcon name="right" color="#BBBBBB" size="32rpx"/>
                    </view>
                </view>
                
            </view>

            <template #bottom>
                <view class="bottom_box" v-if="props.ischange != 1">
                    <view class="bottom_box_btn" @tap="clickBtn(2)">确认发布</view>
                </view>
                <view class="change_bottom_box" v-else>
                    <view class="del_btn" @tap="delAudit">删除记录</view>
                    <view class="up_btn" @tap="clickBtn(2)">保存编辑</view>
                </view>
            </template>
        </z-paging>
        <BCNotify ref="bcNotify"></BCNotify>

        <TnPopup v-model="data.showPopup">
            <view class="popup_box">
                <view class="popup_box_top">新纪录还未发布，确定要放弃吗？</view>
                <view class="popup_box_bottom">
                    <view class="not_preserve" @click="data.showPopup = false">取消</view>
                    <view class="preserve" @click="preserve">确定</view>
                </view>
            </view>
            <BCNotify ref="PopupNotify"></BCNotify>
        </TnPopup> 

        <TnDateTimePicker 
            @confirm="confirm"
            v-model:open="data.openDateTimePicker"
            v-model="data.dateTimeValue"
            mode="date"
            format="YYYY-MM-DD"
            :min-time="data.nowTime"
        ></TnDateTimePicker>
    </view>
</template>
    
<script setup lang="ts">
import { ref, reactive, onMounted, nextTick, computed } from 'vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnSwitch from '@tuniao/tnui-vue3-uniapp/components/switch/src/switch.vue'
import TnDateTimePicker from '@tuniao/tnui-vue3-uniapp/components/date-time-picker/src/date-time-picker.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'

import { uploadVideo } from '@/api/file-api'
import imgUpload from '@/components/upload/img-upload.vue'
import BCNotify from '@/components/notify/index.vue'
// import ClUpload from '@/Create/uni_modules/cl-upload/components/cl-upload/cl-upload.vue'
import ClUpload from '../../../uni_modules/cl-upload/components/cl-upload/cl-upload.vue'
import { getenjoyDetail, enjoysubmit } from '@/api/create-api'

import { getAssetsPic } from '@/common/setPicture'
import { formattime } from '@/common/formatTime'
import { TempStorage } from "@bc/base"

const props = withDefaults(defineProps<{
    ischange: number
    auditId: string
    type: number
    isEvent: boolean
}>(), {
    ischange: 0,
    auditId: '',
    type: 0,
    isEvent: false
})

interface Events {
    (e: 'delAudit', contentId: string): void
}
const emit = defineEmits<Events>()

interface Data {
    list: any
    uploadStyle: any
    describe: string
    fileList: any
    disabled: boolean
    isPreviewVideo: boolean
    regionText: string
    openDateTimePicker: boolean
    selectValue: boolean
    dateTimeValue: string
    nowTime: string
    lng: number
    lat: number
    cover: string
    showPopup: boolean
    textbol: boolean
    videobol: boolean
    showImgBox: boolean
    contentId: string
}

const data = reactive<Data>({
    list: [],
    uploadStyle: {
        columns: 1,
        columnGap: '20rpx',
        rowGap:'20rpx',
        padding:'30rpx 50rpx',
        height:'300rpx',
        radius:'20rpx'
    },
    describe: '',
    fileList: [],
    disabled: false,
    isPreviewVideo: false,
    regionText: '',
    openDateTimePicker: false,
    selectValue: false,
    dateTimeValue: '',
    nowTime: '',
    lng: 0,
    lat: 0,
    cover: '',
    showPopup: false,
    textbol: false,
    videobol: false,
    showImgBox: false,
    contentId: '',

})

const bcNotify = ref()

const imgUploadref = ref()

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const isnotNull = computed(()=>{
    console.log('执行');
    
    if (!data.describe) {
        bcNotify.value.show('请输入正文')
        return false
    }
    if (data.list.length == 0) {
        bcNotify.value.show('请上传视频')
        return
    }
    else if (!data.regionText) {
        bcNotify.value.show('请选择定位')
        return false
    }

    return true
})


const formatTime = (time:number) => {
    return formattime(time, 'YYYY-MM-DD')
}

const openUp = () => {
    nextTick(() => {
        console.log('手动调用',imgUploadref ,imgUploadref.value)
        imgUploadref.value.chooseFileFun()
    })
}

const changeisNext = () => {
    console.log('data.fileList.length', data.fileList.length)
}


/**
 * 删除前钩子
 * @param {Object} item 当前删除的图片或者视频信息
 * @param {Number} index 当前删除的图片或视频索引
 * @param {Function} next 调用此函数继续执行组件删除逻辑
 * */ 
const beforeDelete = (item: any, index: number, next: any) => {
    uni.showModal({
        title: '提示信息',
        content: '确定要删除视频文件嘛？',
        success: res => {
            if (res.confirm) {
                next()
            }
        }
    })
}


/**
 * 上传前钩子
 * @param {Object} tempFile 当前上传文件信息
 * @param {Function} next 调用此函数继续执行组件上传逻辑
 * */
const beforeUpload = (tempFile: any, next: any) => {
    data.disabled = true
    uni.showLoading({
        title: '正在上传..'
    })
    uploadVideo(tempFile.path).then((res: any) => {
        data.list.push(res.url)
        uni.hideLoading()
        data.disabled = false

        data.cover = res.url + '?x-oss-process=video/snapshot,t_0000,f_jpg'
        console.log('data.cover',data.cover);

    })
}

/** 上传出错 */
const uploadError = (error: any) => {
    bcNotify.value.error(error)
}

// 点击视频
const onVideo = () => {
    // data.isPreviewVideo = true
}

// 关闭视频预览
const closePreviewVideo = () => {
    // data.isPreviewVideo = false
}

// 上传成功
const onSuccess = () => {
    console.log('data.fileList.length',data.fileList.length);
    
    
}

// 发布
const clickBtn = (status: number) => {

    if (!isnotNull.value) {
        return
    }

    let utcRecord = new Date(!data.dateTimeValue ? data.nowTime : data.dateTimeValue).getTime()

    let upInfo = {
        baseInfo: {
            title: '',
            desc: data.describe,
            type: 2,
            cover: data.cover,
            videoUrl: data.list[0],
            utcRecord: (utcRecord / 1000),
            tagIds: data.selectValue ? [999] : [],
            tagNames: data.selectValue ? ['大事记'] : [],
            lng: data.lng,
            lat: data.lat,
            address: data.regionText
        },
        auditId: props.auditId,

    }

    if (props.ischange == 1) {
        enjoysubmit({
            ...upInfo
        }).then((res:any) => {
            bcNotify.value.show('修改成功')

            setTimeout(()=>{
                uni.navigateBack()
            },1000)
        })
        return
    }

    const uniqueId = TempStorage.savewx(upInfo)

    uni.setStorageSync('enjoyUpObj',{ uniqueId })

    uni.navigateBack()
    

}

onMounted(() => {
    data.nowTime = formatTime((new Date().getTime() / 1000))
    if (props.ischange == 1) {
        console.log('修改');
        getenjoyDetail({
            id: props.auditId
        }).then((res:any) => {
            console.log('res',res);
            data.cover = res.baseInfo.cover
            data.list = [res.baseInfo.videoUrl]
            data.describe = res.baseInfo.desc
            data.lat = res.baseInfo.lat
            data.lng = res.baseInfo.lng
            data.selectValue = res.baseInfo.tagIds.length != 0 ? true : false
            data.dateTimeValue = formatTime(res.baseInfo.utcCreated);
            data.regionText = res.baseInfo.address

            data.showImgBox = true

            data.contentId = res.baseInfo.contentId

        }).catch((err:any) =>{
            bcNotify.value.error('内容已删除')
            setTimeout(() => {
                uni.navigateBack();
            }, 1000);
        })
    }else{
        data.selectValue = props.isEvent
        data.showImgBox = true
    }
})


const secondInpblur = (val:any) => {
    console.log('val',val);
    let str = val.detail.value
    console.log('str',str);
    
    // data.textvalue = str.replace(/\n/g, '<br>')
    if(!data.describe){
        data.textbol = false
        return
    }
    data.textbol = true
}

const positionFun = () => {
    uni.chooseLocation({
        success: (res:any) => {
            data.regionText = res.address.slice(0,9)
            data.lat = res.latitude
            data.lng = res.longitude

            console.log('data.regionText',data.regionText)
        }
    })
}

const openTimePicker = () => {
    data.openDateTimePicker = true
}

const confirm = (val:string) => {
    data.dateTimeValue = val
}

// onUnload
const outLoadfun = () => {
    
    if ( data.textbol || data.list.length) {
        if (props.ischange == 2) {
            notpreserve()
            return
        }
        console.log('页面退出保存草稿');
        data.showPopup = true
    }else{
        data.showPopup = false
        notpreserve()
    }
    
}

const notpreserve = () => {
    uni.navigateBack()
}

const preserve = () => {
    data.showPopup = false
    notpreserve()
}


const delAudit = () => {
    emit('delAudit', data.contentId)
}

defineExpose({
    outLoadfun
})

</script>
  
<style lang="scss" scoped>
.addVideo {
    width: 100%;
    height: 300rpx;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    font-size: 28rpx;
    color: #AAAAAA;

    .txt {
        margin-top: 10rpx;
    }
}

.bar {
    width: 100%;
    height: 8rpx;
    background-color: #F8F9F9;
}
.article_page{
    padding: 30rpx;
    box-sizing: border-box;
    .textarea_box{
        width: 100%;
        position: relative;
        .textarea_inp{
            min-height: 240rpx;
            width: 100%;
            padding: 14rpx;
            padding-bottom: 30rpx;
            box-sizing: border-box;
            border-bottom: 2rpx solid #F2F2F2;
        }
    }
    // .clupload_box{
    //     border-bottom: 2rpx solid #F2F2F2;
    // }
    .up_img_inp{
        padding: 32rpx 0;
        box-sizing: border-box;

        .up_box{
            width: 228rpx;
            height: 228rpx;
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
    }
    .position_box{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 28rpx 24rpx;
        box-sizing: border-box;
        background: #F5F5F5;
        border-radius: 12rpx;
        margin-bottom: 16rpx;
        .position_left{
            display: flex;
            align-items: center;
            .position_text{
                margin-left: 14rpx;
                font-weight: 400;
                font-size: 28rpx;
                color: #B9B9B9;
            }
        }
    }
    .sign_box{
        padding: 24rpx 0;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16rpx;
        border-bottom: 2rpx solid #F2F2F2;
        .sign_left{
            display: flex;
            align-items: center;
            .sign_icon{
                width: 40rpx;
                height: 40rpx;
                margin-right: 12rpx;

            }
            .sign_text{
                font-size: 30rpx;
                color: #333333;
            }
        }
    }
    .record_time_box{
        padding: 24rpx 0;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 216rpx;
        border-bottom: 2rpx solid #F2F2F2;
        .record_time_left{
            display: flex;
            align-items: center;
            .record_time_icon{
                width: 40rpx;
                height: 40rpx;
                margin-right: 12rpx;
            }
            .record_time_text{
                font-size: 30rpx;
                color: #333333;
            }
        }
        .record_time_right{
            display: flex;
            align-items: center;
            .time_text{
                font-size: 28rpx;
                color: #999999;
                margin-right: 16rpx;
            }   
        }
    }
}
.input {
    padding: 0 30rpx 30rpx 30rpx;
}

.cover {
    margin-top: 30rpx;
    font-weight: 400;
    font-size: 30rpx;
    font-weight: bold;
    color: #333333;

    .title {
        margin-bottom: 20rpx;

        text {
            padding-left: 5rpx;
            font-weight: 400;
            font-size: 24rpx;
            color: #999999;
        }
    }
}

.up_box {
    width: 220rpx;
    height: 220rpx;
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

.channel {
    padding: 30rpx;
    font-weight: bold;
    font-size: 30rpx;
    color: #333333;

    .title {
        flex: 1;
    }

    .name {
        font-weight: 400;
        font-size: 28rpx;
        color: #999999;
    }

    .active {
        margin-right: 10rpx;
        padding: 6rpx 28rpx;
        background: #FDEBE7;
        border-radius: 38rpx;
        font-size: 28rpx;
        color: #EA3E1A ;
    }
}

.bottom_box{
    display: flex;
    align-items: center;
    border-top: 2rpx solid #F2F2F2;
    padding: 20rpx 30rpx;
    padding-bottom: 50rpx;
    box-sizing: border-box;
	.bottom_box_btn {
		font-size: 32rpx;
		height: 80rpx;
        width: 100%;
        text-align: center;
		color: #FFFFFF;
        background: #EA3E1A;
        line-height: 80rpx;
		border-radius: 46rpx;
	}

}
.change_bottom_box{
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 2rpx solid #F2F2F2;
    padding: 20rpx 30rpx;
    padding-bottom: 50rpx;
    box-sizing: border-box;
    background: #fff;
    .del_btn{
        width: 220rpx;
        height: 80rpx;
        background: #FFFFFF;
        border: 2rpx solid #BFBFBF;
        font-size: 32rpx;
        color: #535353;
        font-weight: 400;
        text-align: center;
        line-height: 80rpx;
		border-radius: 46rpx;

    }
    .up_btn{
        font-size: 32rpx;
		height: 80rpx;
		width: 450rpx;
		text-align: center;
		color: #FFFFFF;
        background: #EA3E1A;
        line-height: 80rpx;
		border-radius: 46rpx;
    }
}

.popup_box{
    width: 500rpx;
    background: #FFFFFF;
    border-radius: 24rpx;
    padding: 50rpx 0rpx;
    padding-bottom: 0rpx;
    box-sizing: border-box;
    .popup_box_top{
        font-weight: 500;
        font-size: 32rpx;
        color: #333333;
        text-align: center;
        margin-bottom: 50rpx;
    }  
    .popup_box_bottom{
        width: 100%;
        border-top: 2rpx solid #F0F0F0;
        display: flex;
        align-items: center;
        .not_preserve{
            padding: 22rpx 0rpx;
            box-sizing: border-box;
            text-align: center;
            font-weight: 400;
            font-size: 28rpx;
            color: #666666;
            width: 100%;
        }
        .preserve{
            padding: 22rpx 0rpx;
            box-sizing: border-box;
            text-align: center;
            font-weight: 400;
            font-size: 28rpx;
            color: #399BFC;
            width: 100%;
            border-left: 2rpx solid #F0F0F0;
        }

    }
}
</style>
  