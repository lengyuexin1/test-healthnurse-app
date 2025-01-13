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
            <PageTopbg :zIndex="-1" :bgstyle="'background: #F8F8F8;'"></PageTopbg>
            <bc-page-navbar :title="'关注推荐'" ></bc-page-navbar>
            <view class="top_inp_box">
                <view class="top_inp" @click="changeinp">
                    <template v-if="!data.showinp">
                        <TnIcon name="search" color="#999999" size="32"></TnIcon>
                        <view class="inp_text">搜索用户或内容</view>
                    </template>
                    <template v-else>
                        <view class="inp_box">
                            <TnInput v-model="data.inputValue" :border="false" placeholder="搜索用户或内容" @blur="inpblur"/>

                        </view>
                    </template>
                </view>
            </view>

        </template>

        <view class="content_title">关注推荐</view>
        <view class="follow_box">
            <view class="follow_item" v-for="item in data.followList" :key="item.accountId" @click="accountDetail(item)">
                <image
                    class="follow_img"
                    :src="item.accountThumb"
                    mode="scaleToFill"
                />
                <view class="author_name">{{ item.accountName }}</view>
                <view class="fans_number">{{ item.cntFans ? item.cntFans : '--' }} 粉丝</view>
                <view class="btn to_follow" @click.stop="followFun(item)" v-if="!item.isFans">关注</view>
                <view class="btn is_follow" @click.stop="followFun(item)" v-else>已关注</view>
            </view>
        </view>
        <view class="content_title">看一看</view>

        <view class="goods_list">
            <WaterFalls :wfList="data.dataList" @waterItem="clickwaterItem"></WaterFalls>
        </view>

        

        <BCNotify ref="bcNotify"></BCNotify>
        

        
    </z-paging>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, defineExpose } from 'vue'
import { onLoad, onShow } from "@dcloudio/uni-app"

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import { getAssetsPic } from '@/common/setPicture'
import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import BCNotify from '@/components/notify/index.vue'
import WaterFalls from './components/WaterFalls.vue'
import { formattime } from '@/common/formatTime'
import { followRecommendList, followContentList } from '@/api/user-api'
import { gotoarticledetails, gotovideoPreview, gotoauthor } from '@/routes/create-routes'
import { unfollow, follow } from '@/api/create-api'

interface Data{
    dataList: any,
    followList: any,
    showinp: boolean,
    inputValue: string,
}

const data = reactive<Data>({
    dataList: [],
    followList: [],
    showinp: false,
    inputValue: ''
})


const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const formatTime = computed(()=>(time:number)=>{
    return formattime(time,'MM月DD日')
})


onMounted(()=>{
    
})

onShow(()=>{
    (paging.value as any).reload()
})

const paging = ref()
const bcNotify = ref()

const queryList = async (pageNumber:number, pageSize:number)=>{
    followRecommendList({
        query:{
            findName: data.inputValue
        },
        pageNumber: 1,
        pageSize: 10,
    }).then((res:any)=>{

        data.followList = res.data
        data.followList.forEach((item:any) => {
            item.isFans = 0
        })

        getFollowList(pageNumber, pageSize)
    })
    
}

const getFollowList = (pageNumber:number, pageSize:number) => {
    let accountIds = data.followList.map((item:any) => {
        return item.accountId
    })

    followContentList({
        query:{
            accountIds,
        },
        pageNumber,
        pageSize
    }).then((res:any) => {
        (paging.value as any).complete(res.data);
    })
}

const clickwaterItem = (item:any) =>{
    console.log('item',item);
    if (item.type == 1 || item.type == 3) {
        gotoarticledetails({id:item.id})
        return
    }
    if (item.type == 2) {
        gotovideoPreview({videoId:item.id,videoPagetype:0});
        return
    }
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

const changeinp = () => {
    data.showinp = true
}

const inpblur = () => {
    if (!data.inputValue) {
        data.showinp = false;
    }
    (paging.value as any).reload()

}

const accountDetail = (item:any) => {
    gotoauthor({
        isuser: 0,
        accountId: item.accountId,
        isFans: 0
    })
}

defineExpose({
})


</script>
<style>
page{
    background: #F8F9F9;
}
</style>

<style lang="scss" scoped>
.top_inp_box{
    padding: 8rpx 20rpx;
    box-sizing: border-box;
    .top_inp{
        width: 100%;
        height: 72rpx;
        background: #FFFFFF;
        box-shadow: 0rpx 0rpx 8rpx rgba(0,0,0,0.04);
        border-radius: 36rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        .inp_text{
            font-weight: 400;
            font-size: 24rpx;
            color: #999999;
            margin-left: 4rpx;
        }
        .inp_box{
            width: 100%;
        }
    }
}
.content_title{
    font-weight: 600;
    font-size: 32rpx;
    color: #333333;
    padding: 28rpx 30rpx;
    padding-bottom: 20rpx;
    box-sizing: border-box;
}
.follow_box{
    padding-left: 20rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    overflow-x: scroll;
    .follow_item{
        width: 188rpx;
        padding: 24rpx 0rpx;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        background: #FFFFFF;
        border-radius: 12rpx;
        margin-right: 20rpx;
        .follow_img{
            width: 80rpx;
            height: 80rpx;
            border-radius: 50%;
            margin-bottom: 12rpx;
        }
        .author_name{
            font-size: 24rpx;
            color: #333333;
            margin-bottom: 12rpx;
            text-align: center;
            width: 150rpx;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .fans_number{
            font-size: 20rpx;
            color: #333333;
            margin-bottom: 12rpx;
            text-align: center;
        }
        .btn{
            padding: 2rpx 20rpx;
            box-sizing: border-box;
            border-radius: 26rpx;
            text-align: center;
            font-size: 22rpx;

            &.to_follow{
                border: 2rpx solid #EA3E1A;
                background: #FFFFFF;
                color: #EA3E1A;
            }
            &.is_follow{
                border: 2rpx solid #F3F3F3;
                background: #F3F3F3;
                color: #7D7D7D;
            }
        }
        
    }

}


.goods_list{
    padding: 0rpx 10rpx;
    box-sizing: border-box;
}


</style>
