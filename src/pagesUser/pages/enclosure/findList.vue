<template>
    <z-paging
        ref="paging"
        v-model="data.dataList"
        :auto="false"
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
            <bc-page-navbar :title="data.isfin ? '发现' : '附近'" ></bc-page-navbar>
        </template>

        <view class="content_list">
            <WaterFalls :wfList="data.dataList" @waterItem="clickwaterItem"></WaterFalls>
        </view>


        <BCNotify ref="bcNotify"></BCNotify>
        <yk-authpup ref="authpup" type="top" @changeAuth="getLocation" permissionID="ACCESS_FINE_LOCATION"></yk-authpup>
    </z-paging>

</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, defineExpose, watch } from 'vue'
import { onLoad, onReady } from '@dcloudio/uni-app'
import { getAssetsPic } from '@/common/setPicture'
import { getDistances } from '@/utils/distance'

import WaterFalls from './components/WaterFalls.vue'
import pageTopbg from '@/components/page-topbg/page-topbg.vue'

import BCNotify from '@/components/notify/index.vue'

import { nearbyGoods, nearbyList } from '@/api/user-api'
import { gotovideoPreview, gotoarticledetails } from '@/routes/create-routes'
import ykAuthpup from "@/components/yk-authpup/yk-authpup.vue"
interface Data{
    dataList: any,
    nearbyList: any,
    isfin: boolean,
    lat: any
    lng: any
}
const data = reactive<Data>({
    dataList: [],
    nearbyList: [],
    isfin: false,
    lat: 0,
    lng: 0
})

interface Props {
    lat: number,
    lng: number,
}

const props = defineProps<Props>()



const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})


onLoad((option:any) => {
    data.isfin = option.isfin == 1
})
onReady(() => {
    if (!data.isfin) {
        // #ifdef APP-PLUS

        console.log('authpup.value', authpup.value)

        authpup.value.open()

        // #endif

        // #ifndef APP-PLUS
        // #endif
        getLocation()

        return
    }
    // 异步获取定位，手动调用一次
    queryList(1, 10)
})

const bcNotify = ref()
const paging = ref([])
const queryList = (pageNumber:number, pageSize:number) => {
    const query = !data.isfin ?
        {
            lat: data.lat,
            lng: data.lng
        } : {}
    nearbyList({
        pageNumber,
        pageSize,
        query
    }).then((res:any) => {
        console.log('res', res);

        (paging.value as any).complete(res.data)
    })
}

const getLocation = () => {
    uni.getLocation({
        type: "gcj02",
        isHighAccuracy: true,
        success: (res) => {
            console.log("定位成功", res)
            data.lat = res.latitude
            data.lng = res.longitude
            queryList(1, 10)
        },
        fail: () => {
            queryList(1, 10)
        }
    })
}



const clickwaterItem = (item:any) => {
    item.type == 1 && gotoarticledetails({ id: item.id })
    item.type == 2 && gotovideoPreview({ videoId: item.id, videoPagetype: 2 })
    item.type == 3 && gotoarticledetails({ id: item.id })

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
