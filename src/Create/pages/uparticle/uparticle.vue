<template>
    <view class="container">
        <z-paging-swiper>
            <template #top>
                <pageTopbg :zIndex="-1"></pageTopbg>
                <bc-page-navbar :title="'康养百科'" ></bc-page-navbar>
                <view class="top_box">
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
                <upArticleswiper 
                :articleId="data.articleId" 
                :taskId="data.taskId" 
                :type="data.type" 
                :ischange="data.ischange" 
                :activityId="data.activityId" 
                :topic="data.topic" 
                :categoryId="data.categoryId"
                v-if="data.currentTabIndex == 0"
                ></upArticleswiper>
                <upVideoswiper 
                :articleId="data.articleId" 
                :taskId="data.taskId" 
                :type="data.type" 
                :ischange="data.ischange" 
                :activityId="data.activityId" 
                :topic="data.topic"
                :categoryId="data.categoryId"
                v-else></upVideoswiper>
            </view>
        </z-paging-swiper>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { addContentAccount } from '@/api/create-api'
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import pageTopbg from '@/components/page-topbg/page-topbg.vue'
import upArticleswiper from './components/upArticleswiper.vue'
import upVideoswiper from './components/upVideoswiper.vue'

interface Data {
    articleId: string
    type: number
    currentTabIndex:number,
    tabsData:any,
    ischange: number,
    activityId:string|null,//活动id
    topic:string,
    taskId:string
    categoryId: string

}

const data = reactive<Data>({
    articleId: '',
    type: 0,
    taskId:'',
    currentTabIndex:0,
    tabsData:[
        {id: 1, text: '图文'},
        {id: 2, text: '视频'}
    ],
    ischange: 0,
    activityId:null,
    topic:'',
    categoryId: '',

})

onLoad((options:any) => {
    data.taskId =options.taskId
    data.articleId = options?.articleId
    data.type = options?.type
    data.ischange = options.ischange ? options.ischange : 0
    data.activityId = options.activityId ? options.activityId : null
    data.topic = options.topic
    data.categoryId = options.categoryId

    console.log('data.categoryId',data.categoryId);

    if (options?.type == 2) {
        data.currentTabIndex = 1
    }
    else if (options?.type == 3) {
        data.currentTabIndex = 0
    }

    add()
})

const add = () => {
    addContentAccount({}).then(()=>{
        console.log('添加机构账号')
    })
}

const changeTab = (item: any, index: number) => {
    // data.currentTabIndex = index

    // if (index == 1) {
    //     console.log('视频')
    //     return
    // }
}

const beforeSwitch = (index: number) => {
    if (data.ischange == 1 || data.categoryId) {
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
.top_box{
    background: #fff;
    border-radius: 24rpx 24rpx 0rpx 0rpx;
    overflow: hidden;
}
</style>
  