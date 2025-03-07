<template>
	<view class="container">
        <z-paging
            ref="paging"
            :auto="false"
            :refresher-enabled="false"
        >
            <template #top>
                <PageTopbg bgstyle="background: transparent;"></PageTopbg>
                <bc-page-navbar :title="'享老记'" ></bc-page-navbar>

                <image
                    class="enjoy_bg"
                    :src="getAssetsUrl('/leyou/create/enjoybg.svg')"
                    mode="scaleToFill"
                />

            </template>

            <view class="space_box"></view>
            <view class="page_content">
                <view class="title">
                    产品介绍
                </view>
                <view class="content_text">
                    享老记是保椿照护中一款私域分享医子，创建圈子后，可以和亲朋好友分享自己的享老生活，并且定时产生云相册，帮助用户记录日常美好生活。
                </view>
                <view class="create_btn" @click="tocreateEnjoy">
                    立即创建
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
import { gotoenjoyRecord } from "@/routes/create-routes"
import { PlatformManage } from "@bc/sys"
import { addenjoy } from '@/api/create-api'

interface Data {
    userinfo: any
}

const data = reactive<Data>({
    userinfo: {}
})

const bcNotify = ref()
const paging = ref()

const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})


const getuserInfo = () => {
    PlatformManage.getToken().then((res:any)=>{
        data.userinfo = res
        console.log('获取info',data.userinfo);
    })
}

const tocreateEnjoy = () => {
    addenjoy({
        name: data.userinfo.nickname,
        nickName: data.userinfo.nickname,
        thumb: data.userinfo.avatar,
    }).then(()=>{
        gotoenjoyRecord(1)
    }).catch((err:any)=>{
        bcNotify.value.err(err)
        setTimeout(()=>{
            uni.navigateBack()
        },2000)
    })
}

onLoad((options:any) => {
    getuserInfo()
})

onShow(() => {
})


</script>

<style lang="scss" scoped>
.enjoy_bg{
    width: 100%;
    height: 692rpx;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
}
.space_box{
    width: 100%;
    height: 560rpx;
}
.page_content{
    padding: 0rpx 40rpx;
    box-sizing: border-box;
}
.title{
    font-size: 44rpx;
    color: #333333;
    font-weight: 600;
    margin-bottom: 30rpx;
}
.content_text{
    line-height: 56rpx;
    font-size: 30rpx;
    font-weight: 400;
    color: #60606E;
    margin-bottom: 120rpx;
}
.create_btn{
    font-weight: 400;
    font-size: 32rpx;
    color: #FFFFFF;
    width: 590rpx;
    height: 90rpx;
    background: #29C86F;
    border-radius: 46rpx;
    text-align: center;
    line-height: 90rpx;
    margin: auto;
}
</style>
<style>
page{
    background: #F8F8F8;
}
</style>
