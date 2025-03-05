<template>
	<view class="container">
        <z-paging 
            ref="paging" 
            :auto="false"
            :refresher-enabled="false"
        >
            <template #top>
                <PageTopbg bgstyle="background: transparent"></PageTopbg>
                <bc-page-navbar :title="'加入老友圈'" :bgColor="'#FFFFFF'">
                    <template #back>
                        <view @click="goback" class="back_icon">
                            <TnIcon name="left" size="38" :bold="true"/>
                        </view>
                    </template>
                </bc-page-navbar>
            </template>
            
            <view class="page_content">
                <view class="information_card">
                    
                    <view class="circle_box">
                        <view class="title_box">
                            <view class="must_icon">*</view>
                            <view class="card_title">老友圈名称</view>
                        </view>
                        <view class="circle_name">{{ data.invitationName }}的老友圈</view>
                    </view>

                    <view class="invitation_box">
                        <view class="title_box">
                            <view class="card_title">邀请人</view>
                        </view>
                        <view class="invitation_name">{{ data.nickName }}</view>
                    </view>

                    <view class="incircle_name_box">
                        <view class="title_box">
                            <view class="must_icon">*</view>
                            <view class="card_title">您在该老友圈中的昵称</view>
                        </view>
                        <view class="incircle_inp_box">
                            <TnInput v-model="data.inputValue" placeholder="请输入您的昵称" :border="false" :maxlength="7"/>
                        </view>
                    </view>
                </view>
            </view>
            
            <view class="change_btn" :class="{ 'not_inputValue' : !data.inputValue }" @click="joinBtn"> 加入 </view>

            
		</z-paging>
        

        <BCNotify ref="bcNotify"></BCNotify>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { onLoad, onShow } from "@dcloudio/uni-app"

import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'

import { gotoIndex } from "@/routes/public-routes"
import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import BCNotify from '@/components/notify/index.vue'
import { joinEnjoy } from '@/api/create-api'
import { gotoenjoyRecord } from '@/routes/create-routes'

import { PlatformManage } from "@bc/sys"
import { gotoLogin } from "@/routes/public-routes"

interface Data {
    inputValue: string,
    circleId: string,
    invitationName: string,
    nickName: string,
}

const data = reactive<Data>({
    inputValue: '',
    circleId: '',
    invitationName: '',
    nickName: '',
})

const bcNotify = ref()
const paging = ref()




onLoad((options:any) => {
    data.circleId = options.circleId
    data.invitationName = options.invitationName
    data.nickName = options.nickName

    const pages = getCurrentPages()
    console.log('jpin',pages);
    
})

onShow(() => {
})




const joinBtn = () => {
    // 检查登录状态
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            bcNotify.value.show('登录失效,请重新登录')
            setTimeout(()=>{
                gotoLogin({retainPage:1})
            },1000)
            return
        }
        if (!data.inputValue) {
            return
        }
        joinEnjoy({
            circleId: data.circleId,
            nickName: data.inputValue,
        }).then((res:any)=>{
            bcNotify.value.show('加入成功')
            setTimeout(()=>{
                gotoenjoyRecord(1)
            },2000)
        }).catch((err)=>{
            bcNotify.value.error(err)
            setTimeout(()=>{
                gotoIndex()
            },2000)
        })
        console.log('data.inputValue',data.inputValue);
    })
}


const goback = () => {
    const pages = getCurrentPages()
    if (pages.length == 2 || pages.length == 1) {
        // data.backindex = true
        gotoIndex()
        return
    }

    uni.navigateBack()
}

</script>

<style lang="scss" scoped>
.page_content{
    padding: 20rpx;
    box-sizing: border-box;
    margin-bottom: 80rpx;
    .title_box{
        display: flex;
        align-items: center;
        .must_icon{
            font-size: 28rpx;
            color: #FF0303;
            margin-right: 6rpx;
        }
        .card_title{
            font-size: 28rpx;
            font-weight: 500;
            color: #333333;
        }
    }
    

    .information_card{
        width: 100%;
        padding: 40rpx;
        box-sizing: border-box;
        background: #FFFFFF;
        border-radius: 12rpx;
        
        .circle_box{
            .circle_name{
                font-size: 28rpx;
                color: #666666;
                font-weight: 400;
                margin-top: 12rpx;
                margin-bottom: 40rpx;
            }
        }

        .invitation_box{
            .invitation_name{
                font-size: 28rpx;
                color: #666666;
                font-weight: 400;
                margin-top: 28rpx;
                margin-bottom: 40rpx;
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
    &.not_inputValue{
        background: #E1E1E1;
    }
}
.back_icon{

}
</style>
