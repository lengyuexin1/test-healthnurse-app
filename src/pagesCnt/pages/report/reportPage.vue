<template>
    <z-paging
        ref="paging" 
		:auto="false"
		:refresher-enabled="false"
    >
        <template #top>
            <PageTopbg bgstyle="background: #fff;" :zIndex="-1" ></PageTopbg>
            <bc-page-navbar :title=" data.pageTitle + '举报' "></bc-page-navbar>
            <view class="space_box"></view>
        </template>
        <view class="reportList_box">
            <view class="reportList_title">举报理由</view>
            <view class="reportList_item" @click="changeReport(item)" :class="{ 'not_bottom' : data.reportList.length == (index + 1)  }" v-for="(item,index) in data.reportList" :key="item.id">
                <view class="item_title">{{ item.reason }}</view>
                <image
                    v-if="item.id == data.reportId"
                    class="item_img"
                    :src="getAssetsUrl('/leyou/create/report_icon.svg')"
                    mode="scaleToFill"
                />
                <view v-else></view>
            </view>
        </view>
        <view class="space_box"></view>

        <view class="from_box">
            <view class="from_title">举报描述(必填)</view>

            <view class="text_box">
                <textarea 
                class="textareaItem" 
                v-model="data.textValue" 
                :placeholder="'请指出违规内容，便于平台判断违规情况'"
                :auto-height="true"
                ></textarea>
            </view>

            <view class="up_img_inp">
                <imgUpload v-model:imageArr="data.fileList" :limit="6" ref="imgUploadref" >
                    <template #uploadBtn>
                        <view @click="openUp" class="up_box">
                            <view class="up_icon">
                                <TnIcon name="add" color="#C9C9C9" size="80"/>
                            </view>
                            <view class="up_text">图片</view>
                        </view>
                    </template>
                </imgUpload>
            </view>
        </view>


        <template #bottom>
            <view class="bottom_box">
                <view class="up_btn" @click="Submit">提交</view>
            </view>
        </template>


        <BCNotify ref="bcNotify"></BCNotify>
        
    </z-paging>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, getCurrentInstance, nextTick } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import { getAssetsPic } from '@/common/setPicture'

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'


import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import BCNotify from '@/components/notify/index.vue'
import imgUpload from '@/components/upload/img-upload.vue'

import { getReportList, postReportsubmit } from '@/api/create-api.ts'
import { gotosubmitReport } from '@/routes/create-routes.ts'

interface Data{
    pageTitle: string
    applicableTypes: number
    reportList: any
    reportId: string
    fileList: any
    textValue: string
    reasonTypeName: string
    toAccountId: string
    toUserId: string
    objectId: string
    objectName: string
    type: number
    isreply: number
}

const data = reactive<Data>({
    pageTitle: '',
    applicableTypes: 1,
    reportList: [],
    reportId: '',
    fileList: [],
    textValue: '',
    reasonTypeName: '',
    toAccountId: '',
    toUserId: '',
    objectId: '',
    objectName: '',
    type: 1,
    isreply: 0,
})






const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

onLoad((option:any)=>{
    console.log('option',option);

    data.applicableTypes = option.applicableTypes
    data.toAccountId = option.toAccountId
    data.toUserId = option.toUserId
    data.objectId = option.objectId
    data.objectName = option.objectName
    data.isreply = option.isreply

    if (data.applicableTypes == 1) {
        data.pageTitle = '用户'
        data.type = 4
    }
    if (data.applicableTypes == 2) {
        data.pageTitle = '群聊'
        data.type = 5
    }
    if (data.applicableTypes == 4) {
        data.pageTitle = data.isreply == 1 ? '回复' : '评论'
        
        // 判断举报的评论是否为回复评论
        data.type = data.isreply == 1 ? 8 : 2


    }
    if (data.applicableTypes == 7) {
        data.pageTitle = '群成员'
        data.type = 7
    }
    if (data.applicableTypes == 8) {
        data.pageTitle = '作品'
        data.type = 3
    }
    if (data.applicableTypes == 9) {
        data.pageTitle = '爱聊'
        data.type = 9
    }
    if (data.applicableTypes == 16) {
        data.pageTitle = '沙龙'
        data.type = 6
    }
    if (data.applicableTypes == 32) {
        data.pageTitle = '直播'
        data.type = 1
    }


    
})

onMounted(()=>{
    getReportList({
        query:{
            applicableTypes: data.applicableTypes
        },
        pageNumber: 1,
        pageSize: 100,
    }).then((res:any) => {
        data.reportList = res.data
        console.log('res',res);
    })
})

const bcNotify = ref()
const imgUploadref = ref()
const openUp = () => {
    nextTick(()=>{
        imgUploadref.value.chooseFileFun()
    })
}

const changeReport = (item:any) => {
    data.reportId = item.id
    data.reasonTypeName = item.reason
}

const Submit = () => {

    console.log('data.textValue',data.textValue);
    

    if (!data.reportId) {
    	bcNotify.value.error('未选择理由')
        return
    }
    if (!data.textValue) {
        bcNotify.value.error('未输入举报描述')
        return
    }
    if (data.fileList.length == 0) {
        bcNotify.value.error('未上传举报截图')
        return
    }


    postReportsubmit({
        reasonType: data.reportId,
        reasonTypeName: data.reasonTypeName,
        type: data.type,
        toAccountId: data.toAccountId ? data.toAccountId : null,
        toUserId: data.toUserId ? data.toUserId : null,
        objectId: data.objectId ? data.objectId : null,
        objectName: data.objectName ? data.objectName : null,
        desc: data.textValue,
        images: data.fileList,
    }).then((res:any) => {
        console.log('res',res);
        bcNotify.value.show('提交成功')
        setTimeout(() => {
            // uni.navigateBack({ delta: 1 })
            gotosubmitReport({
                pageTitle: data.pageTitle + '举报'
            })
        }, 800)
    }).catch((err) => {
        bcNotify.value.show(err.message)
    })
}

</script>

<style lang="scss" scoped>
.space_box{
    width: 100%;
    height: 12rpx;
    background: #F8F9F9;

}
.reportList_box{
    width: 100%;
    padding: 24rpx 30rpx;
    box-sizing: border-box;
    padding-bottom: 0rpx;
    background: #fff;
    .reportList_title{
        font-weight: 600;
        font-size: 30rpx;
        color: #333333;
    }
    .reportList_item{
        width: 100%;
        padding: 30rpx 0rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 2rpx solid #F2F2F2;
        .item_title{
            font-weight: 400;
            font-size: 28rpx;
            color: #333333;
        }
        .item_img{
            width: 40rpx;
            height: 40rpx;

        }
        &.not_bottom{
            border-bottom: none;
        }
    }
}
.from_box{
    background: #fff;
    padding: 24rpx 30rpx;
    box-sizing: border-box;
    .from_title{
        font-weight: 500;
        font-size: 30rpx;
        color: #333333;
        margin-bottom: 16rpx;
    }
    .text_box{
        margin-bottom: 30rpx;
        position: relative;
        width: 100%;
        .textareaItem{
            width: 100%;
            min-height: 180rpx;
            padding: 24rpx;
            box-sizing: border-box;
            background: #F6F6F6;
            border-radius: 8rpx;

        }
    }
    .up_img_inp{
        .up_box{
            width: 160rpx;
            height: 160rpx;
            background: #F8F8F8;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            .up_text{
                margin-top: 16rpx;
                font-size: 24rpx;
                color: #C9C9C9;
                font-weight: 400;
            }
        }
    }
}
.bottom_box{
    padding: 20rpx 30rpx;
    padding-bottom: 70rpx;
    box-sizing: border-box;
    width: 100%;
    .up_btn{
        width: 100%;
        height: 80rpx;
        text-align: center;
        line-height: 80rpx;
        background: #EA3E1A;
        font-size: 32rpx;
        font-weight: 400;
        color: #FFFFFF;
        border-radius: 40rpx;
    }
}
</style>
