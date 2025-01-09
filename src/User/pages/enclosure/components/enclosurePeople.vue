<template>
    <z-paging
        ref="paging"
        v-model="data.dataList"
        :auto="true"
        :fixed="false"
        @query="queryList"
        :defaultPageSize="10"
        :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
        empty-view-text="还没有数据哦~"
        :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
        :auto-show-back-to-top="true"
        back-to-top-bottom="200rpx"
    >
        <!-- <template #top>
            
        </template> -->
        <view class="page_content">
            <view class="prople_item" v-for="item in data.dataList" :key="item.accountId" @click="toauthorDetail(item)">
                <image
                    class="avatar_img"
                    :src="item.accountAvatar"
                    mode="scaleToFill"
                />
                <view class="item_right">
                    <view class="item_top">
                        <view class="name_box">
                            <view class="name_text">{{ item.accountName }}</view>
                            <view class="distance_number" v-if="props.showIocation">{{ getdistance(item) }} </view>
                        </view>
                        <view class="btn to_follow" v-if="!item.isFans" @click.stop="followFun(item)">关注</view>
                        <view class="btn del_follow" v-else @click.stop="followFun(item)">已关注</view>
                    </view>
                    <view class="item_bottom">
                        <image  
                            v-for="Imgitem in item.itemList" :key="Imgitem"
                            class="bottom_img"
                            :src="Imgitem.cover"
                            mode="aspectFill"
                        />
                    </view>
                </view>

            </view>

        </view>


        <BCNotify ref="bcNotify"></BCNotify>
    </z-paging>
    
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, defineExpose, watch } from 'vue'
import { getAssetsPic } from '@/common/setPicture'

import { getDistances, getRice } from '@/utils/distance'

import BCNotify from '@/components/notify/index.vue'
import { peopleList } from '@/api/user-api'
import { unfollow, follow } from '@/api/create-api'
import { gotoauthor } from '@/routes/create-routes'

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
    showIocation: boolean
}

const props = defineProps<Props>()



const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const getdistance = computed(()=>(item: any)=>{
    if (!props.lat || !props.lng) { return '' }

    let distance : (number | string) = 0

    if (item.distance < 1) {
        console.log('小于一公里');
        distance = getRice(
            props.lat,
            props.lng,
            item.lat,
            item.lng
        )

        if (distance == 0.0) {
            return '<0.1km'
        }else{
            return distance + 'm'
        }
        
    }else if(item.distance > 1){
        console.log('大于一公里');
        distance = getDistances(
            props.lat,
            props.lng,
            item.lat,
            item.lng
        ) + 'km'
        return distance 

    }
})

onMounted(()=>{
})

const bcNotify = ref()
const paging = ref()
const queryList = (pageNumber:number, pageSize:number)=>{
    peopleList({
        pageNumber,
        pageSize,
        query: props.showIocation ? {
            lat: props.lat,
            lng: props.lng
        } : {}

    }).then((res:any) => {
        let newArr = res.data
        newArr.forEach((item:any) => {
            item.isFans = 0
        });
        console.log('newArr',newArr);
        
        (paging.value as any).complete(newArr)
    })

}


const followFun = (item:any) => {
    if (item.isFans) {
        unfollow({
            accountId: item.accountId
        }).then(()=>{
	        item.isFans = 0
            bcNotify.value.show('取消关注')
        })
    }else{
        follow({
            accountId: item.accountId
        }).then(()=>{
	        item.isFans = 1
            bcNotify.value.show('关注成功')
        }).catch((err:any) => { 
            bcNotify.value.error('不可以给本人点关注哦')
        })
    }
}

const toauthorDetail = (item:any) => {
    gotoauthor({
        isuser: item.isUser,
        accountId: item.accountId,
        isFans: item.isFans
    })
} 

defineExpose({
})


</script>

<style lang="scss" scoped>
.page_content{
    padding: 46rpx 40rpx;
    box-sizing: border-box;
    .prople_item{
        display: flex;
        padding-bottom: 40rpx;
        border-bottom: 2rpx solid #EEEEEE;
        margin-bottom: 40rpx;
        .avatar_img{
            width: 96rpx;
            height: 96rpx;
            border-radius: 50%;
            margin-right: 20rpx;

        }
        .item_right{
            width: 550rpx;
            .item_top{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 20rpx;
                .name_box{
                    .name_text{
                        font-size: 32rpx;
                        color: #333333;
                        margin-bottom: 4rpx;
                    }
                    .distance_number{
                        font-weight: 400;
                        font-size: 24rpx;
                        color: #999999;
                    }
                }
                .btn{
                    width: 112rpx;
                    height: 50rpx;
                    text-align: center;
                    line-height: 50rpx;
                    font-size: 24rpx;
                    font-weight: 400;
                    border-radius: 8rpx;
                    &.to_follow{
                        background: #EA3E1A;
                        color: #FFFFFF;
                    }
                    &.del_follow{
                        background: #E1E1E1;
                        color: #FFFFFF;
                    }
                }
            }
            .item_bottom{
                display: flex;
                align-items: center;
                .bottom_img{
                    width: 116rpx;
                    height: 116rpx;
                    border-radius: 8rpx;
                    margin-right: 12rpx;
                }
            }
        }
    }

}
</style>
<style>
page{
    background: #fff;
}
</style>