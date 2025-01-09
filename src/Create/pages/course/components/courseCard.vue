<template>
    <view class="content">
        <view class="course_item_left">
            <image  
                class="course_img"
                :src="cardObj.cover"
                mode="aspectFill"
            />
            <view class="course_text">
                <view class="course_title">{{ cardObj.coursetitle }}</view>
                <view class="course_author_box">
                    <image
                        class="author_img"
                        :src="cardObj.shopIcon"
                        mode="scaleToFill"
                    />
                    <view class="author_name">{{ cardObj.shopName }}</view>
                </view>
            </view>
        </view>
        <view class="course_btn" @click="tocourseVideo(cardObj)">
            学习
        </view>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'

import { getAssetsPic } from '@/common/setPicture'
import { gotocourseVideo } from '@/routes/create-routes'
import { TempStorage } from "@bc/base"


interface Props {
    cardObj:any
}

const props = defineProps<Props>()


const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})
const handleObj = computed(()=>(item:any)=>{
    return {
        price:item.shopList[0].entityList[0].price,
        cover:item.shopList[0].entityList[0].image,
        coursetitle:item.shopList[0].entityList[0].title,
    }
})

onMounted(() => {

})


const tocourseVideo = (item:any) => {
    console.log(item);
    const listId = TempStorage.savewx({
        videoIdlist:[item.itemId],
        isstudy:1
    })
    gotocourseVideo(listId)
}


</script>
  
<style lang="scss" scoped>
.content{
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    background: #fff;
    border-radius: 12rpx;
    .course_item_left{
        display: flex;
        .course_img{
            width: 140rpx;
            height: 140rpx;
            border-radius: 8rpx;
            margin-right: 20rpx;
        }
        .course_text{
            width: 344rpx;
            height: 140rpx;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .course_title{
                width: 100%;
                white-space: nowrap; 
                overflow: hidden;
                text-overflow: ellipsis;
                font-weight: 500;
                font-size: 30rpx;   
                color: #1A1A1A;
            }   
            .course_author_box{
                display: flex;
                align-items: center;
                .author_img{
                    width: 30rpx;
                    height: 30rpx;
                    margin-right: 8rpx;
                    border-radius: 50%;
                }
                .author_name{
                    font-size: 24rpx;
                    color: #666666;
                }
            }
        }
    }
    .course_btn{
        padding: 10rpx 36rpx;
        box-sizing: border-box;
        background: #EA3E1A;
        border-radius: 6rpx;
        font-size: 26rpx;
        color: #FFFFFF;
    }
}

</style>
  