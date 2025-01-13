<template>
    <view class="container" >
        <z-paging 
            ref="paging" 
            :auto="false"
            :refresher-enabled="false"
            >
            <template #top>
                <PageTopbg></PageTopbg>
                <bc-page-navbar :title="'售后详细'"></bc-page-navbar>
            </template>
            <view class="content">
                <view class="minuli" v-for="(item,index) in data.log" :key="index">
                    <view class="minutype row i-center">
                        <image
                            class="minutype_img"
                            :src="statusIcon(item.statusId)"
                            mode="aspectFill"
                        />
                        <view class="minurig">
                            <view class="minutit u-line-1">{{item.feedback}}</view>
                            <view class="minutime">{{ timeformat(item.utcCreated) }}</view>
                        </view>
                    </view>
                    <view class="minudesc">{{item.note}}</view>
                </view>
                <view class="some">
                    <view class="sometit">填写仲裁证据原因和证据</view>
                    <view class="salebox">
                        <view class="saleli row">
                            <textarea 
                                class="saleli_textarea"
                                maxlength="200" 
                                :count="true" 
                                height="120" 
                                border="none" 
                                v-model="data.desc"
                                :customStyle="{ backgroundColor: '#F9F9F9', paddingBottom: '20px' }"
                                placeholder="补充描述，有助于平台更好的助力您的仲裁问题"
                                />
                        </view>
                        <view class="saleli row">
                            <text class="saletip">请上传凭证，最多3张</text>
                        </view>
                        <view class="up_img">
                            <view class="up_img_inp">
                                <imgUpload v-model:imageArr="data.fileList" :limit="3" ref="imgUploadref">
                                    <template #uploadBtn>
                                        <view @click="openUp" class="up_box">
                                            <view class="up_icon">
                                                <TnIcon name="add" color="#C9C9C9" size="40"/>
                                            </view>
                                            <view class="up_text">图片</view>
                                        </view>
                                    </template>
                                </imgUpload>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="bottom_btn_box">
                <view class="btn" @click="submit">申请仲裁</view>
            </view>
		    

            

    		<BCNotify ref="bcNotify"></BCNotify>
        </z-paging>

    </view>
</template>
    
<script setup lang="ts">
import { ref, reactive, toRef, computed, onMounted, nextTick,  } from 'vue'
import { onLoad, onReady } from '@dcloudio/uni-app'

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import { formattime } from '@/common/formatTime'
import imgUpload from '@/components/upload/img-upload.vue'


import BCNotify from '@/components/notify/index.vue'
import { getAssetsPic } from '@/common/setPicture'

import { getSaleLog, sptApplyFor } from '@/api/order-api'
import { gotowaitingSales } from '@/routes/user-routes'

interface Props {
    id:string,
}
const props = defineProps<Props>()

interface Data {
    log:any,
    detail:any,
    desc:string,
    fileList:any,
}
const data = reactive<Data>({
    log:{},
    detail:null,
    desc:'',
    fileList:[]
})


const bcNotify = ref()

const timeformat = computed(()=>(time:number)=>{
    return formattime(time,'YYYY-MM-DD HH:mm')
})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const statusIcon = computed(()=>(statusId:number)=>{
    const status:any = {
        10: '/sales/salea_icon_xg.png',
        30: '/sales/salea_icon_xg.png',
        10000010: '/sales/salea_icon_tj.png',
        10000030: '/sales/salea_icon_jg.png',
        10000050: '/sales/salea_icon_jg.png',
        20000011: '/sales/salea_icon_tj.png',
        20000050: '/sales/salea_icon_tj.png',
        39999990: '/sales/salea_icon_jj.png',
        40000010: '/sales/salea_icon_cg.png',
        40000050: '/sales/salea_icon_cg.png',
        41000010: '/sales/salea_icon_zc.png',
        41000020: '/sales/salea_icon_xg.png',
        41000030: '/sales/salea_icon_dd.png',
        41999950: '/sales/salea_icon_jg.png',
        41999990: '/sales/salea_icon_jg.png',
        49999990: '/sales/salea_icon_jj.png',
        50000000: '/sales/salea_icon_wc.png'
    }
    return getAssetsPic(status[statusId])
})

onMounted(()=>{

    getSaleLog({
        id: props.id
    }).then((res:any)=>{
        data.log = [res[res.length - 1]]
    }).catch((err:any) => {
        bcNotify.value.error('售后详情获取失败')
    })

})

const imgUploadref = ref()
const openUp = () => {
    nextTick(()=>{
        imgUploadref.value.chooseFileFun()
    })
}


const submit = () => {
    if (!data.desc) {
        bcNotify.value.error('请补充描述')
        return
    }
    if (data.fileList.length < 0) {
        bcNotify.value.error('请上传仲裁凭证')
        return
    }

    sptApplyFor({
        id: props.id,
        desc: data.desc,
        images: data.fileList
    }).then((res)=>{
        bcNotify.value.show('提交成功');
        setTimeout(() => {
            gotowaitingSales({
                id:res,
                status:3
            })
        }, 800)
    }).catch((err:any) => {
        bcNotify.value.error(err.message)
    })
    
}






</script>
  
<style lang="scss" scoped>
.container{
    padding: 20rpx;
    .content{
        padding: 20rpx;
        box-sizing: border-box;
    }

    .minuli{
        margin-bottom: 20rpx;
        padding: 30rpx;
        background: #FFFFFF;
        border-radius: 24rpx;
        .minutype{
            .minutype_img{
                width: 88rpx;
                height: 88rpx;
            }
            .minurig{
                flex: 1;
                padding-left: 16rpx;
                .minutit{
                    font-size: 28rpx;
                    font-weight: 500;
                    line-height: 42rpx;
                    color: #333333;
                }
                .minutime{
                    font-size: 24rpx;
                    font-weight: 400;
                    line-height: 34rpx;
                    color: #999999;
                }
            }
        }
        .minudesc{
            background: #F8F8F8;
            border-radius: 8rpx;
            padding: 18rpx;
            margin-top: 20rpx;
            font-size: 24rpx;
            font-weight: 400;
            line-height: 36rpx;
            color: #666666;
        }
    }
}

.some {
    margin-top: 16rpx;
    background-color: #FFFFFF;
    /* #ifndef APP-NVUE */
    box-shadow: 0rpx 0rpx 16rpx rgba(0, 0, 0, 0.06);
    /* #endif */
    border-radius: 24rpx;
    padding: 30rpx;

    .sometit {
        font-size: 32rpx;
        font-weight: bold;
        color: #333333;
        margin-bottom: 30rpx;
    }

    .salebox {

        .saleli {
            align-items: center;
            justify-content: space-between;
            margin-bottom: 30rpx;
            .saleli_textarea{
                width: 100%;
                padding: 24rpx;
                box-sizing: border-box;
                background: #FBFBFB;
            }

            .saletip {
                font-size: 26rpx;
                font-weight: 400;
                color: #BCBCBC;
            }

        }
        .up_img{
            .up_img_inp{
                .up_box{
                    width: 152rpx;
                    height: 152rpx;
                    background: #F8F8F8;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    .up_text{
                        margin-top: 14rpx;
                        font-size: 24rpx;
                        color: #C9C9C9;
                        font-weight: 400;
                    }
                }
            }
        }
    }
}
.bottom_btn_box{
    padding: 16rpx 30rpx;
    padding-bottom: 46rpx;
    box-sizing: border-box;
    background: #fff;
    .btn{
        width: 100%;
        height: 80rpx;
        border-radius: 40rpx;
        background: #EA3E1A;
        color: #FFFFFF;
        font-size: 30rpx;
        font-weight: 400;
        text-align: center;
        line-height: 80rpx;

    }
}
</style>
  