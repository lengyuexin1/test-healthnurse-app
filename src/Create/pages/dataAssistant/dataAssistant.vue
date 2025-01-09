<template>
    <view class="container">
        <z-paging-swiper>
            <template #top>
                <pageTopbg :zIndex="-1" bgstyle="background: #fff;" :addheight="200"></pageTopbg>
                <bc-page-navbar :title="'数据助手'" ></bc-page-navbar>
                <view class="top_box" v-if="!data.articleId">
                    <view class="top_swiper">
                        <TnTabs 
                        v-model="data.currentTabIndex" 
                        :scroll="false" 
                        :bottom-shadow="false"
                        font-size="30"
                        active-font-size="36"
                        bar-color="#EA3E1A"
                        active-color="#333333">
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

            <swiper class="swiper_page" :current="data.currentTabIndex" 
				@change="onswiperchange">
                <swiper-item>
					<worksList :articleType="data.articleType" :articleId="data.articleId"></worksList>
                </swiper-item>
                <swiper-item>
					<fansList></fansList>
                </swiper-item>
            </swiper>
        </z-paging-swiper>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import pageTopbg from '@/components/page-topbg/page-topbg.vue'

import worksList from './components/worksList.vue'
import fansList from './components/fansList.vue'

interface Data {
    articleId: string
    currentTabIndex:number,
    tabsData:any,
    articleType: number,
}

const data = reactive<Data>({
    articleId: '',
    currentTabIndex:0,
    tabsData:[
        {id: 1, text: '作品'},
        {id: 2, text: '粉丝'}
    ],
    articleType: 3
})


onLoad((option:any) => {
    data.articleType = option.articleType ? option.articleType : ''
    data.articleId = option.articleId ? option.articleId : ''
})


const changeTab = (item: any, index: number) => {
    // data.currentTabIndex = index

    // if (index == 1) {
    //     console.log('视频')
    //     return
    // }
}

const onswiperchange = (e:any)=>{
    data.currentTabIndex = e.detail.current
}

</script>

<style>
page{
    background: #F8F9F9;
}
</style>
<style lang="scss" scoped>
.swiper_page{
    flex: 1;
    height: 100%;
}
</style>
  