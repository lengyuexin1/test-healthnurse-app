<template>
    <z-paging
        ref="paging"
        v-model="data.dataList"
        :auto="true"
        :fixed="true"
        @query="queryList"
        :defaultPageSize="10"
        :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
        empty-view-text="还没有数据哦~"
        :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
    >
        <template #top>
            <!--            <view class="type_list">-->
            <!--                <TnTabs -->
            <!--                v-model="data.currentTabIndex" -->
            <!--                :scroll="false" -->
            <!--                :bottom-shadow="false" -->
            <!--                bar-color="#EA3E1A" -->
            <!--                active-color="#EA3E1A"-->
            <!--                color="#666666">  -->
            <!--                    <TnTabsItem -->
            <!--                    v-for="(item, index) in data.typeList"-->
            <!--                    :key="index"-->
            <!--                    :title="item.name"-->
            <!--                    @click="changeTab(item)"-->
            <!--                    />-->
            <!--                </TnTabs>-->
            <!--            </view>-->
        </template>

        <view class="card_list">
            <FeedbackItem v-for="(item, index) in data.dataList" :key="item.id" :item="item"></FeedbackItem>
        </view>

        <template #bottom>
            <BottomSingleBtn btnName="+新增" @clickBtn="clickAdd"></BottomSingleBtn>
        </template>
    </z-paging>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { onLoad, onShow } from "@dcloudio/uni-app"
import { getAssetsPic } from '@/common/setPicture'
import FeedbackItem from './components/feedback-item.vue'
import { feedbackList } from '@/api/user-api'
import BottomSingleBtn from '@/components/bottomSingleBtn/index.vue'
import { gotoAddFeedback } from '@/routes/user-routes'

interface Data {
    dataList: any
    tname: string
    typeList: any
    audit: string | number
    currentTabIndex: number
}
const data = reactive<Data>({
    dataList: [],
    tname: '',
    typeList: [
        { id: '', name: '全部' },
        { id: 0, name: '待处理' },
        { id: 1, name: '已处理' }
    ],
    audit: '',
    currentTabIndex: 0
})

const paging = ref() as any

const getAssetsUrl = computed(()=>(src: string)=> {
    return getAssetsPic(src)
})

onLoad((option) => {

})

onShow(() => {
    paging.value?.reload()
})

const queryList = (pageNumber: number, pageSize: number) => {
    feedbackList({
        query: {},
        pageNumber,
        pageSize
    }).then((res:any)=>{
        paging.value?.complete(res.data)
    })
}

const changeTab = (item: any) => {
    data.audit = item.id
    paging.value?.reload()
}

const clickAdd = () => {
    gotoAddFeedback()
}

onMounted(() => {

})

</script>

<style lang="scss" scoped>
.type_list{
    width: 100%;
    .type_item{
        padding: 10rpx 24rpx;
        box-sizing: border-box;
        text-align: center;
        font-size: 28rpx;
        color: #333333;
        border: 2rpx solid #E6E6E6;
        border-radius: 32rpx;
        &.is_type{
            color: #EA3E1A;
            border: 2rpx solid #EA3E1A;
        }
    }
}

.card_list{
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding: 20rpx;
}
</style>

