<template>
	<view class="container">
        <z-paging 
            ref="paging" 
            :auto="false"
            :refresher-enabled="false"
        >
            <template #top>
                <PageTopbg bgstyle="background: transparent"></PageTopbg>
                <bc-page-navbar :title="'我的信息'" :bgColor="'#FFFFFF'"></bc-page-navbar>
            </template>
            
            <view class="page_content">
                <view class="information_card">
                    <view class="avatar_box">
                        <view class="card_title">我的头像</view>
                        <view class="avatar_img_box" @click="openAuth">
                            <image
                                class="avatar_img"
                                :src="!data.upimgUrl ? data.myenjoyObj.thumb : data.upimgUrl "
                                mode="scaleToFill"
                            />
                            <TnIcon name="right" color="#999999" size="28"/>
                        </view>
                    </view>
                    <view class="circle_name_box">
                        <view class="card_title">老友圈名称</view>
                        <view class="name_inp_box">
                            <view class="inp_box">
                                <!-- 请输入名称 -->
                                <TnInput v-model="data.inputValue" :placeholder="data.myenjoyObj.name" :border="false" :maxlength="7" :disabled="data.inpDisabled"/>
                            </view>
                            <view class="circle_title">的老友圈</view>
                        </view>
                    </view>
                    <view class="incircle_name_box">
                        <view class="card_title">您在该老友圈中的昵称</view>
                        <view class="incircle_inp_box">
                            <!-- 请输入昵称 -->
                            <TnInput v-model="data.nickname" :placeholder="data.myenjoyObj.nickName" :border="false" :maxlength="7"/>
                        </view>
                    </view>
                </view>
            </view>
            
            <view class="change_btn" @click="addEnjoy">
               {{ '修改' }} 
            </view>

            <yk-authpup ref="authpup" :isNativeHead="false" type="top" @changeAuth="uploadAvatar" permissionID="WRITE_EXTERNAL_STORAGE"></yk-authpup>
            
		</z-paging>
        <imgCutter @ok="onok" @cancel="oncancle" :url="data.imgurl" :fixed="true" :blob="false" :maxWidth="500"
        :maxHeight="500"></imgCutter>

        <BCNotify ref="bcNotify"></BCNotify>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { onLoad, onShow } from "@dcloudio/uni-app"

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'

import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import BCNotify from '@/components/notify/index.vue'
import { getAssetsPic } from '@/common/setPicture'
import { PlatformManage } from "@bc/sys"
import { addenjoy, enjoydetail, editmember } from '@/api/create-api'

// import imgCutter from "@/User/components/kspImageCutter/kspImageCutter.vue"
import imgCutter from './components/imgCutter.vue'

import ykAuthpup from "@/components/yk-authpup/yk-authpup.vue"

import { uploadUserAvatar } from '@/api/file-api'
import dayjs from "dayjs"


interface Data {
    myenjoyObj: any,
    nickname: string,
    inputValue: string,
    imgurl: string,
    upimgUrl: string,
    inpDisabled: boolean,
}

const data = reactive<Data>({
    myenjoyObj: {},
    nickname: '',
    inputValue: '',
    imgurl: '',
    upimgUrl: '',
    inpDisabled: false,
})

const bcNotify = ref()
const paging = ref()

const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})

const getuserInfo = () => {
    enjoydetail({}).then((res:any) => {
        PlatformManage.getToken().then((userRes:any)=>{
            data.myenjoyObj = res
            if (userRes.id != res.createdId) {
                data.inpDisabled = true
            }
            console.log('data.inpDisabled',data.inpDisabled);
            
        })
    })
}


onLoad((options:any) => {
})

onShow(() => {
    getuserInfo()
})



const authpup = ref()
const openAuth = () => {
    // #ifdef APP-PLUS
    authpup.value.open()
    // #endif

    // #ifndef APP-PLUS
    uploadAvatar()
    // #endif
}

// 上传头像
const uploadAvatar = () => {
    uni.chooseImage({
        count: 1,
        sourceType: ['camera', 'album'],
        success: (rst) => {
            // 设置url的值，显示控件
            data.imgurl = rst.tempFilePaths[0]

            console.log('rst',rst);
            console.log('data.imgurl',data.imgurl);
            
        }
    })
}

const oncancle = () => {
    data.imgurl = ""
}

const onok = (ev:any) => {
    uploadUserAvatar(ev.path).then((res: any) => {
        data.upimgUrl = `${res.url}?v=${dayjs().unix()}`
        
        oncancle()
    })
}

const addEnjoy = () => {

    editmember({
        circleName: !data.inputValue ? data.myenjoyObj.name : data.inputValue,
        nickName:  !data.nickname ? data.myenjoyObj.nickName : data.nickname,
        thumb: !data.upimgUrl ? data.myenjoyObj.thumb : data.upimgUrl,
        backgroundImage: data.myenjoyObj.backgroundImage,
    }).then(()=>{
        bcNotify.value.show('修改成功')
    }).catch((err:any)=>{
        bcNotify.value.error(err)
    })
    
}


</script>

<style lang="scss" scoped>
.page_content{
    padding: 20rpx;
    box-sizing: border-box;
    margin-bottom: 80rpx;
    .card_title{
        font-size: 28rpx;
        font-weight: 500;
        color: #333333;
    }

    .information_card{
        width: 100%;
        padding: 40rpx;
        box-sizing: border-box;
        background: #FFFFFF;
        border-radius: 12rpx;
        .avatar_box{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            margin-bottom: 40rpx;
            .avatar_img_box{
                display: flex;
                align-items: center;
                .avatar_img{
                    width: 72rpx;
                    height: 72rpx;
                    border-radius: 50%;
                    margin-right: 20rpx;
                }
                
            }
        }
        .circle_name_box{
            margin-bottom: 60rpx;
            .name_inp_box{
                margin-top: 24rpx;
                display: flex;
                align-items: center;
                .inp_box{
                    width: 320rpx;  
                    height: 76rpx;
                    border-radius: 12rpx;
                    overflow: hidden;
                    margin-right: 20rpx;
                    background: #F6F6F6;
                }
                .circle_title{
                    font-weight: 400;
                    font-size: 28rpx;   
                    color: #666666;
                }
            }
        }
        .incircle_name_box{
            .incircle_inp_box{
                margin-top: 24rpx;
                width: 100%;
                height: 76rpx;
                border-radius: 12rpx;
                overflow: hidden;
                background: #F6F6F6;
            }
        }
    }

}
.change_btn{
    width: 570rpx;
    height: 90rpx;
    background: #29C86F;
    border-radius: 46rpx;
    font-size: 32rpx;
    font-weight: 400;
    color: #FFFFFF;
    text-align: center;
    line-height: 90rpx;
    margin: auto;
}
</style>
