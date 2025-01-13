<template>
    <view class="content">
        <view class="ranking_item" v-for="(item,index) in dataList" :key="item.id" @click="toDetail(item)">
            <view 
            class="index_box"
            :class="{ 'one' : index == 0 , 'two' : index == 1 , 'three' : index == 2}"
            >{{ (index + 1) }}</view>
            <view class="item_text_box">
                <view class="item_title">{{ item.name }}</view>
                <view class="item_bottom">
                    <!-- <view class="cntHeat">热度{{ item.cntHeat }}</view>
                    <view class="cntLike">点赞{{ item.cntLike }}</view> -->
                    <view class="cntHeat">热度{{ Math.floor(Math.random() * 900) + 100 }}</view>
                    <view class="cntLike">点赞{{ Math.floor(Math.random() * 900) + 100 }}</view>
                </view>
            </view>
            <image
                class="item_img"
                :src="item.thumb"
                mode="aspectFill"
            />
        </view>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted, watch, nextTick, getCurrentInstance } from 'vue'

const props = withDefaults(defineProps<{
    dataList:any,
}>(), {
    dataList:[],
})


interface Data {
}
const data = reactive<Data>({
})

interface Events {
    (e: 'waterItem', item: any): void
}
const emit = defineEmits<Events>()

const toDetail = (item:any) => {
    emit('waterItem',item)
}

onMounted(() => {
})


</script>
  
<style lang="scss" scoped>
.content{
    padding: 30rpx;
    box-sizing: border-box;
    background: #fff;
    margin-top: 20rpx;
    border-radius: 32rpx 32rpx 0rpx 0rpx;
    .ranking_item{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 30rpx;
        .index_box{
            font-size: 32rpx;
            font-weight: 600;
            color: #999999;
            &.one{
                color: #FF4000;
            }
            &.two{
                color: #FF8000;
            }
            &.three{
                color: #FFB300;
            }
        }
        .item_text_box{
            width: 424rpx;
            height: 132rpx;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .item_title{
                color: #333333;
                font-size: 28rpx;
                word-break:break-all;
            }
            .item_bottom{
                display: flex;
                align-items: center;
                color: #999999;
                font-weight: 400;
                font-size: 24rpx;
                .cntHeat{
                    margin-right: 20rpx;
                }
            }
        }
        .item_img{
            width: 200rpx;
            height: 132rpx;
            border-radius: 8rpx;
            overflow: hidden;
        }
    }
}
</style>
 
