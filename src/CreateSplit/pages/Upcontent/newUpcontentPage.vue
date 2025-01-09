<template>
    <view class="container">
        <z-paging 
		    ref="paging"
            :auto="false"
		    :refresher-enabled="false"
		>
            <template #top>
                <!-- :bgstyle="'background: #fff;'" -->
                <PageTopbg :zIndex="-1"  :addheight="150"></PageTopbg>
                <bc-page-navbar :title=" data.isPreview ? '预览' : '发布'">
                    <template #back>
                        <view class="back_icon" @click="outLoadfun">
                            <TnIcon name="left" color="#2F2F2F" size="38" :bold="true"/>
                        </view>
                    </template>
                </bc-page-navbar>
            </template>
            <view class="article_page" v-if="!data.isPreview">

                <!--  -->
                <view class="upFile_box" v-if="data.upType == 3">
                    <view class="upFile_imgBox">
                        <view class="upFile_list">
                            <view class="upFile_item" v-for="(item, index) in data.imgFileList" :key="index">
                                <image
                                    class="upFile_itemImg"
                                    :src="item"
                                    mode="aspectFill"
                                />
                                <view class="fixed_number">{{ index + 1 }}</view>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="upFile_box" v-else>
                    <!-- v-if="data.showImgBox" -->
                    <view class="up_img_inp" @click="openUp" >
                        <view  class="up_box">
                            <view class="up_text">
                                修改封面
                            </view>
                        </view>
                        <image
                            class="video_img"
                            :src="data.videoImg"
                            mode="aspectFill"
                        />
                    </view>
                </view>

                <view class="inp_box">
                    <TnInput 
                    placeholder="请输入标题(2~30个字)" 
                    :underline="true" 
                    :maxlength="30"
                    border-color="#F2F2F2"
                    clearable
                    v-model="data.titlevalue"
                    @blur="titleInpblur" 
                    :custom-style="{ fontSize: '36rpx' }"
                    ></TnInput>
                </view>
                <view class="textarea_box">
                    <textarea 
                        placeholder-style="color:#B2B2B2" 
                        placeholder="请输入正文" 
                        v-model="data.textvalue"
                        :maxlength="500" 
                        @blur="secondInpblur" 
                        @input="inpChange"
                        class="textarea_inp"
                        :auto-height="true"
                    />
                </view>
                

                <view class="position_box" @click="positionFun">
                    <view class="position_left">
                        <TnIcon name="location" color="#333333" size="36rpx"/>
                        <view class="position_text">点击设置坐标</view>
                    </view>
                    <view class="position_right">
                        <view class="position_rightText">{{ !data.regionText ? '请选择' : data.regionText }} </view>
                        <TnIcon name="right" color="#BBBBBB" size="32rpx"/>
                    </view>
                </view>

            </view>
            <view class="preview_page" v-else>
                <view class="swiper_box">
                    <swiper class="swiper" :autoplay="true" :circular="true" @change="swiperchang">
                        <swiper-item class="swiper_item" v-for="(item,index) in data.imgFileList" :key="index">
                            <image
                                @click="preImage(index,data.imgFileList)"
                                class="swiper_item_img"
                                :src="item"
                                mode="aspectFill"
                            />
                        </swiper-item>
                    </swiper>
                    <view class="swiper_number_box" v-if="data.imgFileList.length">
                        {{ data.swiperIndex }}
                        /
                        {{ data.imgFileList.length }}
                    </view>
                </view>
                <view class="salon_posts_title">
                    {{ data.titlevalue }}
                </view>
                <view class="text_content">
                    <!-- {{ data.chatDetail.desc }} -->
                    <mpHtml :content="data.textvalue" />

                </view>

                <view class="location" v-if="data.regionText">
                    <view class="location_box">
                        <view class="location_icon">
                            <TnIcon name="location" color="#333333" size="36rpx"/>
                        </view>
                        <view class="location_text">
                            <!-- {{ '广佛高速公路有限公司' }} | {{ '金沙街道钟村康园路161号' }} -->
                            {{ data.regionText }} 
                        </view>
                    </view>
                </view>
            </view>

            <template #bottom>
                <!-- v-if="props.ischange != 1" -->
                <view class="bottom_box">
                    <template v-if="!data.isPreview">
                        <view class="bottomLeft_btn" v-if="data.upType == 2" @click="saveDraft">保存草稿</view>
                        <view class="bottomLeft_btn" v-if="data.upType == 3" @click="toPreview">预览</view>
                        <view class="bottom_box_btn" @tap="clickBtn">确认发布</view>
                    </template>
                    <template v-else>
                        <view class="del_preview" @click="data.isPreview = false">取消</view>
                    </template>
                </view>
            </template>
        </z-paging>
        <BCNotify ref="bcNotify"></BCNotify>

        <TnPopup v-model="data.showPopup">
            <view class="popup_box">
                <view class="popup_box_top">新纪录还未发布，需要保存草稿吗？</view>
                <view class="popup_box_bottom">
                    <view class="not_preserve" @click="preserve">取消</view>
                    <view class="preserve" @click="saveDraft">确定</view>
                </view>
            </view>
            <BCNotify ref="PopupNotify"></BCNotify>
        </TnPopup> 

        <TnOverlay v-model:show="data.showUpMenu" @click="data.showUpMenu = true" :duration="0" :overlay-closeable="false" :zIndex="30080">
            <view class="upMenu_box">
                <view class="upMenu_item" @click="fromAlbumVideo">从手机选择视频</view>
                <view class="upMenu_item" @click="fromAlbumImg">从手机选择相片</view>
                <view class="bar"></view>
                <view class="upMenu_item not_bottom" @click="notpreserve">取消</view>
            </view>

        </TnOverlay>

    </view>
</template>
    
<script setup lang="ts">
import { ref, reactive, onMounted, nextTick, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import TnOverlay from '@tuniao/tnui-vue3-uniapp/components/overlay/src/overlay.vue'

import PageTopbg from "@/components/page-topbg/page-topbg.vue"

import imgUpload from '@/components/upload/img-upload.vue'
import BCNotify from '@/components/notify/index.vue'
import { formattime } from '@/common/formatTime'
import { getAssetsPic } from '@/common/setPicture'
import { newpostUp, newgetDetail, newSavedraft } from '@/api/create-api'
import dayjs from "dayjs"
import { uploadFileApi, uploadVideo } from '@/api/file-api'
import { gotoIndex } from '@/routes/public-routes'

import mpHtml from '../../uni_modules/mp-html/components/mp-html/mp-html.vue'

import { TempStorage } from "@bc/base"
// const amap = require('../../../utils/amap-wx.130.js')


interface Data {
    titlevalue: string
    textvalue: string
    imgFileList: any
    videoFileList: any
    videoImg: string
    textbol: boolean
    titlebol: boolean
    showPopup: boolean
    dateTimeValue: string
    nowTime: string
    regionText: string
    lng: number
    lat: number
    showImgBox: boolean
    activityId: string|null
    upType: number
    isDraft: number
    auditId: string
    isPreview: boolean
    swiperIndex: number
    showUpMenu: boolean
    keywordItem:string|null
    keywordNumber: number
    categoryId: string
    taskId: string|null
    isBackIndex: number|null

}
const data = reactive<Data>({
    titlevalue: '',
    textvalue: '',
    imgFileList: [],
    videoFileList: [],
    videoImg: '',
    textbol: false,
    titlebol: false,
    showPopup: false,
    dateTimeValue: '',
    nowTime: '',
    regionText: '',
    lng: 0,
    lat: 0,
    showImgBox: false,
    activityId: '',
    upType: 3,
    isDraft: 0,
    auditId: '',
    isPreview: false,
    swiperIndex: 1,
    showUpMenu: false,
    keywordItem: null,
    keywordNumber: 0,
    categoryId: '',
    taskId: null,
    isBackIndex: null


})

const bcNotify = ref()
const PopupNotify = ref()

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const formatTime = (time:number) => {
    return formattime(time, 'YYYY-MM-DD')
}


const isnotNull = computed(()=>{
    console.log('执行');
    
    if (!data.titlevalue) {
        bcNotify.value.show('请输入标题')
        return false
    }
    if (!data.textvalue) {
        bcNotify.value.show('请输入正文')
        return false
    }
    // #ifdef MP-WEIXIN 
    else if (!data.regionText) {
        bcNotify.value.show('请选择定位')
        return false
    }
    // #endif


    return true
})


onMounted(() => {
    uni.getLocation({
        type: "gcj02",
        isHighAccuracy: true,
        geocode: true,
        success: (res) => {
            console.log("定位成功",res)

            // data.lat = res.latitude,
            // data.lng = res.longitude
            
        },
        fail: (err) => {
            console.log('定位失败',err);
            
        }
    })
})


onLoad((option:any)=> {
    console.log('option',option);
    data.isDraft = option.isDraft == 1 ? 1 : 0
    // #ifdef APP-PLUS || H5
    data.regionText = '广东省广州市白云区'
    data.lng = 113.27324
    data.lat = 23.15792
    // #endif

    data.isBackIndex = option.isBackIndex ? option.isBackIndex : null 


    if (option.isjoinActivity == 1) {
        data.activityId = option.activityId
        
        data.categoryId = option.categoryId
        data.keywordItem = option.topic;

        let newStr = data.keywordItem != '' ? '#' + data.keywordItem + '#' : ''
        data.textvalue = newStr

        data.keywordNumber = data.keywordItem!.length

        // #ifdef MP-WEIXIN 
        data.showUpMenu = true
        // #endif

    }

    if (option.taskId) {
        data.taskId = option.taskId
        // #ifdef MP-WEIXIN 
        data.showUpMenu = true
        // #endif

    }

    if (option.isChange == 1) {
        data.auditId = option.editId
        newgetDetail({
            id: option.editId
        }).then((res:any) => {
            console.log('res',res);
            data.upType = res.baseInfo.type
            data.imgFileList = res.baseInfo.images
            data.videoImg = res.baseInfo.cover
            data.videoFileList = data.upType == 2 ? [res.baseInfo.videoUrl] : []
            data.titlevalue = res.baseInfo.title
            data.textvalue = res.baseInfo.desc
            data.lat = res.baseInfo.lat
            data.lng = res.baseInfo.lng
            data.regionText = res.baseInfo.address
            data.categoryId = res.baseInfo.categoryId


            // data.keyword = res.baseInfo.keyword

            data.keywordItem = res.baseInfo.keyword[0]
            if (data.keywordItem) {
                data.keywordNumber = data.keywordItem!.length
                data.activityId = res.baseInfo.activityId
                console.log('修改查询到参加活动',data.activityId);
                
            }

        })
    }else{
        const tempStorage = new TempStorage()
        tempStorage.get(option!.UpurlList).then((res:any) => {
            console.log('res',res);
            

            data.imgFileList = res.urlList.filter((item:any) => item.isVideo !== true);
            data.videoFileList = res.urlList.filter((item:any) => item.isVideo == true);


            // 处理初始化数据
            if (data.videoFileList.length != 0) {
                data.videoFileList = data.videoFileList.map((item:any) => item.url)
                data.videoImg = data.videoFileList[0] + '?x-oss-process=video/snapshot,t_0000,f_jpg'
                console.log('data.videoImg',data.videoImg);
                
                data.upType = 2
                console.log('data.videoFileList',data.videoFileList);

            }else{
                data.imgFileList = data.imgFileList.map((item:any) => item.url)
                data.videoImg = data.imgFileList[0]
                console.log('data.videoImg',data.videoImg);
                
                data.upType = 3
                data.showImgBox = true
                console.log('data.imgFileList', data.imgFileList);

                
            }

        }).catch((err:any) => {
            console.log('相册选择失败',err);
        })
    }



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

// 修改视频封面
const openUp = () => {
    uni.chooseImage({
        count: 1,
        sourceType: ['album'],
        success: function (res) {
            console.log(JSON.stringify(res.tempFilePaths));

            const url = res.tempFilePaths[0]
            const name = dayjs().valueOf() + ''     

            uploadFileApi(url,name,'merchant/license').then((res:any) => {
                data.videoImg = res.url
            }).catch((err:any) => {
                console.log('上传err',err);
            })

        }
    })
}

// 标题框修改
const titleInpblur = (val: any) => {
    if (!data.titlevalue) {
        data.titlebol = false
        return
    }
    data.textbol = true
}

// 多行文本框修改
const secondInpblur = (val:any) => {
    if(!data.textvalue){
        data.textbol = false
        return
    }
    data.textbol = true
}


// 发布
const clickBtn = () =>{
    if (!isnotNull.value) {
        return
    }

    let upInfo = {
        baseInfo: {
            title: data.titlevalue,
            cover: data.upType == 3 ? data.imgFileList[0] : data.videoImg,
            desc: data.textvalue,
            type: data.upType,
            videoUrl: data.videoFileList[0],
            images: data.imgFileList,
            lng: data.lng,
            lat: data.lat,
            address: data.regionText,
            keyword: [data.keywordItem],
            activityId: data.activityId ? data.activityId : null,
            isAddActivity: data.activityId ? 1 : 0,
            categoryId: data.categoryId,
            taskId: data.taskId ? data.taskId : null,
        },
        auditId: data.auditId,
    }


    // if (data.isDraft == 1) {
    //     // 处理草稿
    //     saveDraft()
    //     return
    // }

    newpostUp(upInfo).then((res:any) => {
        bcNotify.value.show('发布成功')

        setTimeout(()=>{
            if (data.isBackIndex == 1) {
                console.log('返回首页');
                gotoIndex()
                return
            }
            uni.navigateBack()
        }, 2000)
    }).catch((err:any) =>{
        bcNotify.value.error(err.message)

    })

}

// 创建草稿
const saveDraft = () => {
    if (!isnotNull.value) {
        return
    }
    let upInfo = {
        baseInfo: {
            title: data.titlevalue,
            cover: data.upType == 3 ? data.imgFileList[0] : data.videoImg,
            desc: data.textvalue,
            type: data.upType,
            videoUrl: data.videoFileList[0],
            images: data.imgFileList,
            lng: data.lng,
            lat: data.lat,
            address: data.regionText,
            keyword: [data.keywordItem],
            activityId: data.activityId ? data.activityId : null,
            isAddActivity: data.activityId ? 1 : 0,
            categoryId: data.categoryId,
            taskId: data.taskId ? data.taskId : null,
        },
        auditId: data.auditId,
    }
    newSavedraft(upInfo).then((res:any) => {
        data.showPopup = false;
        bcNotify.value.show('保存成功')

        setTimeout(()=>{
            if (data.isBackIndex == 1) {
                console.log('返回首页');
                gotoIndex()
                return
            }
            uni.navigateBack()
        }, 2000)
    }).catch((err:any) =>{
        data.showPopup = false;

                bcNotify.value.error(err.message)

    })


}


// onUnload
const outLoadfun = () => {
    
    if ( data.textbol ) {
        console.log('页面退出保存草稿');
        data.showPopup = true
    }else{
        data.showPopup = false
        notpreserve()
    }
    
}

// 退出页面
const notpreserve = () => {
    data.showUpMenu = false

    if (data.isBackIndex == 1) {
        console.log('返回首页');
        gotoIndex()
        return
    }
    uni.navigateBack();
}

// 取消保存草稿
const preserve = () => {
    data.showPopup = false
    notpreserve()
}

// 获取定位
const positionFun = () => {
    uni.chooseLocation({
        success: (res:any) => {
            console.log('res',res);
            
            data.regionText = res.address.slice(0,9)
            data.lat = res.latitude
            data.lng = res.longitude

            console.log('data.lat',data.lat);
            console.log('data.lng',data.lng);
            
        }
    })
}

// 预览
const toPreview = () => {
    data.isPreview = true
}

const swiperchang = (e:any) => {
    data.swiperIndex = e.detail.current + 1
}

// 图片预览
const preImage = (current:number, urls:any) => {
    uni.previewImage({
        current,
        urls
    })
}


// 相册获取相片
const fromAlbumImg = () => {
    uni.chooseImage({
        count: 9,
        sourceType: ['album'],
        success: function (res) {
            AlbumUpFile(res.tempFilePaths,1)
        }
    })
}

// 相册获取视频
const fromAlbumVideo = () => {
    uni.chooseVideo({
        count: 1,
        sourceType: ['album'],
        success: function (res) {
            AlbumUpFile([res.tempFilePath],2)
        }
    })
}

const AlbumUpFile = (selectList:any, fileType:number) =>{
    uni.showLoading({
        title: '上传中...'
    });


    console.log('data.selectList',selectList);

    const promises = selectList.map((item:any) => {
        const url = item
        const name = dayjs().valueOf() + ''
        console.log('item',item);
        
        if (fileType == 2) {
            console.log('上传视频');
            return new Promise((resolve, reject) => {
                uploadVideo(url).then((res:any) => {
                    data.videoFileList.push(res.url)
                    resolve(true)
                }).catch((err:any) => {
                    console.log('上传err',err);
                    reject(false)
                })
            })
        }
        
        console.log('上传相片');
        return new Promise((resolve, reject) => {
            uploadFileApi(url,name,'merchant/license').then((res:any) => {
                data.imgFileList.push(res.url)
                resolve(true)
            }).catch((err:any) => {
                console.log('上传err',err); 
                reject(false)
            })
        })
    });

    // 上传完成
    Promise.all(promises).then(() => {

        console.log('data.videoFileList',data.videoFileList);
        console.log('data.imgFileList',data.imgFileList);
        
        if (data.imgFileList.length > 0) {
            data.upType = 3

        }
        if (data.videoFileList.length > 0) {
            data.upType = 2
            data.videoImg = data.videoFileList[0] + '?x-oss-process=video/snapshot,t_0000,f_jpg'

        }

        data.showUpMenu = false
        uni.hideLoading();

    }).catch((error) => {
        uni.hideLoading();

        console.error('上传Error:', error);
    });
}

const inpChange = (value:any) => {
    let str = value.detail.value
    let matches = str.match(/#/g)?.length;

    if (!data.keywordItem) {
        return
    }

    if (matches! >= 2) {
        console.log('话题存在');
        
    }else{
        console.log('话题不存在');
        let newStr = str.slice(data.keywordNumber + 1)
        data.textvalue = newStr

        data.activityId = null
        data.keywordItem = ''
    }
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
    background: #fff;
    border-radius: 24rpx 24rpx 0rpx 0rpx;
    overflow: hidden;
    .upFile_box{
        margin-bottom: 40rpx;
        .upFile_imgBox{
            width: 100%;
            height: 152rpx;
            overflow: scroll;
            .upFile_list{
                display: flex;
                align-items: center;
                .upFile_item{
                    width: 152rpx;
                    height: 152rpx;
                    border-radius: 16rpx;
                    overflow: hidden;
                    background: #D1D1D1;
                    margin-right: 16rpx;
                    flex-shrink: 0;
                    position: relative;
                    .upFile_itemImg{
                        position: absolute;
                        top: 0;
                        left: 0;
                    }
                    .fixed_number{
                        position: absolute;
                        top: 0;
                        left: 0;
                        border-radius: 16rpx 0rpx 16rpx 0rpx;
                        background-color: rgba(0,0,0,0.3);
                        width: 48rpx;
                        height: 48rpx;
                        font-size: 32rpx;
                        color: #FFFFFF;
                        text-align: center;
                        line-height: 48rpx;
                    }
                }
            }
        }
    }
    .inp_box{
        border-top: 2rpx solid #F2F2F2;
        margin-bottom: 10rpx;
        padding: 10rpx 0rpx;
        box-sizing: border-box;
    }
    .textarea_box{
        width: 100%;
        position: relative;
        margin-bottom: 40rpx;
        .textarea_inp{
            min-height: 240rpx;
            width: 100%;
            padding: 14rpx;
            padding-bottom: 30rpx;
            box-sizing: border-box;
            border-bottom: 2rpx solid #F2F2F2;
        }
    }
    .up_img_inp{
        width: 690rpx;
        height: 260rpx;
        position: relative;
        border-radius: 8rpx;
        overflow: hidden;

        .up_box{
            width: 690rpx;
            height: 260rpx;
            background: #F8F8F8;
            position: relative;
            .up_text{
                position: absolute;
                bottom: 0;
                left: 0;
                background-color: rgba(0,0,0,0.3);
                width: 100%;
                height: 72rpx;
                font-size: 28rpx;
                color: #FFFFFF;
                text-align: center;
                line-height: 72rpx;
                z-index: 1;
            }
        }
        .video_img{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
    .position_box{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 40rpx;
        border-bottom: 2rpx solid #F2F2F2;
        box-sizing: border-box;
        .position_left{
            display: flex;
            align-items: center;
            .position_text{
                margin-left: 14rpx;
                font-weight: 400;
                font-size: 30rpx;
                color: #333333;
            }
        }
        .position_right{
            display: flex;
            .position_rightText{
                margin-right: 8rpx;
                color: #666666;
                font-size: 30rpx;

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
.preview_page{
    background: #fff;
    .salon_posts_title{
        color: #333333;
        font-size: 38rpx;
        font-weight: 500;
        padding: 30rpx;
        box-sizing: border-box;
    }
    .swiper_box{
        width: 100%;
        height: 750rpx;
        position: relative;
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
        .swiper_number_box{
            position: absolute;
            bottom: 20rpx;
            right: 20rpx;
            background: #000;
            opacity: 0.4;
            border-radius: 24rpx;
            padding: 4rpx 12rpx;
            box-sizing: border-box;
            text-align: center;
            color: #FFFFFF;
        }
    }
    .text_content{
        padding: 40rpx 30rpx;
        padding-top: 0rpx;
        box-sizing: border-box;
        font-size: 32rpx;
        color: #333333;
        font-weight: 400;
        line-height: 52rpx;
    }
    .location{
        padding: 40rpx 30rpx;
        padding-bottom: 30rpx;
        padding-top: 0rpx;
        box-sizing: border-box;
        .location_box{
        
            width: 100%;
            padding: 12rpx;
            box-sizing: border-box;
            background: #F6F6F6;
            border-radius: 8rpx;
            display: flex;
            align-items: center;
            .location_text{
                margin-left: 8rpx;
                color: #666666;
                font-size: 24rpx;
                width: 88%;
                white-space: nowrap; /*强制一行内显示*/
                overflow: hidden;/*溢出隐藏*/
                text-overflow: ellipsis;/*超出部分现实省略号*/
            }
        }
    }
}

.bottom_box{
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 2rpx solid #F2F2F2;
    padding: 20rpx 30rpx;
    padding-bottom: 50rpx;
    box-sizing: border-box;
    background: #fff;
    .bottomLeft_btn{
        width: 250rpx;
		height: 80rpx;
		text-align: center;
		border-radius: 46rpx;
        line-height: 80rpx;
		font-size: 32rpx;
        border: 2rpx solid #E3E3E3;
        background: #fff;
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
    .del_preview{
        width: 100%;
		height: 80rpx;
		font-size: 32rpx;
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

.upMenu_box{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-radius: 16rpx;
    box-sizing: border-box;
    overflow: hidden;
    background: #FFFFFF;
    padding-bottom: 60rpx;

    .bar{
        width: 100%;
        height: 12rpx;
        background: #F2F2F2;
    }
    .upMenu_item{
        width: 100%;
        text-align: center;
        color: #333333;
        border-bottom: 2rpx solid #F2F2F2;
        padding: 26rpx 0rpx;
        font-size: 32rpx;
        &.not_bottom{
            border-bottom: none;
        }
    }
}

.bar {
    width: 100%;
    height: 8rpx;
    background-color: #F8F9F9;
}


</style>
<style>
page{
    background: #fff;
}
</style>
  