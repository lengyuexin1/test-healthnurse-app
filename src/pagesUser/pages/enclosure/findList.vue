<template>
    <z-paging
        ref="paging"
        v-model="data.dataList"
        :auto="true"
        :fixed="true"
        @query="queryList"
        :defaultPageSize="10"
        :empty-view-center="false"
        :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
        :empty-view-text='"还没有数据哦~"'
        :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
    >
        <template #top>
            <pageTopbg :zIndex="-1" :bgstyle="'background: #fff;'"></pageTopbg>
            <bc-page-navbar :title="'发现'" ></bc-page-navbar>
        </template>
        
        <view class="content_list">
            <WaterFalls :wfList="data.dataList" @waterItem="clickwaterItem"></WaterFalls>
        </view>


        <BCNotify ref="bcNotify"></BCNotify>
    </z-paging>
    
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, defineExpose, watch } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import { getDistances } from '@/utils/distance'

import WaterFalls from './components/WaterFalls.vue'
import pageTopbg from '@/components/page-topbg/page-topbg.vue'

import BCNotify from '@/components/notify/index.vue'

import { nearbyGoods, nearbyList } from '@/api/user-api'
import { gotovideoPreview, gotoarticledetails } from '@/routes/create-routes'
interface Data{
    dataList: any,
    nearbyList: any,
    
}
const data = reactive<Data>({
    dataList: [],
    nearbyList: [],
})

interface Props {
    lat: number,
    lng: number,
}

const props = defineProps<Props>()



const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})


onMounted(()=>{
    
})

const bcNotify = ref()
const paging = ref()
const queryList = (pageNumber:number, pageSize:number)=>{
    // let query = props.showIocation ? 
    // {
    //     lat: props.lat,
    //     lng: props.lng,
    // } : {}
    nearbyList({
        pageNumber,
        pageSize,
        query: {}
    }).then((res:any) => {
        console.log('res',res);
        
        (paging.value as any).complete(res.data)
    })
    
}



const clickwaterItem = (item:any) =>{
    item.type == 1 && gotoarticledetails({ id: item.id });
    item.type == 2 && gotovideoPreview({videoId: item.id, videoPagetype: 2});
    item.type == 3 && gotoarticledetails({ id: item.id });

}

defineExpose({
})


</script>

<style lang="scss" scoped>

.content_list{
    padding: 30rpx 6rpx;
    box-sizing: border-box;
}


</style>
<style>
page{
    background: #F8F8F8;
}
</style>