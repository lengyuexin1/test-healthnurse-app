<template>
    <z-paging
        ref="paging"
        v-model="data.likeLists"
        :auto="true"
        :fixed="true"
        @query="queryList"
        :defaultPageSize="10"
        :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
        empty-view-text="还没有数据哦~"
        :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
    >
        <template #top>
            <TnTabs v-model="data.currentTabIndex" :scroll="true" :bottom-shadow="false" font-size="30rpx" active-font-size="32rpx" color="#666666" bar-color="#EA3E1A" active-color="#EA3E1A" @change="tabsChange">
                <TnTabsItem v-for="(item, index) in data.tabsData" :key="index" :title="item.text" />
            </TnTabs>
            <view class="nav_mangage" :class="[data.isEdit ? 'navRed' : '']" @tap="clickManage" v-if="data.likeLists.length">{{ data.subTitle }}</view>
        </template>
        
        <view class="container" :class="[data.isEdit ? 'pb90' : '']">
            <SelectAllCancel btnName="取消点赞" :list="data.likeLists" :isEdit="data.isEdit" @clickItem="clickItem" @clickBtn="clickUnlike"></SelectAllCancel>
        </view>
    </z-paging>
    <BCNotify ref="bcNotify"></BCNotify>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { onLoad } from "@dcloudio/uni-app"
import { getAssetsPic } from '@/common/setPicture'
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import SelectAllCancel from '@/pagesUser/components/selectAllCancel/index.vue'

import BCNotify from '@/components/notify/index.vue'
import { pageController } from '@bc/uni-tools'
import { likeLists, unlike } from '@/api/user-api'
import { gotosalonPostsDetailPage, gotoarticledetails, gotocourseVideo, gotovideoPreview } from "@/routes/create-routes"
import { TempStorage } from "@bc/base"


interface Data {
    likeLists: any
    subTitle: string
    isEdit: boolean
    currentTabIndex : number
    tabsData: any
    happyType: number
}

const data = reactive<Data>({
    likeLists: [],
    subTitle: '管理',
    isEdit: false,
    currentTabIndex: 0,
    tabsData: [
        { text: '云课堂' },
        { text: '沙龙' },
        { text: '作品' },
    ],
    happyType: 2
})

const bcNotify = ref()

const paging = ref() as any

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const queryList = (pageNumber: number, pageSize: number) => {
    likeLists({
        pageSize: pageSize,
        pageNumber: pageNumber,
        query: {
            happyType: data.happyType
        }
    }).then((res: any) => {
        // 给每个对象添加checked属性
        const data = res.data.map((item: any) => {
            return {
                ...item,
                checked: false
            }
        })
        paging.value.complete(data)  
    }).catch((err: any) => {
        bcNotify.value.error(err.message)   
    })
}

const tabsChange = (val: string | number) => {
    val == 0 && (data.happyType = 2)
    val == 1 && (data.happyType = 3)
    val == 2 && (data.happyType = 98)

    data.isEdit = false
    data.subTitle = '管理'
    paging.value.reload()
}

const clickItem = (item: any) => {
    if (item.happyType == 2) {
        if (item.videoUrl) {
            const listId = TempStorage.savewx({
                videoIdlist:[item.id],
            })
            gotocourseVideo(listId)
        }
        else {
            gotoarticledetails({ id: item.id })
        }
    }
    if (item.happyType == 3) {
        gotosalonPostsDetailPage({ id: item.id })
    }

    if (item.happyType == 98) {
        !item.videoUrl && gotoarticledetails({ id: item.id })
        item.videoUrl && gotovideoPreview({videoId: item.id, videoPagetype: 0});
    }

    console.log('item',item);
    
}

const clickUnlike = (ids: any) => {
    unlike({ articleIds: ids }).then(() => {
        bcNotify.value.show('已取消点赞')
        data.isEdit = false
        data.subTitle = '管理'
        paging.value.reload()
    }).catch((err: any) => {
        bcNotify.value.error(err.message)
    })
}

const clickBack = () => {
    pageController.back()
}

const clickManage = () => {
    data.isEdit = !data.isEdit
    data.subTitle = data.isEdit ? '取消管理' : '管理'
}

onLoad((option) => {
    if (option?.type == 'course') {
        data.currentTabIndex = 0
        data.happyType = 2
    }
    else if (option?.type == 'salon') {
        data.currentTabIndex = 1
        data.happyType = 3
    }
    else if (option?.type == 'channel') {
        data.currentTabIndex = 2
        data.happyType = 98
    }
    else if (option?.type == 'chat') {
        data.currentTabIndex = 3
        data.happyType = 98
    }
    else if (option?.type == 'find') {
        data.currentTabIndex = 4
        data.happyType = 98
    }
    else if (option?.type == 'video') {
        data.currentTabIndex = 5
        data.happyType = 98
    }
})

</script>

<style lang="scss" scoped>
:deep(.tn-gray-disabled_border) {
    border-color: #B3B3B3;
}

.nav_mangage {
    color: #333333;
    display: flex;
    justify-content: flex-end;
    padding: 20rpx 30rpx;
    box-sizing: border-box;
}

.pb90 {
    margin-bottom: 90rpx;
}

.navRed {
    color: #EA3E1A;
}
</style>
