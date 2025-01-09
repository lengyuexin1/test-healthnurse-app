<template>
    <view class="container">
        <z-paging 
		ref="paging" 
		:auto="false"
		:refresher-enabled="false"
        :use-page-scroll="true"
		>

            <view class="upVideo_box">
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

            <view class="input">
                <TnInput height="100rpx" placeholder="输入标题(2~30个字)" :custom-style="{ fontSize: '36rpx' }" :maxlength="30" :underline="true" clearable border-color="#F2F2F2" v-model="data.title"></TnInput>
                <TnInput height="100rpx" placeholder="添加描述（选填）" :maxlength="100" :underline="true" clearable border-color="#F2F2F2" v-model="data.describe"></TnInput>

                <view class="cover" v-if="data.showFileBox">
                    <view class="title">上传封面图<text>每张图片大小不能超过3M</text></view>
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
            </view>

            <view class="bottom_box">
                <!-- #ifdef APP-PLUS -->
                <view class="openMarket_bottom">
                    <view class="openMarket_bottom_box">
                        <view class="openMarket_title">是否跳转第三方应用视频创作？</view>
                        <view class="openMarket_btn" @click="openMarket">去创作</view>
                    </view>
                </view>
                <!-- #endif -->
                <view class="bottom_flex_box">
                    <view class="bottom_box_draft" v-if="props.ischange != 2" @tap="clickBtn(1)">保存草稿</view>
                    <view class="bottom_box_btn" :style="{ width : props.ischange == 2 ? '100%' : '420rpx' }" @tap="clickBtn(2)">确认发布</view>
                </view>
            </view>
            <BCNotify ref="bcNotify"></BCNotify>
        </z-paging>

        <TnPopup v-model="data.showDelPopup" :overlay-closeable="false">
            <view class="delPopup_box">
                <view class="delPopup_title">您未下载第三方视频创作工具是否前往下载？</view>
                <view class="delPopup_bottom_box">
                    <view class="delPopup_bottom_item cancel" @click="data.showDelPopup = false">取消</view>
                    <view class="delPopup_bottom_item determine" @click="determineDel">去下载</view>
                </view>
            </view>
        </TnPopup>
    </view>
</template>
    
<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'

import { uploadVideo } from '@/api/file-api'
import imgUpload from '@/components/upload/img-upload.vue'
import BCNotify from '@/components/notify/index.vue'
import { addContent, editContent, getDraftDetails, getChatauditdetail, upsubmit, editsubmit, Chatshakingsubmit, Chatshakingdraft } from '@/api/create-api'
import ClUpload from '@/Create/uni_modules/cl-upload/components/cl-upload/cl-upload.vue'

const props = withDefaults(defineProps<{
    ischange: number
    auditId: any
    type: number
}>(), {
    ischange: 0,
    auditId: '',
    type: 0,  //3:图文 2：视频
})

interface Data {
    list: any,
    uploadStyle: any
    title: string
    describe: string
    fileList: any
    disabled: boolean
    channelId: string
    channelName: string
    pickerData: any
    categoryList: any
    isPreviewVideo: boolean
    showFileBox: boolean
    firstUp: boolean
    showDelPopup: boolean


}

const data = reactive<Data>({
    list: [],
    uploadStyle: {
        columns: 1,
        columnGap: '20rpx',
        rowGap:'20rpx',
        padding:'30rpx 50rpx',
        height:'200rpx',
        radius:'20rpx'
    },
    title: '',
    describe: '',
    fileList: [],
    disabled: false,
    channelId: '',
    channelName: '',
    pickerData: [],
    categoryList: [],
    isPreviewVideo: false,
    showFileBox: false,
    firstUp: true,
    showDelPopup: false,

})

const bcNotify = ref()

const imgUploadref = ref()

const openUp = () => {
    nextTick(() => {
        console.log('手动调用',imgUploadref ,imgUploadref.value)
        imgUploadref.value.chooseFileFun()
    })
}

const changeisNext = () => {
    console.log('data.fileList.length', data.fileList.length)
}

const pickerConfirm = (value: any) => {
    data.channelName = value
    const filterData = data.categoryList.filter((item: any) => item.name == value)
    data.channelId = filterData[0].id
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

// 发布
const clickBtn = (status: number) => {
    const regex = /^[\p{P}|\s]+$/u

    if (data.list.length == 0) {
        bcNotify.value.show('请上传视频')
        return
    }
    else if (data.title == '') {
        bcNotify.value.show('请填写标题')
        return
    }
    else if (regex.test(data.title)) {
        bcNotify.value.show('标题不能仅有标点组成')
        return
    }
    else if (data.title.length <= 1) {
        bcNotify.value.show('标题字数不够')
        return
    }
    else if (data.fileList.length == 0) {
        bcNotify.value.show('请上传视频封面')
        return
    }

    if (!data.firstUp) {
        return
    }

    if (status == 1) {
        // 草稿
        props.ischange == 1 ? Chatshakingdraft({
            baseInfo:{
                title: data.title,
                desc: data.describe,
                cover: data.fileList[0],
                videoUrl: data.list[0],
                type: 2
            },
            auditId: props.auditId,
        }).then(() => {
            data.firstUp = false;

            bcNotify.value.show('保存成功')
            setTimeout(() => {
                uni.navigateBack({ delta: 1 })
            }, 800)
        }).catch((err) => {
            bcNotify.value.error(err.message)
        }) : editsubmit({
            baseInfo:{
                title: data.title,
                desc: data.describe,
                cover: data.fileList[0],
                videoUrl: data.list[0],
                type: 2
            },
            auditId: props.auditId,
        }).then(() => {
            data.firstUp = false;

            bcNotify.value.show('保存成功')
            setTimeout(() => {
                uni.navigateBack({ delta: 1 })
            }, 800)
        }).catch((err) => {
            bcNotify.value.error(err.message)
        })
    }
    else {
        props.ischange == 1 ? Chatshakingsubmit({
            baseInfo:{
                title: data.title,
                desc: data.describe,
                cover: data.fileList[0],
                videoUrl: data.list[0],
                type: 2
            },
            auditId: props.auditId,
        }).then(() => {
            data.firstUp = false;

            bcNotify.value.show('发布成功,等待平台审核')
            setTimeout(() => {
                uni.navigateBack({ delta: 1 })
            }, 800)
        }).catch((err) => {
            bcNotify.value.error(err.message)
        }) : upsubmit({
            baseInfo:{
                title: data.title,
                desc: data.describe,
                cover: data.fileList[0],
                videoUrl: data.list[0],
                type: 2
            },
            auditId: props.auditId,
        }).then(() => {
            data.firstUp = false;

            bcNotify.value.show('发布成功,等待平台审核')
            setTimeout(() => {
                uni.navigateBack({ delta: 1 })
            }, 800)
        }).catch((err) => {
            bcNotify.value.error(err.message)
        })
    }
}

onMounted(() => {
    // 视频类型
    if (props.auditId !== '' && props.type == 2) {
        getChatauditdetail({
            id: props.auditId
        }).then((res: any) => {
            data.title = res?.baseInfo.title
            data.describe = res?.baseInfo.desc
            data.fileList = [res.baseInfo.cover]
            data.list = [res.baseInfo.videoUrl]
            data.showFileBox = true
        }).catch((err: any) => {
            bcNotify.value.error(err.message)
        })
    }
    else {
        data.showFileBox = true
    }
    
})


// #ifdef APP-PLUS
const openMarket = () => {
    // com.lemon.lv
    // com.taobao.taobao
    console.log('app跳转');
    var appurl;  
    if (plus.os.name=="Android") {  
        appurl = "Android"; 
        plus.runtime.launchApplication(
            {  
                pname: 'com.lemon.lv'  
            },  
            function(e) {  
                console.log('本机没有安装剪映' + e);  
                data.showDelPopup = true
            }  
        );
    }
    else{  
        appurl = "Ios";  
        plus.runtime.launchApplication({ action: 'taobao://' }, function(e) {  
            console.log('Open system default browser failed: ' + e.message);  
        });
    } 
    console.log('appurl',appurl);
    
}
// #endif

const determineDel = () => {
    data.showDelPopup = false
    plus.runtime.openURL("https://www.capcut.cn/mobile_portal")
}

</script>
  
<style lang="scss" scoped>

.container{
    padding: 40rpx 30rpx;
    box-sizing: border-box;
    background: #fff;
    border-radius: 24rpx 24rpx 0rpx 0rpx;
}
.upVideo_box{
    background: #F8F8F8;
    border-radius: 12rpx 12rpx 12rpx 12rpx;
    overflow: hidden;
}
.addVideo {
    width: 100%;
    height: 200rpx;
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
    height: 20rpx;
    background-color: #F8F9F9;
}
.topicText{
    background: #FDEBE7;
    border-radius: 38rpx;
    padding: 8rpx 26rpx;
    box-sizing: border-box;
    font-weight: 400;
    font-size: 28rpx;
    color: #EA3E1A;
    text-align: center;
    width:fit-content;
}
.input {
    padding: 20rpx 0rpx;
    box-sizing: border-box;
}

.cover {
    margin-top: 30rpx;
    font-weight: 400;
    font-size: 30rpx;
    font-weight: bold;
    color: #333333;

    .title {
        margin-bottom: 32rpx;

        text {
            padding-left: 12rpx;
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
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    .openMarket_bottom{
        padding: 24rpx;
        box-sizing: border-box;
        .openMarket_bottom_box{
            width: 100%;
            padding: 20rpx 36rpx;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #FCF1F1;
            border-radius: 12rpx;
            .openMarket_title{
                font-size: 30rpx;
                color: #333333;
                font-weight: 400;
            }
            .openMarket_btn{
                padding: 10rpx 32rpx;
                box-sizing: border-box;
                border-radius: 32rpx;
                border: 2rpx solid #EA3E1A;
                color: #EA3E1A;
                font-size: 28rpx;
                font-weight: 500;
            }
        }

    }
    .bottom_flex_box{
        display: flex;
        align-items: center;
        border-top: 2rpx solid #F2F2F2;
        padding: 20rpx 30rpx;
        padding-bottom: 70rpx;
        box-sizing: border-box;
    }
    .bottom_box_draft{
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
		font-size: 32rpx;
		height: 80rpx;
		width: 420rpx;
		text-align: center;
		color: #FFFFFF;
        background: #EA3E1A;
        line-height: 80rpx;
		border-radius: 46rpx;
	}

}
.delPopup_box{
    width: 540rpx;
    background: #FFFFFF;
    border-radius: 24rpx;
    .delPopup_title{
        padding: 40rpx 60rpx;
        text-align: center;
        box-sizing: border-box;
    }
    .delPopup_bottom_box{
        width: 100%;
        display: flex;
        align-items: center;
        border-top: 2rpx solid #F0F0F0;
        .delPopup_bottom_item{
            width: 49%;
            padding: 22rpx 0rpx;
            font-size: 28rpx;
            text-align: center;
            &.cancel{
                color: #666666;
                border-right: 2rpx solid #F0F0F0;
            }
            &.determine{
                color: #399BFC;
            }
        }
    }


}
</style>
  