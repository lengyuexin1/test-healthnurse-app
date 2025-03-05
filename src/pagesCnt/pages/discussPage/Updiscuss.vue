<template>
    <view class="container">
        <z-paging
            ref="paging"
            :auto="false"
            :refresher-enabled="false"
            >
            <template #top>

                <PageTopbg bgstyle="background: linear-gradient( 180deg, #FFE3DE 0%, #F8F9F9 100%);"></PageTopbg>
                <bc-page-navbar :title=" data.isUp ? '发起讨论' : '发布预览' ">
                    <template #back>
                        <view @click="goback">
                            <TnIcon name="left" color="#333333" size="38" :bold="true"/>
                        </view>
                    </template>
                </bc-page-navbar>
            </template>

            <view class="up_content" v-if="data.isUp">
                <view class="up_title_inp">
                    <TnInput
                    v-model="data.inputValue"
                    placeholder="请输入一个完整的标题 (30字内)"
                    size="lg" :underline="true"
                    :placeholder-style="{ color: '#CCCCCC' }"
                    :custom-style="{ paddingLeft: 0 }"
                    @blur="changeisNext"
                    :maxlength="30"
                    />
                </view>
                <view class="up_textarea">
                    <textarea
                        class="textarea_btn"
                        placeholder="添加内容"
                        placeholder-style="color:#CCCCCC"
                        v-model="data.textvalue"
                        @blur="changeisNext"
                        :maxlength="1000"
                    />
                    <view class="statistics_box">
                        <text class="refresh_number">{{ data.textvalue.length }}</text>
                        <text>/1000</text>
                    </view>
                </view>
                <view class="up_img">
                    <view class="up_img_inp" v-if="data.showfilebox">
                        <imgUpload v-model:imageArr="data.fileList" :limit="6" ref="imgUploadref" @upchange="changeisNext">
                            <template #uploadBtn>
                                <view @click="openUp" class="up_box">
                                    <view class="up_icon">
                                        <TnIcon name="add" color="#C9C9C9" size="80"/>
                                    </view>
                                    <view class="up_text">图片</view>
                                </view>
                            </template>
                        </imgUpload>
                    </view>
                </view>

                <view class="location" >
                    <view class="location_box" @click="positionFun">
                        <view class="location_icon">
                            <TnIcon name="location" color="#333333" size="36rpx"/>
                            <view> 添加地点</view>
                        </view>
                        <view class="location_text" >
                            <!-- {{ '广佛高速公路有限公司' }} | {{ '金沙街道钟村康园路161号' }} -->
                            <view>{{ data.regionText }}</view>
                            <TnIcon name="right" color="#B0B0B0" size="32rpx"/>
                        </view>
                    </view>
                </view>
            </view>

            <view class="preview_conten" v-else>
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
                        <view class="up_time">{{ timeformat }} 发布</view>
                    </view>
                </view>
                <view class="swiper_box">
                    <swiper class="swiper" :autoplay="true" :circular="true">
                        <swiper-item class="swiper_item" v-for="(item,index) in data.fileList" :key="index">
                            <image
                                class="swiper_item_img"
                                :src="item"
                                mode="aspectFill"
                            />
                        </swiper-item>
                    </swiper>
                </view>
                <view class="posts_title">{{ data.inputValue }}</view>
                <view class="text_content">
                    <!-- {{ data.textvalue }} -->
                    <mpHtml :content="data.showText" />
                </view>
            </view>

            <template #bottom>
                <view class="create_btn_box" >
                    <view class="create_btn createFun" v-if="data.isUp" @click="createFun">
                        预览
                    </view>
                    <view class="create_btn toUp" :class="{ 'cannotUp': !data.isNext , 'propopen': !data.isUp }" @click="toUp">
                        确定发布
                    </view>
                </view>

            </template>


        </z-paging>

        <yk-authpup ref="authpup" :isNativeHead="false" type="top" @changeAuth="getLocation" permissionID="ACCESS_FINE_LOCATION"></yk-authpup>

        <BCNotify ref="bcNotify"></BCNotify>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, nextTick } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import imgUpload from '@/components/upload/img-upload.vue'
import { PlatformManage } from "@bc/sys"
import BCNotify from '@/components/notify/index.vue'
import { formattime } from '@/common/formatTime'

import mpHtml from '@/pagesCnt/uni_modules/mp-html/components/mp-html/mp-html.vue'
import ykAuthpup from "@/components/yk-authpup/yk-authpup.vue"

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'

import { upDiscussion, pushsubmit, geteditPostsDetail, pusheditPosts } from '@/api/create-api'

interface Props {
    salonId:string,
    ischange:number,
    id:string
}
const props = defineProps<Props>()

interface Data{
    inputValue:string,
    textvalue:string,
    fileList:any,
    coverList:any
    isNext:boolean,
    showPopup:boolean,
    isUp:boolean,
    userInfo:any,
    salonDetail:any
    showfilebox:boolean,
    showcoverbox:boolean,
    circleId:string
    showText: string
    firstUp: boolean
    regionText: string
    lat: number
    lng: number
    discussionId: string
    discussionName: string
    release: boolean
}
const data = reactive<Data>({
    inputValue: '',
    textvalue: '',
    fileList: [],
    coverList: [],
    isNext: false,
    showPopup: false,
    isUp: true,
    userInfo: {},
    salonDetail: {},
    showfilebox: false,
    showcoverbox: false,
    circleId: '',
    showText: '',
    firstUp: true,
    regionText: '',
    lat: 0,
    lng: 0,
    discussionId: '',
    discussionName: '',
    release: false
})

const timeformat = computed(() => {
    const time = new Date().getTime()
    return formattime((time / 1000), 'YYYY-MM-DD HH:mm')
})

onLoad((option:any) => {
    data.discussionId = option.discussionId
    data.discussionName = option.discussionName

    // data.lng = 0
    // data.lat = 0
    // data.regionText = "保椿集团"
})



const authpup = ref()

onMounted(() => {
    // // #ifdef APP-PLUS
    // authpup.value.open()
    // // #endif

    // // #ifndef APP-PLUS
    // getLocation()
    // // #endif


    PlatformManage.getToken().then((res:any) => {
        data.userInfo = res
    })
    if (props.ischange) {
        console.log('修改内容', props.id)
        geteditPostsDetail({
            id: props.id
        }).then((res:any) => {
            console.log('res', res)
            getdetail(res.baseInfo.circleId)
            data.circleId = res.baseInfo.circleId
            data.inputValue = res.baseInfo.title
            data.textvalue = res.baseInfo.desc
            data.coverList = [res.baseInfo.cover]
            data.fileList = res.baseInfo.images

            data.showfilebox = true
            data.showcoverbox = true

            data.isNext = true
        })
    }
    else {
        getdetail(props.salonId)
        data.showfilebox = true
        data.showcoverbox = true
    }

})

const getdetail = (id:string) => {
    // getsalonDetail({
    //     id
    // }).then((res)=>{
    //     data.salonDetail = res
    // })
}

// 校验内容
const changeisNext = () => {

    if (data.inputValue && data.textvalue && data.fileList.length != 0 && data.regionText) {
        data.isNext = true
    }
    else {
        data.isNext = false
    }

    console.log('data.isNext', data.isNext)
    console.log('data.fileList.length', data.fileList.length)
}

const imgUploadref = ref()
const openUp = () => {
    nextTick(() => {
        console.log('手动调用', imgUploadref, imgUploadref.value)
        imgUploadref.value.chooseFileFun()
    })
}


const bcNotify = ref()
const createFun = () => {
    data.showText = data.textvalue.replace(/\n/g, '<br>')
    if (!data.isNext) {
    	bcNotify.value.error('内容未输入完全')
        return
    }
    data.isUp = false
    // data.showPopup = true
}
// data.coverList[0]
const toUp = () => {
    if (!data.isNext) {
        bcNotify.value.error('内容未输入完全')
        return
    }
    if (data.release) {
        return
    }
    data.release = true
    upDiscussion({
        baseInfo: {
            title: data.inputValue,
            cover: data.fileList[0],
            desc: data.textvalue,
            type: 3,
            images: data.fileList,
            lng: data.lng,
            lat: data.lat,
            circleId: data.discussionId,
            discussionName: data.discussionName,
            address: data.regionText,
            tagIds: [10],
            tagNames: ['讨论区']
        }
    }).then(() => {
        bcNotify.value.show('发布成功')
        setTimeout(() => {
            uni.navigateBack()
        }, 1000)
    }).catch((err:any) => {
        bcNotify.value.error(err.message)
        data.release = false
    })
}

const goback = () => {
    if (data.isUp) {
        uni.navigateBack()
        return
    }
    data.isUp = true
}

const getLocation = () => {
    uni.getLocation({
        type: "gcj02",
        isHighAccuracy: true,
        success: (res) => {
            console.log("定位成功", res)
            data.lat = res.latitude
            data.lng = res.longitude
        },
        fail: (err) => {
            console.log('err', err)
        }
    })
}

// 获取定位
const positionFun = () => {
    uni.chooseLocation({
        success: (res:any) => {
            console.log('res', res)

            data.regionText = res.address.slice(0, 9)
            data.lat = res.latitude
            data.lng = res.longitude

            console.log('data.lat', data.lat)
            console.log('data.lng', data.lng)

            changeisNext()

        }
    })
}

</script>

<style lang="scss" scoped>
.up_content{
    width: 100%;
    background: #FFFFFF;
    border-radius: 24rpx 24rpx 0rpx 0rpx;
    padding: 40rpx 30rpx;
    box-sizing: border-box;
    .up_tosalon{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 20rpx;
        box-sizing: border-box;
        border-bottom: 2rpx solid #F2F2F2;
        margin-bottom: 20rpx;
        .tosalon_text{
            font-size: 28rpx;
            color: #333333;
            font-weight: 500;
        }
        .salon_box{
            display: flex;
            align-items: center;
            .salon_img{
                width: 72rpx;
                height: 72rpx;
                border-radius: 8rpx;
                box-sizing: border-box;
                margin-right: 16rpx;
            }
            .salon_name{
                font-size: 28rpx;
                font-weight: 500;
                color: #333333;
            }
        }
    }
    .up_title_inp{
        margin-bottom: 32rpx;
    }
    .up_textarea{
        margin-bottom: 40rpx;
        position: relative;
        padding-bottom: 20rpx;
        .textarea_btn{
            width: 100%;
            height: 280rpx;
            border-bottom: 2rpx solid #F2F2F2;
            margin-left: 10rpx;
        }
        .statistics_box{
            position: absolute;
            bottom: -20rpx;
            right: 30rpx;
            font-size: 24rpx;
            font-weight: 400;
            color: #BFBFBF;
            .refresh_number{
                color: #999999;
                font-size: 28rpx;
            }
        }
    }
    .up_img{
        margin-bottom: 40rpx;

        .up_img_title{
            color: #333333;
            font-size: 30rpx;
            margin-bottom: 20rpx;
        }
        .up_img_inp{
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
    }
    .location{
        padding: 40rpx 0rpx;
        box-sizing: border-box;
        border-bottom: 2rpx solid #F2F2F2;
        border-top: 2rpx solid #F2F2F2;
        .location_box{

            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .location_icon{
                display: flex;
                align-items: center;
                font-weight: 500;
                font-size: 30rpx;
                color: #333333;
            }
            .location_text{
                color: #666666;
                font-size: 30rpx;
                // width: 88%;
                // white-space: nowrap; /*强制一行内显示*/
                // overflow: hidden;/*溢出隐藏*/
                // text-overflow: ellipsis;/*超出部分现实省略号*/
                display: flex;
                align-items: center;

            }
        }
    }


}

.preview_conten{
    .posts_title{
        padding: 32rpx 30rpx;
        padding-bottom: 0rpx;
        box-sizing: border-box;
        font-size: 34rpx;
        font-weight: 500;
        color: #333333;
    }
    .posts_author{
        display: flex;
        align-items: center;
        padding: 8rpx 40rpx;
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
    .text_content{
        padding: 40rpx 30rpx;
        box-sizing: border-box;
        font-size: 32rpx;
        color: #333333;
        font-weight: 400;
        line-height: 52rpx;
    }
}

.create_btn_box{
    padding: 16rpx 30rpx;
    padding-bottom: 68rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .create_btn{
        padding: 18rpx 0rpx;
        box-sizing: border-box;
        height: 80rpx;
        border-radius: 44rpx;
        text-align: center;
        font-size: 30rpx;
        &.createFun{
            width: 250rpx;
            border: 2rpx solid #E3E3E3;
            color: #535353;
            background: #FFFFFF;
        }
        &.toUp{
            width: 420rpx;
            background: #EA3E1A;
            border-radius: 44rpx;
            color: #FFFFFF;
        }
        &.cannotUp{
            opacity: 0.4;
        }
        &.propopen{
            width: 100%;
        }
    }
}

</style>
<style>
page{
    background: #FFFFFF;
}
</style>

