<template>
    <view class="container">
        <z-paging 
		ref="paging" 
		:auto="false"
		:refresher-enabled="false"
        :use-page-scroll="true"
		>
            <view class="video_padding_box">
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
            </view>

            <view class="input">
                <TnInput height="100rpx" placeholder="输入标题(2~30个字)" :custom-style="{ fontSize: '36rpx' }" :maxlength="30" :underline="true" clearable border-color="#F2F2F2" v-model="data.title"></TnInput>
                <TnInput height="100rpx" placeholder="添加描述（选填）" :maxlength="100" :underline="true" clearable border-color="#F2F2F2" v-model="data.describe" @change="inpChange"></TnInput>

                <view class="channel ">
                    <view class="title">
                        <TnIcon name="share" color="#333333" size="32rpx" />选择发布渠道(必选)
                    </view>
                    
                    <view class="tag_list_box">
                        <view class="tag_item" :class="{ 'is_active' : data.channelId == item.id }" @click="changeTag(item,index)" v-for="(item, index) in data.categoryList" :key="item.id">
                            {{ item.name }}
                        </view>
                    </view>
                </view>

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
            
            <!-- v-if="data.keywordItem" -->
            <view class="topicText" v-if="false">
                    {{ data.keywordItem }}
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
                    <view class="bottom_box_draft" @tap="clickBtn(1)">保存草稿</view>
                    <view class="bottom_box_btn" @tap="clickBtn(2)">发布视频</view>
                </view>
            </view>
            <TnPicker v-model="data.channelName" v-model:open="data.openPicker" :data="data.pickerData" @confirm="pickerConfirm" />
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
import TnPicker from '@tuniao/tnui-vue3-uniapp/components/picker/src/picker.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'

import { uploadVideo } from '@/api/file-api'
import BCNotify from '@/components/notify/index.vue'
import ImgUpload from '@/components/upload/img-upload.vue'
import { addContent, editContent, categoryAll, getDraftDetails } from '@/api/create-api'
import ClUpload from '@/Create/uni_modules/cl-upload/components/cl-upload/cl-upload.vue'

const props = withDefaults(defineProps<{
    ischange: number
    articleId: any
    type: number
    taskId:string
    activityId:string|null,//活动id
    topic:string,
    categoryId:string

}>(), {
    ischange: 0,
    articleId: '',
    taskId:'',
    type: 0,  //3:图文 2：视频
    activityId:null,
    topic:'',
    categoryId: ''

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
    openPicker: boolean
    pickerData: any
    categoryList: any
    isPreviewVideo: boolean
    showFileBox: boolean
    keywordItem:string|null,
    keywordNumber: number,
    addactivityId: string | null,
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
    openPicker: false,
    pickerData: [],
    categoryList: [],
    isPreviewVideo: false,
    showFileBox: false,
    keywordItem:null,
    keywordNumber: 0,
    addactivityId: null,
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

const openPicker = () => {
    data.openPicker = true
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

    console.log('tempFile',tempFile);
    

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
    else if (data.channelName == '') {
        bcNotify.value.show('请选择发布渠道')
        return
    }
    
    if (props.articleId !== '' && props.type == 2 && status == 1) {
        editContent({
            articleId: props.articleId,
            title: data.title,
            desc: data.describe,
            type: 2,
            taskId:props.taskId,
            status: status,
            cover: data.fileList[0],
            categoryId: data.channelId,
            categoryName: data.channelName,
            videoUrl: data.list[0],
            keyword: [data.keywordItem],
            activityId: data.addactivityId ? data.addactivityId : null,
            isAddActivity: data.addactivityId ? 1 : 0,

        }).then((res) => {
            bcNotify.value.show('保存成功')
            setTimeout(() => {
                uni.navigateBack({ delta: 1 })
            }, 800)
        }).catch((err) => {
            bcNotify.value.error(err.message)
        })
    }
    else {
        props.ischange ? editContent({
            articleId: props.articleId,
            title: data.title,
            desc: data.describe,
            taskId:props.taskId,
            type: 2,
            status: status,
            cover: data.fileList[0],
            categoryId: data.channelId,
            categoryName: data.channelName,
            videoUrl: data.list[0],
            keyword: [data.keywordItem],
            activityId: data.addactivityId ? data.addactivityId : null,
            isAddActivity: data.addactivityId ? 1 : 0,

        }).then((res) => {
            bcNotify.value.show('发布成功,请等待平台审核!')
            setTimeout(() => {
                uni.navigateBack({ delta: 1 })
            }, 800)
        }).catch((err) => {
            bcNotify.value.error(err.message)
        }) : addContent({
            title: data.title,
            type: 2,
            status: status,
            taskId:props.taskId,
            desc: data.describe,
            cover: data.fileList[0],
            videoUrl: data.list[0],
            categoryId: data.channelId,
            categoryName: data.channelName,
            keyword: [data.keywordItem],
            activityId: data.addactivityId ? data.addactivityId : null,
            isAddActivity: data.addactivityId ? 1 : 0,

        }).then((res) => {
            const str = status == 1 ? '保存成功' : '发布成功,请等待平台审核!'
            bcNotify.value.show(str)
            setTimeout(() => {
                uni.navigateBack({ delta: 1 })
            }, 800)
        }).catch((err) => {
            bcNotify.value.error(err.message)
        })
    }
}

onMounted(() => {
    data.addactivityId = props.activityId
    categoryAll({ categoryType: 1, moduleType: 1 }).then((res: any) => {
        if (res.length) {
            let newArr: any[] = []
            for (const i in res) {
                for (const j in res[i].children) {
                    newArr.push(res[i].children[j])
                }
            }

            if (props.categoryId) {
                newArr = newArr.filter((item:any) => {
                    return item.id == props.categoryId
                })
            }

            data.categoryList = newArr

            const pack: any[] = []
            newArr.map((item: any) => pack.push(item.name))
            data.pickerData = pack

        }
    }).catch((err) => {
        bcNotify.value.error(err.message)
    })

    // 视频类型
    if (props.articleId !== '' && props.type == 2) {
        getDraftDetails({
            contentId: props.articleId
        }).then((res: any) => {
            data.title = res?.title
            data.channelId = res?.categoryId
            data.channelName = res?.categoryName
            data.fileList = [res.cover]
            data.list = [res.videoUrl]
            data.showFileBox = true

            data.keywordItem = res.keyword[0]

            // let newStr = data.keywordItem != '' ? '#' + data.keywordItem + '#' : ''
            data.describe = res?.desc

            data.keywordNumber = data.keywordItem!.length

        }).catch((err: any) => {
            bcNotify.value.error(err.message)
        })
    }
    else {
        
        data.keywordItem = props.topic;
        
        let newStr = data.keywordItem != '' ? '#' + data.keywordItem + '#' : ''
        data.describe = newStr

        data.keywordNumber = data.keywordItem!.length

        data.showFileBox = true
    }
    
})

const changeTag = (item:any, index:number) => {
    console.log('index',index);
    
    if (data.channelId == item.id) {
        console.log('清除');
        
        data.channelId = ''
        data.channelName = ''

    }
    data.channelId = item.id
    data.channelName = item.name
    console.log('item',item);
    
}

const inpChange = (value:string) => {
    let matches = value.match(/#/g)?.length;

    if (!data.keywordItem) {
        return
    }

    if (matches! >= 2) {
        console.log('话题存在');
        
    }else{
        console.log('话题不存在');
        let newStr = value.slice(data.keywordNumber + 1)
        data.describe = newStr

        data.addactivityId = null
        data.keywordItem = ''
    }
}


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
.video_padding_box{
    padding: 30rpx;
    box-sizing: border-box;
    background: #fff;
    .upVideo_box{
        background: #F8F8F8;
        border-radius: 12rpx 12rpx 12rpx 12rpx;
        overflow: hidden;
    }
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
    padding: 40rpx 0;
    font-weight: bold;
    font-size: 30rpx;
    color: #333333;
    border-bottom: 2rpx solid #F2F2F2;
    .title {
        flex: 1;
        margin-bottom: 32rpx;
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
    .tag_list_box{
        display: flex;
        align-items: center;
        .tag_item{
            padding: 12rpx 24rpx;
            box-sizing: border-box;
            font-weight: 400;
            color: #666666;
            font-size: 24rpx;
            background: #F3F3F3;
            border-radius: 28rpx;
            margin-right: 20rpx;
            &.is_active{
                background: #EA3E1A;
                color: #FFFFFF;
            }
        }
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
  