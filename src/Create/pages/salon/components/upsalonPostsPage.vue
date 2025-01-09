<template>
    <view class="container">
        <z-paging 
            ref="paging" 
            :auto="false"
            :refresher-enabled="false"
            >
            <template #top>
                <PageTopbg></PageTopbg>
                <bc-page-navbar :title="'创建沙龙'"></bc-page-navbar>
            </template>
            
            <view class="up_content">
                <view class="up_title_inp">
                    <TnInput 
                    v-model="data.inputValue" 
                    placeholder="请输入沙龙名称(15个字)" 
                    size="lg" :underline="true" 
                    :placeholder-style="{ color : '#CCCCCC' }"
                    :maxlength="15"
                    @blur="changeisNext"
                    />
                </view>
                <view class="up_textarea">
                    <textarea  
                        class="textarea_btn"
                        placeholder="输入沙龙简介,详细介绍沙龙的主题,规则,帮助感兴趣的新成员快速了解融入,不超过200个字"
                        placeholder-style="color:#CCCCCC"
                        v-model="data.textvalue"
                        @blur="changeisNext"
                        :maxlength="200"
                    />
                </view>
                <view class="salon_tag_box">
                    <view class="salon_tag_title">沙龙标签分类</view>
                    <view class="salon_tag_bace">标签分类为单选，帮助志同道合的朋友快速找到您</view>
                    <view class="tag_list">
                        <view class="tag_item" :class="{ 'is_tag' : item.id == data.tagId }" v-for="item in data.tagList" :key="item.id" @click="changeTag(item)">
                            {{ item.name }}
                        </view>
                    </view>
                </view>
                <view class="up_img">
                    <view class="up_img_title">宣传封面</view>
                    <view class="up_img_inp" v-if="data.showimgUpload">
                        <imgUpload v-model:imageArr="data.fileList" :limit="1" ref="imgUploadref" @upchange="changeisNext">
                            <template #uploadBtn>
                                <view @click="openUp" class="up_box">
                                    <view class="up_icon">
                                        <TnIcon name="add" color="#C9C9C9" size="80"/>
                                    </view>
                                    <view class="up_text">
                                        {{ data.fileList.length < 1 ? '添加封面图片' : '添加图片' }}
                                    </view>
                                </view>
                            </template>
                        </imgUpload>
                    </view>

                </view>
            </view>

            <template #bottom>
                <view class="create_btn_box">
                    <BottomSingleBtn btnName="创建" @clickBtn="createFun"></BottomSingleBtn>
                </view>
            </template>


		    <BCNotify ref="bcNotify"></BCNotify>


        </z-paging>   
        <TnPopup v-model="data.showPopup" :overlay-closeable="false">
            <view class="popup_box">
                <view class="popup_box_top">提交成功，创建审核中</view>
                <view class="popup_box_bottom">
                    <view class="left_btn" @click="backIndex">返回首页</view>
                    <view class="right_btn" @click="tomanage">去查看</view>
                </view>
            </view>
        </TnPopup> 
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted, nextTick } from 'vue'
import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import imgUpload from '@/components/upload/img-upload.vue'
import BCNotify from '@/components/notify/index.vue'
import BottomSingleBtn from '@/components/bottomSingleBtn/index.vue'

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'

import {getcategoryList} from '@/api/service-api'
import { getsalonCategoryList, creatsubmit, getauditdetail, circlesubmit } from '@/api/create-api'
import { gotoIndex } from "@/routes/public-routes"
import { gotosalonManage } from "@/routes/user-routes"

interface Props{
    ischange:number,
    id:string
}
const props = defineProps<Props>()

interface Data{
    inputValue:string,
    textvalue:string,
    tagList:any,
    tagId:number,
    fileList:any,
    isNext:boolean,
    showPopup:boolean,
    tagName:string,
    showimgUpload:boolean,
    auditId:string

    
}
const data = reactive<Data>({
    inputValue:'',
    textvalue:'',
    tagList:[],
    tagId:0,
    fileList:[],
    isNext:false,
    showPopup:false,
    tagName:'',
    showimgUpload:false,
    auditId:'',

})

onMounted(() => {
    getsalonCategory()
    console.log('props.ischange',props.ischange);
    
    if (props.ischange) {
        console.log('修改内容',props.id);
        getauditdetail({
            id:props.id
        }).then((res:any)=>{
            console.log(res);
            data.fileList = [res.baseInfo.cover]
            data.inputValue = res.baseInfo.title
            data.textvalue = res.baseInfo.desc
            data.tagId = res.baseInfo.categoryId
            data.tagName = res.baseInfo.tagName
            data.auditId = res.auditId
            data.isNext = true
            data.showimgUpload =true            
        })
    }else{
        data.showimgUpload = true
    }
})


const getsalonCategory = () => {
    getsalonCategoryList({
        categoryType: 3,
        moduleType: 3
    }).then((res:any)=>{
        res.forEach((element:any) => {
            data.tagList = [
                ...data.tagList,
                ...element.children
            ]
        });
    })
}

const changeisNext = () => {
    console.log('变换',data.fileList);
    if (data.inputValue && data.textvalue && data.fileList.length != 0) {
        data.isNext = true
    }else{
        data.isNext = false
    }
}
const imgUploadref = ref()
const openUp = () => {
    nextTick(()=>{
        console.log('手动调用',imgUploadref ,imgUploadref.value); 
        imgUploadref.value.chooseFileFun()
    })
}

const changeTag = (item:any) => {
    if (data.tagId == item.id ) {
        data.tagId = 0
        data.tagName = ''
        return
    }
    data.tagId = item.id
    data.tagName = item.name

}


const tocreate = () => {
    console.log('发布沙龙');
    
    if (!data.tagId) {
		bcNotify.value.error('未选择创建的沙龙分类')
        return
    }
    let baseInfo = {
        title:data.inputValue,
        desc:data.textvalue,
        cover:data.fileList[0],
        categoryId:data.tagId,
        categoryName:data.tagName,
    }

    console.log('baseInfo',baseInfo);

    creatsubmit({
        baseInfo
    }).then((res)=>{
        data.showPopup = true

    }).catch((err:any) => {
        bcNotify.value.error(err.message)

    })
}

const tocirclesubmit = () => {
    
    if (!data.tagId) {
		bcNotify.value.error('未选择创建的沙龙分类')
        return
    }
    let baseInfo = {
        title:data.inputValue,
        desc:data.textvalue,
        cover:data.fileList[0],
        categoryId:data.tagId,
        categoryName:data.tagName,
    }
    circlesubmit({
        auditId:data.auditId,
        baseInfo:{
            ...baseInfo,
        }
    }).then((res)=>{
        data.showPopup = true
    })
}

const bcNotify = ref()

const createFun = () => {

    if (!data.isNext) {
		bcNotify.value.error('内容未填写完成')
        return
    }
    props.ischange ? tocirclesubmit() : tocreate()        
}

const backIndex = () => {
    gotoIndex()
}
const tomanage = () => {
    gotosalonManage({},2)
}



</script>
  
<style lang="scss" scoped>
.up_content{
    width: 100%;
    background: #FFFFFF;
    border-radius: 24rpx 24rpx 0rpx 0rpx;
    padding: 40rpx 30rpx;
    box-sizing: border-box;
    .up_title_inp{
        margin-bottom: 32rpx;
    }
    .up_textarea{
        margin-bottom: 40rpx;
        .textarea_btn{
            width: 100%;
            height: 250rpx;
            border-bottom: 2rpx solid #F2F2F2;
            margin-left: 10rpx;
        }
    }
    .salon_tag_box{
        padding-bottom: 20rpx;
        box-sizing: border-box;
        border-bottom: 2rpx solid #F2F2F2;
        margin-bottom: 40rpx;
        .salon_tag_title{
            font-size: 30rpx;
            color: #333333;
            margin-bottom: 8rpx;
        }
        .salon_tag_bace{
            font-size: 24rpx;
            color: #999999;
            margin-bottom: 32rpx;
        }
        .tag_list{
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .tag_item{
                padding: 10rpx 24rpx;
                box-sizing: border-box;
                background: #F3F3F3;
                border-radius: 28rpx;
                font-size: 24rpx;
                color: #7E7E7E;
                margin-right: 20rpx;
                margin-bottom: 20rpx;
                &.is_tag{
                    background: #EA3E1A;
                    color: #FFFFFF;
                }
            }
        }
    }
    .up_img{
        .up_img_title{
            color: #333333;
            font-size: 30rpx;
            margin-bottom: 20rpx;
        }
        .up_img_inp{
            .up_box{
                width: 228rpx;
                height: 228rpx;
                background: #F8F8F8;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                .up_text{
                    margin-top: 24rpx;
                    font-size: 24rpx;
                    color: #C9C9C9;
                    font-weight: 400;
                }
            }
        }
    }

    
}
.create_btn_box{
    padding:30rpx;
    box-sizing: border-box;
    background: #fff;

    .create_btn{
        width: 100%;
        height: 90rpx;
        background: #EA3E1A;
        border-radius: 50rpx;
        text-align: center;
        line-height: 90rpx;
        color: #fff;
        font-size: 32rpx;
    }
}
.popup_box{
    width: 500rpx;
    height: 230rpx;
    .popup_box_top{
        width: 100%;
        height: 146rpx;
        line-height: 146rpx;
        text-align: center;
        font-size: 30rpx;
        color: #666666;
        border-bottom: 2rpx solid #F0F0F0;
    }
    .popup_box_bottom{
        display: flex;
        align-items: center;
        .left_btn{
            width: 50%;
            height: 84rpx;
            text-align: center;
            line-height: 84rpx;
            border-right: 2rpx solid #F0F0F0;
            color: #666666;
            font-size: 28rpx;
        }
        .right_btn{
            width: 50%;
            height: 84rpx;
            text-align: center;
            line-height: 84rpx;
            font-size: 28rpx;
            color: #EA3E1A;
        }
    }
}
</style>
 
