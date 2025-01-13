<template>
	<view class="container">
        <z-paging 
            ref="paging" 
            :auto="false"
            :refresher-enabled="false"
        >
            <template #top>
                <PageTopbg ></PageTopbg>
                <bc-page-navbar :title="'绑定设置'" >
                    <template #back>
                        <view @click="goback">
                            <TnIcon name="left" size="38" :bold="true"/>
                        </view>
                    </template>
                </bc-page-navbar>

            </template>
            
            <view class="container">
                <view class="account">             
                        <view class="account_row">
                            <image :src="getAssetsUrl('/fare/binding_analysis.png')" mode="scaleToFill" class="account_img"></image>
                        </view>
                        <view class="account_desc">确认与【{{data.accountObj.storeName}}】店铺进行收益提现绑定?</view>
                        <view class="account_confirm" @click="submit">确定</view>
                        <view class="account_cencel" @click="goback">返回</view>
                </view>

            </view>
		</z-paging>

        <BCNotify ref="bcNotify"></BCNotify>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { onLoad, onShow } from "@dcloudio/uni-app"

import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import BCNotify from '@/components/notify/index.vue'
import { getAssetsPic } from '@/common/setPicture'
import { PlatformManage } from "@bc/sys"
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { getsimpleInfo, getMoneyBang } from '@/api/user-api'
import { gotoLogin, gotoIndex } from "@/routes/public-routes"
import { gotowithdrawalIncome } from '@/routes/create-routes'

interface Data {
    userinfo: any
    accountObj: any
}

const data = reactive<Data>({
    userinfo: {},
    accountObj: {}
})

const bcNotify = ref()
const paging = ref()

const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})

onLoad((options:any) => {

    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            bcNotify.value.show('登录失效,请重新登录')
            setTimeout(()=>{
                gotoLogin({})
            },1000)
            return
        }
        data.accountObj.storeId = options.scene.replace(/bang_wx_/, '')
        getsimpleInfo({id: data.accountObj.storeId}).then(res=>{
            data.accountObj.storeName=res.name||''
        })
        
    })

})

onShow(() => {
})


const submit = () => {
    getMoneyBang({id:data.accountObj.storeId}).then(res=>{
        bcNotify.value.show('绑定成功')
        console.log('跳转1');

        setTimeout(() => {
            console.log('跳转2');
            
            gotowithdrawalIncome()
        }, 500);
        console.log('跳转3');

    }).catch((error)=>{
       bcNotify.value.error(error.message)
    })
}

const goback = () => {
    const pages = getCurrentPages()
    if (pages.length == 1) {
        // data.backindex = true
        gotoIndex()
        return
    }

    uni.navigateBack()
}


</script>

<style lang="scss" scoped>
.conbg {
    position: relative;
    width: 750rpx;
    height: 180rpx;
}
.container{
    display: flex;
    justify-content: center;
    .account{
        .account_row{
            margin-top: 168rpx;
        display: flex;
        justify-content: center;
            .account_img{
            width: 300rpx;
            height: 300rpx;
        }
        }
        .account_desc{
            width: 600rpx;
            font-weight: 500;
            margin-top: 40rpx;
            text-align: center;
            font-size: 32rpx;
        }
        .account_confirm{
            font-size: 32rpx;
            color: #ffffff;
            width: 570rpx;
            height: 90rpx;
            background: #29C86F;
            border-radius: 46rpx;
            display: flex;
            margin-top: 120rpx;
            justify-content: center;
            line-height: 90rpx;
        }
        .account_cencel{
            margin-top: 40rpx;
            font-size: 32rpx;
            width: 568rpx;
            height: 90rpx;
            line-height: 90rpx;
            border-radius: 46rpx;
            display: flex;
            justify-content: center;
            align-content: center;
            border: 2rpx solid #DCDCDC;
        }
    }
}
</style>