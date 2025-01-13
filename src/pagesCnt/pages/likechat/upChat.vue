<template>
    <view class="container">
        <z-paging-swiper :auto="false">
            <template #top>
                <pageTopbg :zIndex="-1" ></pageTopbg>
                <bc-page-navbar :title="'聊天号'" >
                    <template #back>
                        <view class="goback_box" @click="goback">
                            <TnIcon name="left" color="#333333" size="38" :bold="true"/>
                        </view>
                    </template>
                </bc-page-navbar>
            </template>

            <view class="swiper_page">
                <swiper class="swiper" :current="data.currentTabIndex" @change="changeSwiper" >
                    <swiper-item v-if="data.showVideo">
                        <upChatVideoswiper 
                        :auditId="data.auditId" 
                        :type="data.type" 
                        :ischange="data.ischange"
                        v-if="data.currentTabIndex == 0"
                        ></upChatVideoswiper>
                    </swiper-item>
			    </swiper>


            </view>

        </z-paging-swiper>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { onLoad, onUnload, onBackPress } from '@dcloudio/uni-app'
import { addContentAccount } from '@/api/create-api'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import pageTopbg from '@/components/page-topbg/page-topbg.vue'
import upChatVideoswiper from './componets/upChatVideoswiper.vue'

interface Data {
    auditId: string
    type: number
    currentTabIndex:number,
    tabsData:any,
    ischange: number,
    showArticle: boolean,
    showVideo: boolean,
}

const data = reactive<Data>({
    auditId: '',
    type: 0,
    currentTabIndex:0,
    tabsData:[
        {id: 1, text: '视频'},
        {id: 2, text: '图文'},
    ],
    ischange: 0,
    showArticle: true,
    showVideo: true

})

onLoad((options:any) => {
    // 内容id
    data.auditId = options?.auditId
    // 内容类型
    data.type = options?.type
    // 是否修改
    data.ischange = options.ischange ? options.ischange : 0

    if (options?.type == 2) {
        data.currentTabIndex = 0
    }
    else if (options?.type == 3) {
        data.currentTabIndex = 1
    }

    if (data.ischange == 1 || data.ischange == 2) {
        if (data.currentTabIndex == 0) {
            data.showArticle = false
        }
        if (data.currentTabIndex == 1) {
            data.showVideo = false
        }

    }


    add()
})


const add = () => {
    addContentAccount({}).then(()=>{
        console.log('添加机构账号')
    })
}

const changeTab = (item: any, index: number) => {
    
}

const changeSwiper = (e:any)=>{
    if (data.ischange == 1) {
        return
    }
    data.currentTabIndex = e.detail.current
}


const upArticle = ref()
const goback = () => {
    if (data.currentTabIndex == 1) {
        (upArticle.value as any).outLoadfun()
    }else{
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

</script>

<style>
page{
    background: #fff;
}
</style>

<style lang="scss" scoped>
.goback_box{
    height: 68rpx;
    display: flex;
}
.swiper_page{
    width: 100%;
    height: 100%;
    .swiper {
        flex: 1;
        height: 100%;
    }
}

</style>