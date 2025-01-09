<template>
    <view class="bar" v-if="stateNumber == 1"></view>
    <view class="container">
        <z-paging 
		    ref="paging"
            :auto="false"
		    :refresher-enabled="false"
		>
            <view class="article_page" v-if="stateNumber == 1">
                <view class="inp_box">
                    <TnInput 
                    placeholder="请输入标题(2~30个字)" 
                    :underline="true" 
                    :maxlength="30"
                    border-color="#F2F2F2"
                    clearable
                    v-model="data.titlevalue"
                    @blur="firstInpblur"
                    ></TnInput>
                </view>
                <view class="textarea_box">
                    <textarea 
                    placeholder-style="color:#B2B2B2" 
                    placeholder="请输入正文" 
                    v-model="data.textvalue"
                    :maxlength="500" 
                    @blur="secondInpblur" 
                    class="textarea_inp"
                    :auto-height="true"
                    />
                    <view class="flex_number">
                        {{ data.textvalue.length > 500 ? 500 : data.textvalue.length }} / 500
                    </view>
                </view>
                <view class="up_img_inp" v-if="data.showFileBox">
                    <view class="title">封面<text>(每张图片大小不能超过10M)</text></view>
                    <imgUpload v-model:imageArr="data.fileList1" :limit="3" ref="imgUploadref" @upchange="upchange">
                        <template #uploadBtn>
                            <view @click="openUp" class="up_box">
                                <view class="up_icon">
                                    <TnIcon name="add" color="#C9C9C9" size="80"/>
                                </view>
                                <view class="up_text">
                                    {{ data.fileList1.length < 1 ? '添加封面图片' : '添加图片' }}
                                </view>
                            </view>
                        </template>
                    </imgUpload>
                </view>

            </view>

            <view class="preview_page" v-else>
                
                <view class="posts_author">
                    <image
                        class="author_img"
                        :src="data.userInfo.avatar"
                        mode="scaleToFill"
                    />
                    <view class="author_text">
                        <view class="author_name">
                            {{ data.userInfo.nickname }}
                        </view>
                        <view class="up_time">{{ timeformat }}发布</view>
                    </view>
                </view>
                <view class="swiper_box">
                    <swiper class="swiper" :autoplay="true" :circular="true">
                        <swiper-item class="swiper_item" v-for="(item,index) in data.fileList1" :key="index">
                            <image
                                class="swiper_item_img"
                                :src="item"
                                mode="aspectFill"
                            />
                        </swiper-item>
                    </swiper>
                </view>
                <view class="preview_title">
                    {{ data.titlevalue ? data.titlevalue : '标题' }}
                </view>
                <view class="text_content">
                    <!-- {{ data.textvalue }} -->
                    <mpHtml 
                    :content="data.showText"
                    />
                </view>
            </view>

            <template #bottom>
                <view class="bottom_box" v-if="stateNumber == 1">
                    <view class="bottom_box_draft" @tap="topreview(2)">预览</view>
                    <view class="bottom_box_btn" @tap="clickBtn(2)">确认发布</view>
                </view>
                <view class="bottom_box" v-else>
                    <view class="bottom_box_draft" @tap="topreview(1)">去修改</view>
                    <view class="bottom_box_btn" @tap="clickBtn(2)">确认发布</view>
                </view>
            </template>
        </z-paging>
        <BCNotify ref="bcNotify"></BCNotify>

        <TnPopup v-model="data.showPopup">
            <view class="popup_box">
                <view class="popup_box_top">是否保存草稿？</view>
                <view class="popup_box_bottom">
                    <view class="not_preserve" @click="notpreserve">不保存</view>
                    <view class="preserve" @click="preserve">保存</view>
                </view>
            </view>
            <BCNotify ref="PopupNotify"></BCNotify>
        </TnPopup> 
    </view>
</template>
    
<script setup lang="ts">
import { ref, reactive, onMounted, nextTick, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'

import mpHtml from '@/Create/uni_modules/mp-html/components/mp-html/mp-html.vue'
import imgUpload from '@/components/upload/img-upload.vue'
import { getChatauditdetail, upsubmit, editsubmit, Chatshakingsubmit, Chatshakingdraft } from '@/api/create-api'
import BCNotify from '@/components/notify/index.vue'
import { formattime } from '@/common/formatTime'
import { PlatformManage } from "@bc/sys"

const props = withDefaults(defineProps<{
    ischange: number
    auditId: any
    type: number,
    stateNumber: number,
}>(),{
    ischange: 0,
    auditId: '',
    type: 0, // 3:图文 2：视频
    stateNumber: 1,
})

interface Events {
    (e: 'changePreview', state: number): void
}
const emit = defineEmits<Events>()

interface Data {
    isNext:boolean
    titlevalue:string
    textvalue:string
    isloadingImg:boolean
    maxCount:number
    fileList1:any
    pickerData: any
    showFileBox: boolean,
    userInfo: any,
    titlebol: boolean,
    textbol: boolean,
    imgbol: boolean,
    showPopup: boolean,
    dataList: any,
    showText: string
    firstUp: boolean

}
const data = reactive<Data>({
    isNext:false,
    titlevalue:'',
    textvalue:'',
    isloadingImg:false,
    maxCount:3,
    fileList1:[],
    pickerData: [],
    showFileBox: false,
    userInfo: {},
    titlebol: false,
    textbol: false,
    imgbol: false,
    showPopup: false,
    dataList: [],
    showText: '',
    firstUp: true,

})

const bcNotify = ref()
const PopupNotify = ref()

const timeformat = computed(()=>{
    let time = new Date().getTime()
    return formattime((time / 1000) ,'YYYY-MM-DD HH:mm')
})

const isnotNull = computed(()=>{
    console.log('执行');
    
    const regex = /^[\p{P}|\s]+$/u
    if (data.titlevalue == '') {
        bcNotify.value.show('请输入标题')
        return false
    }
    else if (regex.test(data.titlevalue)) {
        bcNotify.value.show('标题不能仅有标点组成')
        return false
    }
    else if (data.titlevalue.length <= 1) {
        bcNotify.value.show('标题字数不够')
        return false
    }
    else if (data.textvalue == '') {
        bcNotify.value.show('请输入正文')
        return false
    }
    else if (data.fileList1.length == 0) {
        bcNotify.value.show('请上传封面')
        return false
    }
    return true
})


onMounted(() => {
    PlatformManage.getToken().then((res:any)=>{
        data.userInfo = res
    })
    // 图文类型
    if (props.auditId !== '') {

        getChatauditdetail({
            id: props.auditId
        }).then((res: any) => {
            data.titlevalue = res.baseInfo.title
            data.textvalue = res.baseInfo.desc
            data.fileList1 = res.baseInfo.images
            data.showFileBox = true;
        }).catch((err: any) => {
            bcNotify.value.error(err.message)
        })
    }
    else {
        data.showFileBox = true
    }
    
    // #ifdef MP-WEIXIN 

    // #endif
})
onLoad(()=> {
    // #ifdef MP-WEIXIN 
    uni.getPrivacySetting({
        success: (res:any) => {
            console.log(res) // 返回结果为: res = { needAuthorization: true/false, privacyContractName: '《xxx隐私保护指引》' }
            if (res.needAuthorization) {
                // 需要弹出隐私协议
                console.log('需要弹出隐私协议');
            } else {
                // 用户已经同意过隐私协议，所以不需要再弹出隐私协议，也能调用已声明过的隐私接口
                console.log('用户已经同意');
            }
        },
        fail: () => {},
        complete: () => {}
    })
    // #endif
})

const imgUploadref = ref()
const openUp = () => {
    nextTick(()=>{
        console.log('手动调用',imgUploadref ,imgUploadref.value); 
        imgUploadref.value.chooseFileFun()
    })
}

const upchange = () => {
    console.log('上传切换');
    if (data.fileList1.length == 0) {
        data.imgbol = false
        return
    }
    data.imgbol = true
}

const firstInpblur = () => {
    if (!data.titlevalue) {
        data.titlebol = false
        return
    }
    data.titlebol = true
}

const secondInpblur = () => {
    if(!data.textvalue){
        data.textbol = false
        return
    }
    data.textbol = true
}



const clickBtn = (status:number) =>{

    if (!data.firstUp) {
        return
    }

    if (status == 1) {
        // 草稿
        props.ischange == 1 ? Chatshakingdraft({
            baseInfo:{
                title: data.titlevalue,
                desc: data.textvalue,
                cover: data.fileList1[0],
                images: data.fileList1,
                type: 3
            },
            auditId: props.auditId,
        }).then(() => {
            data.firstUp = false;

            PopupNotify.value.show('保存成功')
            setTimeout(() => {
                uni.navigateBack({ delta: 1 })
            }, 800)
        }).catch((err) => {
            PopupNotify.value.error(err.message)
        }) : editsubmit({
            baseInfo:{
                title: data.titlevalue,
                desc: data.textvalue,
                cover: data.fileList1[0],
                images: data.fileList1,
                type: 3
            },
            auditId: props.auditId,
        }).then(() => {
            data.firstUp = false;

            PopupNotify.value.show('保存成功')
            setTimeout(() => {
                uni.navigateBack({ delta: 1 })
            }, 800)
        }).catch((err) => {
            PopupNotify.value.error(err.message)
        })
    }
    else {
        if (!isnotNull.value) {
            return
        }
        // 发布
        props.ischange == 1 ? Chatshakingsubmit({
            baseInfo:{
                title: data.titlevalue,
                desc: data.textvalue,
                cover: data.fileList1[0],
                images: data.fileList1,
                type: 3
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
                title: data.titlevalue,
                desc: data.textvalue,
                cover: data.fileList1[0],
                images: data.fileList1,
                type: 3
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

const topreview = (state:number) => {
    data.showText = data.textvalue.replace(/\n/g, '<br>')

    if (!isnotNull.value) {
        return
    }
    emit('changePreview',state)
}

// onUnload
const outLoadfun = () => {

    

    if (data.titlebol || data.textbol || data.imgbol) {
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
    console.log('123');
    
    clickBtn(1)
}

defineExpose({
    outLoadfun
})

</script>

<style scoped>
/* tn-input tn-text-left tn-border-bottom tn-underline tn-input */
:deep(.tn-input .tn-text-left .tn-border-bottom .tn-underline .tn-input) {
    font-size: 36rpx;
}
:global(.tn-input .tn-text-left .tn-border-bottom .tn-underline .tn-input) {
    font-size: 36rpx;
}
</style>

<style lang="scss" scoped>
.article_page{
    padding: 30rpx;
    box-sizing: border-box;
    .inp_box{
        margin-bottom: 10rpx;
    }
    .textarea_box{
        width: 100%;
        position: relative;
        .textarea_inp{
            min-height: 400rpx;
            width: 100%;
            padding: 14rpx;
            padding-bottom: 30rpx;
            box-sizing: border-box;
            border-bottom: 2rpx solid #F2F2F2;
        }
        .flex_number{
            position: absolute;
            bottom: 20rpx;
            right: 20rpx;
            font-size: 24rpx;
            color: #FFFFFF;
            font-weight: 400;
            background: #000000;
            border-radius: 24rpx;
            opacity: 0.4;
            padding: 10rpx;
            box-sizing: border-box;
        }
    }
    .up_img_inp{
        padding: 32rpx 0;
        box-sizing: border-box;
        border-bottom: 2rpx solid #F2F2F2;

        .title {
            font-size: 30rpx;
            font-weight: bold;
            color: #333333;
            margin-bottom: 20rpx;

            text {
                padding-left: 5rpx;
                font-weight: 400;
                font-size: 24rpx;
                color: #999999;
            }
        }

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
    .channel {
        padding: 30rpx 0;
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
}

.preview_page{
    padding: 40rpx 0rpx;
    box-sizing: border-box;
    background: #fff;
    border-radius: 24rpx;
    .preview_title{
        font-weight: 500;
        font-size: 34rpx;
        color: #333333;
        padding: 30rpx;
        box-sizing: border-box;
    }
    .text_content{
        padding: 20rpx 30rpx;
        padding-top: 0rpx;
        box-sizing: border-box;
        font-size: 32rpx;
        color: #333333;
        font-weight: 400;
        line-height: 52rpx;
    }
    .posts_author{
        display: flex;
        align-items: center;
        padding: 0rpx 30rpx;
        box-sizing: border-box;
        margin-bottom: 20rpx;
        .author_img{
            width: 72rpx;
            height: 72rpx;
            border-radius: 50%;
            margin-right: 16rpx;

        }
        .author_text{
            .author_name{
                font-size: 28rpx;
                font-weight: 500;
                color: #333333;
            }
            .up_time{
                color: #999999;
                font-size: 24rpx;
                font-weight: 400;
            }

        }
    }
    .swiper_box{
        width: 100%;
        height: 750rpx;
        .swiper{
            width: 100%;
            height: 100%;
            .swiper_item{
                width: 100%;
                height: 100%;
                .swiper_item_img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }

}
.bottom_box{
    display: flex;
    align-items: center;
    border-top: 2rpx solid #F2F2F2;
    padding: 20rpx 30rpx;
    padding-bottom: 70rpx;
    box-sizing: border-box;
    background: #fff;
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
        // &.isnext{
		//     background: #29C86F;
        // }

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

.bar {
    width: 100%;
    height: 20rpx;
    background-color: #F8F9F9;
}
</style>
  