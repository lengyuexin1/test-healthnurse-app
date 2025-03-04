<template>
    <view class="container">
        <z-paging-swiper :auto="false">
            <template #top>
                <pageTopbg :zIndex="-1" :bgstyle="'background: #fff;'"></pageTopbg>
                <bc-page-navbar :title="'发布'" >
                    <template #back>
                        <view @click="goback">
                            <TnIcon name="left" color="#333333" size="38" :bold="true"/>
                        </view>
                    </template>
                </bc-page-navbar>
                <view class="top_box" >
                    <view class="top_swiper">
                        <TnTabs 
                        v-model="data.currentTabIndex" 
                        :scroll="false" 
                        :bottom-shadow="false"
                        font-size="28"
                        active-font-size="32"
                        bar-color="#EA3E1A"
                        active-color="#333333"
                        :before-switch="beforeSwitch"
                        >
                            <TnTabsItem
                            v-for="(item, index) in data.tabsData"
                            :key="index"
                            :title="item.text"
                            @click="changeTab(item,index)"
                            color="#888888"
                            active-color="#333333"
                            />
                        </TnTabs>
                    </view>
                </view>
            </template>

            <view class="swiper_page">
                <swiper class="swiper" :current="data.currentTabIndex" @change="changeSwiper">
                    <swiper-item v-if="data.showArticle">
                        <upEnjoyArticleswiper 
                        ref="upArticle"
                        :auditId="data.auditId" 
                        :type="data.type" 
                        :ischange="data.ischange" 
                        :isEvent="data.isEvent"
                        @delAudit="delAudit"
                        v-if="data.currentTabIndex == 0"
                        ></upEnjoyArticleswiper>
                    </swiper-item>
                    <swiper-item v-if="data.showVideo">
                        <upEnjoyVideoswiper 
                        ref="upVideo"
                        :auditId="data.auditId" 
                        :type="data.type" 
                        :ischange="data.ischange"
                        :isEvent="data.isEvent"
                        @delAudit="delAudit"
                        ></upEnjoyVideoswiper>
                        
                    </swiper-item>
			    </swiper>


            </view>

        </z-paging-swiper>
        <BCNotify ref="bcNotify"></BCNotify>
        <TnPopup v-model="data.showAudit" :overlay-closeable="false">
            <view class="delPopup_box">
                <view class="delPopup_title">删除这条记录?</view>
                <view class="delPopup_bottom_box">
                    <view class="delPopup_bottom_item cancel" @click="data.showAudit = false">取消</view>
                    <view class="delPopup_bottom_item determine" @click="delFun">确定</view>
                </view>
            </view>
        </TnPopup>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { onLoad, onUnload, onBackPress } from '@dcloudio/uni-app'

import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'

import pageTopbg from '@/components/page-topbg/page-topbg.vue'

import BCNotify from '@/components/notify/index.vue'
import upEnjoyArticleswiper from './components/upEnjoyArticleswiper.vue'
import upEnjoyVideoswiper from './components/upEnjoyVideoswiper.vue'

import { contentdel } from '@/api/create-api'

interface Data {
    auditId: string
    type: number
    currentTabIndex:number,
    tabsData:any,
    ischange: number,
    showArticle: boolean,
    showVideo: boolean,
    isEvent: boolean,
    showAudit: boolean,
    contentId: string,
}

const data = reactive<Data>({
    auditId: '',
    type: 0,
    currentTabIndex:0,
    tabsData:[
        {id: 1, text: '图文'},
        {id: 2, text: '视频'},
    ],
    ischange: 0,
    showArticle: true,
    showVideo: true,
    isEvent: false,
    showAudit: false,
    contentId: '',
})

onLoad((options:any) => {
    // 内容id
    data.auditId = options?.auditId
    // 内容类型
    data.type = options?.type
    // 是否修改
    data.ischange = options.ischange ? options.ischange : 0
    // 标记为大事件
    data.isEvent = options.isEvent == 1 ? true : false

    if (options?.type == 2) {
        data.currentTabIndex = 1
    }
    else if (options?.type == 3) {
        data.currentTabIndex = 0
    }

    if (data.ischange == 1) {
        if (data.currentTabIndex == 1) {
            data.showArticle = false
        }
        if (data.currentTabIndex == 0) {
            data.showVideo = false
        }

    }

})
const changeTab = (item: any, index: number) => {
    
}

const changeSwiper = (e:any)=>{
    console.log('e',e);
    data.currentTabIndex = e.detail.current
}

const upArticle = ref()
const upVideo = ref()
const goback = () => {
    if (data.currentTabIndex == 0) {
        (upArticle.value as any).outLoadfun()
    }else if (data.currentTabIndex == 1){
        (upVideo.value as any).outLoadfun()
    }
    else{
        uni.navigateBack()
    }
}

const beforeSwitch = (index: number) => {
    if (data.ischange == 1 || data.ischange == 2) {
        console.log('不切换');
        return false
    }
    return true
}

const delAudit = (contentId: string) => {
    data.showAudit = true
    data.contentId = contentId
}

const bcNotify = ref()
const delFun = () => {
    data.showAudit = false
    contentdel({
        ids: [ data.contentId ]
    }).then(()=>{
        bcNotify.value.show('删除成功')
        setTimeout(()=>{
            uni.navigateBack()
        },2000)
    }).catch((err:any)=>{
        bcNotify.value.error(err)
    })
}

</script>

<style>
page{
    background: #fff;
}
</style>

<style lang="scss" scoped>
.swiper_page{
    width: 100%;
    height: 100%;
    .swiper {
        flex: 1;
        height: 100%;
    }
}
.delPopup_box{
    width: 540rpx;
    height: 226rpx;
    background: #FFFFFF;
    border-radius: 24rpx;
    .delPopup_title{
        padding: 50rpx 0rpx;
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