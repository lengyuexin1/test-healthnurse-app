<template>
    <z-paging
        ref="paging"
        v-model="data.dataList"
        :auto="true"
        :fixed="false"
        @query="queryList"
        @scroll="scrollPage"
        :defaultPageSize="6"
        :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
        empty-view-text="还没有数据哦~"
        :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
        :auto-show-back-to-top="true"
        back-to-top-bottom="180rpx"
        :back-to-top-img="getAssetsUrl('/leyou/home/page_Topup.svg')"
        :back-to-top-style="{ width: '80rpx', height: '80rpx', padding: '18rpx', background: '#fff', borderRadius: '50%' }"
    >


        <template #top>
            <view class="wenyu_nav" v-if="false">
                <view class="wenyu_item" :class="{ 'is_type' : data.listType == index }" v-for="(item, index) in data.wenyuNav" :key="item.id" @click="changeType(item,index)">
                    {{ item.name }}
                </view>
            </view>
        </template>

        <view class="WaterFall_box">
            <WaterfallsFlow :wfList="data.dataList" :is_statistics="false" @waterItem="clickwaterItem"></WaterfallsFlow>
        </view>

        <BCNotify ref="bcNotify"></BCNotify>

        <template #bottom>
            <view class="zpage_bottom">

            </view>
        </template>
    </z-paging>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, defineExpose } from 'vue'
import { getAssetsPic } from '@/common/setPicture'

import WaterfallsFlow from './WaterfallsFlow.vue'

import BCNotify from '@/components/notify/index.vue'
import { gotoLogin } from "@/routes/public-routes"

import { createVideoList, indexBannerList } from "@/api/create-api"
import { PlatformManage } from "@bc/sys"

import { gotovideoPreview } from '@/routes/create-routes'


interface Data{
    sontabsData:any,
    wenyuNav: any,
    soncurrentTabIndex:number,
    dataList:any,
    categoryId: string | number,
    query:any,
    followId:string,

    lodIndex: number,
    swiperList: any,
    listType: number,

}
const data = reactive<Data>({
    sontabsData: [
        { id: 2, name: '看一看' },
        { id: 1, name: '听一听' },
        { id: 3, name: '玩一玩' },
    ],
    wenyuNav: [
        { id: 1, name: '创意短片' },
    ],
    soncurrentTabIndex: 1,
    dataList: [],
    categoryId: 2,
    query: {},
    followId: '',
    
    lodIndex: 1,
    swiperList: [],
    listType: 0,
})


interface Props {
    hidNavIndex: number,
}

const props = defineProps<Props>()

const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})

interface Events {
    (e: 'hideNav', val:boolean): void,
    (e: 'changeNav', index:number): void,
    (e: 'gethidNavList', list:any): void,

}
const emit = defineEmits<Events>()


onMounted(() => {
    emit('gethidNavList', data.sontabsData)

    data.lodIndex = props.hidNavIndex
    indexBannerList({
        pageNumber: 1,
        pageSize: 10,
        query: {
            moduleType: 2
        }
    }).then((res:any) => {
        data.swiperList = res.data

    })
})


const paging = ref()
const queryList = (pageNumber:number, pageSize:number) => {
    console.log('刷新')
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        createVideoList({
            pageNumber,
            pageSize,
            query: {
                name: null
            }
        },isRequireLogin).then((res:any) => {
            console.log('res',res);
            (paging.value as any).complete(res.data)
        }).catch(()=>{
            (paging.value as any).complete([])
        })
    })
    
}


const bcNotify = ref()

const changesontabs = (item:any, index:number, val:boolean = false) => {
    data.soncurrentTabIndex = index
    data.categoryId = item.id
    data.lodIndex = index
    // (paging.value as any).scrollIntoViewByNodeTop(168,0,true);

    if (val) {
        (paging.value as any).refresh()
    }
    else {
        (paging.value as any).reload()
    }
    emit('changeNav', index)
}

// 页面刷新
const pagingReload = (val:boolean = false, index:number = 1) => {

    data.lodIndex = index
    if (val) {
        (paging.value as any).refresh()
    }
    else {
        (paging.value as any).reload(true)
    }
}



const clickwaterItem = (item:any) => {
    console.log('item',item);
    gotovideoPreview({videoId: item.id,videoPagetype: 3});
    
}


const scrollPage = (e:any) => {
    emit('hideNav', true)
}

const backToTopClick = () => {
    console.log('置顶');

    (paging.value as any).scrollToTop(false)

}

const changeType = (item:any,index:number) => {
    if (item.id == 1) {
        bcNotify.value.show('敬请期待')
        return
    }
    data.listType = index
}

defineExpose({
    pagingReload,
    backToTopClick,
    changesontabs
})


</script>

<style lang="scss" scoped>
.wenyu_nav{
    display: flex;
    align-items: center;
    padding: 20rpx;
    box-sizing: border-box;
    background: #FAFAFA;
    .wenyu_item{
        width: 136rpx;
        height: 52rpx;
        line-height: 52rpx;
        margin-right: 20rpx;
        text-align: center;
        font-size: 26rpx;
        color: #6E6E6E;
        border-radius: 32rpx;
        border: 2rpx solid #C4C4C4;
        &.is_type{
            color: #EA3E1A;
            border: 2rpx solid #EA3E1A;
        }
    }
}

.WaterFall_box{
    padding: 0rpx 10rpx;
    box-sizing: border-box;
    .course_type{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 0rpx 10rpx;
        box-sizing: border-box;
        position:fixed;
        z-index:100;
        background:#fff;
        .course_item{
            width: 236rpx;
            height: 68rpx;
            position: relative;
            color: #666666;
            background: #fff;
            border-radius: 6rpx;
            .item_text{
                text-align: center;
                line-height: 68rpx;
                font-size: 30rpx;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                z-index: 10;
            }
            .is_course{
                position: absolute;
                bottom: 15rpx;
                left: 50%;
                transform: translate(-50%, 0rpx);
                width: 64rpx;
                height: 14rpx;
                background: linear-gradient(90deg, #EA3E1A 0%, #FFCFCF 100%);
                // z-index: -10;
            }
            &.is_course{
                color: #333333;
                font-size: 30rpx;
                font-weight: 600;
            }
        }
    }
    .fixed_space{
        height: 74rpx;
        width:100%;

    }
}


</style>
