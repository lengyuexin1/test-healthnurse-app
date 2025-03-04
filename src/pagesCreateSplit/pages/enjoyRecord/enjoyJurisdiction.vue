<template>
	<view class="container">
        <z-paging
            ref="paging"
            v-model="data.dataList"
            :auto="true"
            :fixed="true"
            @query="queryList"
            :defaultPageSize="10"
            :hide-empty-view="true"
            :auto-show-back-to-top="true"
        >
            <template #top>
                <PageTopbg bgstyle="background: transparent;" :zIndex="-1"></PageTopbg>
                <bc-page-navbar :title="data.pageTitle" :bgColor="'#FFFFFF'"></bc-page-navbar>
                <view class="notice_box">
                    {{ data.noticeText }}
                </view>
            </template> 
            <view class="permission_list">
                <view class="permission_item" v-for="(item,index) in data.dataList" :key="item.id" >
                    <view class="item_left">
                        <image
                            class="item_thumb"
                            :src="item.thumb"
                            mode="scaleToFill"
                        />
                        <view class="item_name">{{ item.name }}</view>
                    </view>
                    <TnSwitch v-model="item.isAuth" active-color="#29C86F" @change="changeAuth(item,index)"></TnSwitch>
                </view>
            </view>
            


            
		</z-paging>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { onLoad, onShow } from "@dcloudio/uni-app"

import TnSwitch from '@tuniao/tnui-vue3-uniapp/components/switch/src/switch.vue'

import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import { getAssetsPic } from '@/common/setPicture'
import { gotoUpenjoyRecord, gotoenjoyEventDetail } from '@/routes/create-routes'
import { 
    permissionList,
    permissionEdit
} from '@/api/create-api'


interface Data {
    dataList: any
    pageTypeList: any
    pageType: number
    pageTitle: string
    noticeText: string
}

const data = reactive<Data>({
    dataList: [],
    pageTypeList: [
        { title: '记录权限', notice: '开启的老友，可以发表日常记录。' },
        { title: '分享与下载权限', notice: '开启的老友，可以分享与下载日常记录照片，小视频。' },
        { title: '邀请权限', notice: '开启的老友，可以邀请他人加入此圈子。' },
    ],
    pageType: 0,
    pageTitle: '',
    noticeText: '',


})

const bcNotify = ref()
const paging = ref()

const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})


onLoad((options:any) => {
    data.pageType = options.type
    data.pageTitle = data.pageTypeList[(data.pageType - 1)].title
    data.noticeText = data.pageTypeList[(data.pageType - 1)].notice
})

onShow(() => {
})


const queryList = (pageNumber: number, pageSize: number) => {
    permissionList({
        query:{
            type: data.pageType
        },
        pageNumber,
        pageSize
    }).then((res:any) => {
        console.log('res',res);
        let arr = res.data.map((item:any) => {
            return {
                ...item,
                isAuth: item.isAuth == 1 ? true : false
            }
        })
        console.log('arr',arr);
        
        paging.value.complete(arr)
        
    })
}

const changeAuth = (item:any,index:number) => {
    console.log('item',item);
    console.log('index',index);
    permissionEdit({
        memberId: item.id,
        type: data.pageType,
        isAuth: item.isAuth ? 1 : 0
    }).then(()=>{
        console.log('修改成功');
    }).catch((err:any)=>{
        bcNotify.value.error(err.message)
    })
}


</script>

<style lang="scss" scoped>
.notice_box{
    padding: 16rpx 30rpx;
    box-sizing: border-box;
    background: #FFF6E6;
    font-weight: 400;
    font-size: 28rpx;
    color: #F59A24;
}
.permission_list{
    .permission_item{
        padding: 20rpx 30rpx;
        box-sizing: border-box;
        background: #FFFFFF;
        margin-bottom: 12rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .item_left{
            display: flex;
            align-items: center;
            .item_thumb{
                width: 80rpx;
                height: 80rpx;
                border-radius: 50%;
                margin-right: 16rpx;
            }
            .item_name{
                font-size: 28rpx;
                color: #333333;
                font-weight: 400;
            }
        }
    }
}
</style>
<style>
page{
    background: #F8F9F9;
}
</style>
