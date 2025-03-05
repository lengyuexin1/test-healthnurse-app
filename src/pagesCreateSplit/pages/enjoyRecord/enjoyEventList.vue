<template>
	<view class="container">
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
                <PageTopbg bgstyle="background: transparent;" :zIndex="-1"></PageTopbg>
                <bc-page-navbar :title="'大事记'" :bgColor="'#FFFFFF'"></bc-page-navbar>
                <view class="add_btn" v-if="false">
                    <view></view>
                    <view class="add" @click="upbtn">添加</view>
                </view>
            </template>
            <view class="list_box">
                <view class="event_item" v-for="item in data.dataList" :key="item.id" @click="enjoyDetail(item)">
                    <view class="event_time">{{ formatTime(item.baseInfo.utcRecord) }}</view>
                    <view class="event_content">
                        <view class="event_text_box">
                            <view class="desc_box">
                                {{ item.baseInfo.desc }}
                            </view>
                            <view class="place_text">{{ item.baseInfo.address }}</view>
                        </view>
                        <image
                            class="event_img"
                            :src="item.baseInfo.cover"
                            mode="aspectFill"
                        />
                    </view>
                </view>
            </view>


            
		</z-paging>
        <BCNotify ref="bcNotify"></BCNotify>

	</view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { onLoad, onShow } from "@dcloudio/uni-app"

import BCNotify from '@/components/notify/index.vue'
import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import { getAssetsPic } from '@/common/setPicture'
import { gotoUpenjoyRecord, gotoenjoyEventDetail } from '@/routes/create-routes'
import { 
    enjoyList,
    enjoydetail
} from '@/api/create-api'
import { formattime } from '@/common/formatTime'


interface Data {
    dataList: any,
    myenjoyObj: any,
}

const data = reactive<Data>({
    dataList: [],
    myenjoyObj: {}

})

const bcNotify = ref()
const paging = ref()

const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})

const formatTime = computed(() => (time:number) => {
    return formattime(time ,'YYYY年MM月DD日')
})

onLoad((options:any) => {
})

onShow(() => {
})

onMounted(()=>{
})


const queryList = (pageNumber: number, pageSize: number) => {
    if (pageNumber == 1) {
        enjoydetail({}).then((res:any) => {
            data.myenjoyObj = res;
        })
    }
    enjoyList({
        pageNumber,
        pageSize,
        query:{
            status: 3,
            audit: 5,
            tagId: 999,
        }
    }).then((res:any) => {
        paging.value.complete(res.data)
    })
}

const upbtn = () => {
    if (data.myenjoyObj.permission.isRecord != 1) {
        bcNotify.value.show('没有记录权限');
        return
    }
    gotoUpenjoyRecord({isEvent: 1})
}

const enjoyDetail = (item:any) => {
    console.log('item',item);
    gotoenjoyEventDetail({id: item.audit.id})
}

</script>

<style lang="scss" scoped>
.add_btn{
    width: 100%;
    padding: 30rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .add{
        font-size: 28rpx;
        color: #333333;
        font-weight: 400;
    }
}
.list_box{
    width: 100%;
    .event_item{
        padding: 30rpx;
        box-sizing: border-box;
        background: #fff;
        margin-bottom: 16rpx;
        width: 100%;
        .event_time{
            font-size: 28rpx;
            color: #333333;
            margin-bottom: 20rpx;
        }
        .event_content{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .event_text_box{
                width: 424rpx;
                height: 150rpx;
                margin-right: 38rpx;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .desc_box{
                    width: 100%;
                    display: -webkit-box;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    font-size: 28rpx;
                    font-weight: 400;
                    color: #333333;
                }
                .place_text{
                    font-size: 24rpx;
                    font-weight: 400;
                    color: #979797;
                }

            }
            .event_img{
                width: 226rpx;
                height: 150rpx;
                border-radius: 4rpx;
                overflow: hidden;
            }
        }
    }
}
</style>
