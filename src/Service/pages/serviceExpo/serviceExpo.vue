<template>
    <view class="container">
        <z-paging
            ref="paging" 
            :auto="false"
            :refresher-enabled="false"
        >
            <!-- <template #top>
                <PageTopbg :zIndex="-1"></PageTopbg>
            </template> -->

            <image
                class="Expo_img"
                :src="getAssetsUrl('/leyou/static/serviceExpo.png')"
                mode="scaleToFill"
            />
            

            <!-- @changeTabbar="changeTabbar" -->
            <customTabbar :tabbarData="data.tablist" ></customTabbar>


            <BCNotify ref="bcNotify"></BCNotify>

        </z-paging>

    </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import PageTopbg from '@/components/page-topbg/page-topbg.vue'

import customTabbar from '@/components/custom-tabbar/custom-tabbar.vue'


import { getAssetsPic } from '@/common/setPicture'
import BCNotify from '@/components/notify/index.vue'

interface Data {
    tablist:any,

}
const data = reactive<Data>({
    tablist: [
        { id: 1, icon: '/leyou/static/tabbar-icon/show-recommend.svg', activeIcon: '/leyou/static/tabbar-icon/hide-recommend.svg', name: '首页' },
        { id: 2, icon: '/leyou/static/tabbar-icon/good-icon.svg', activeIcon: '/leyou/static/tabbar-icon/health-good-icon.svg', name: '' },
        { id: 3, icon: '/leyou/static/tabbar-icon/creator-icon.svg', activeIcon: '/leyou/static/tabbar-icon/creator-icon.svg', name: '' },
        { id: 4, icon: '', activeIcon: '', name: '消息' },
        { id: 5, icon: '', activeIcon: '', name: '我的', hoticon: '/leyou/icon/hot-enjoy-icon.svg' }
    ],
})


const bcNotify = ref()

onMounted(()=>{
})


const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})


const paging = ref(null)
const queryList = async (pageNumber:number, pageSize:number)=>{
    // (paging.value as any).complete([])

}

defineExpose({
})

</script>

<style lang="scss" scoped>
.Expo_img{
    width: 100%;
    height: 2440rpx;
}
</style>
