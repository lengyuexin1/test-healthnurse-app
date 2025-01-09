<template>
    <view class="container">
        <z-paging
            ref="paging"
            :auto="false"
		    :refresher-enabled="false"
        >
            <template #top>
                <view id="pageTop">
                    <PageTopbg></PageTopbg>
                    <bc-page-navbar :title="'城市选择'"></bc-page-navbar>
                </view>
            </template>
            <view class="current_city_box">
                <view class="current_city_title">当前城市</view>
                <view class="current_city_conten">
                    <view class="city_icon_box">
                        <image
                            class="location_icon"
                            :src="getAssetsUrl('/leyou/icon/city.svg')"
                            mode="scaleToFill"
                        />
                        <view class="city_name">{{ data.nowCity }}</view>
                    </view>
                    <view class="new_location" @click="ReloadCity">重新定位</view>
                </view>
            </view>
            <view class="open_city_box">
                <view class="open_city_title">
                    平台已开通城市
                </view>
                <view class="city_list">
                    <view 
                    class="city_item" 
                    v-for="(item,index) in data.cityList" :key="item.id" 
                    @click="changecity(item,index)"
                    :class="{ 'is_item_city' : data.cityId == item.id }">
                        {{ item.name }}
                        <image
                            v-if="data.cityIndex == index"
                            class="is_city"
                            :src="getAssetsUrl('/leyou/icon/is_city.svg')"
                            mode="scaleToFill"
                        />
                    </view>
                </view>
            </view>



        </z-paging>
        <BCNotify ref="bcNotify"></BCNotify>

    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted, getCurrentInstance, nextTick } from 'vue'

import { getAssetsPic } from '@/common/setPicture'
import PageTopbg from "@/components/page-topbg/page-topbg.vue"

import { PlatformManage } from "@bc/sys"
import BCNotify from '@/components/notify/index.vue'


interface Props {
}
const props = defineProps<Props>()

interface Data{
    cityList:any,
    cityIndex:number,
    nowCity:string,
    cityId:number,
}
const data = reactive<Data>({
    cityList:[
        {id:1,name:'佛山市'},
        {id:2,name:'中山市'},
        {id:3,name:'深圳市'},
        {id:4,name:'清远市'},
        {id:5,name:'珠海市'},
        {id:6,name:'东莞市'},
        {id:7,name:'江门市'},
        {id:8,name:'肇庆市'},
    ],
    cityIndex:999,
    nowCity:'广州',
    cityId:11,


})

onMounted(() => {
    PlatformManage.getToken().then((res:any)=>{
        console.log('res',res);
        data.nowCity = res.city ? res.city : '广州'
        data.cityId = res.cityId
    })
})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const bcNotify = ref()
const changecity = (item:any,index:number) =>{
    data.cityIndex = index
    
    data.nowCity = item.name
    data.cityId = item.id

    PlatformManage.getToken().then((res:any)=>{
        let newObj = {
            ...res,
            city: data.nowCity,
            cityId : data.cityId
        }
        PlatformManage.setToken(newObj).then(() => {
            bcNotify.value.success('已切换至'+ data.nowCity)
            setTimeout(() => {
                uni.navigateBack()
            }, 1000);
        })


    })


}

const ReloadCity = () => {
    PlatformManage.getToken().then((res:any)=>{
        let newObj = {
            ...res,
            city: '广州',
            cityId : 11
        }
        PlatformManage.setToken(newObj).then(() => {
            data.nowCity = '广州'
            data.cityId = 11
        })
    })
}


</script>
  
<style lang="scss" scoped>
.current_city_box{
    padding: 40rpx 30rpx;
    box-sizing: border-box;
    .current_city_title{
        font-size: 30rpx;
        color: #666666;
        font-weight: 400;
        margin-bottom: 20rpx;
    }
    .current_city_conten{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 28rpx 36rpx;
        box-sizing: border-box;
        background: #fff;
        border-radius: 24rpx;
        .city_icon_box{
            display: flex;
            align-items: center;
            .location_icon{
                width: 42rpx;
                height: 42rpx;
                margin-right: 14rpx;
            }
            .city_name{
                font-size: 30rpx;
                font-weight: 500;
                color: #000002;
            }
        }
        .new_location{
            font-size: 28rpx;
            color: #EA3E1A;
            font-weight: 400;
        }

    }

}

.open_city_box{
    padding: 0rpx 30rpx;
    box-sizing: border-box;
    
    .open_city_title{
        font-size: 30rpx;
        color: #666666;
        font-weight: 400;
        margin-bottom: 20rpx;
    }
    .city_list{
        padding: 30rpx;
        padding-bottom: 14rpx;
        box-sizing: border-box;
        width: 100%;
        background: #fff;
        border-radius: 24rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        .city_item{
            padding: 16rpx 34rpx;
            box-sizing: border-box;
            border-radius: 8rpx;
            overflow: hidden;
            font-weight: 500;
            color: #333333;
            font-size: 26rpx;
            background: #F7F7F7;
            margin-bottom: 16rpx;
            position: relative;
            &.is_item_city{
                background: #FFE5E5;
                color: #EA3E1A;
            }
            .is_city{
                position: absolute;
                top: 0;
                right: 0;
                width: 28rpx;
                height: 28rpx;
            }
        }

    }
}
</style>
  
<style scoped>
/* :deep(.zp-paging-container-content) {
    height: 100% !important;
}
:global(.zp-paging-container-content) {
    height: 100% !important;
} */
</style>