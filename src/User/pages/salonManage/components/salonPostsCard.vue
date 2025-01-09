<template>
    <view class="container">
        <view class="left">
            <image
                class="salon_img"
                :src="postsInfo.cover"
                mode="aspectFill"
            />
            <view class="left_text">
                <view class="left_title">{{ postsInfo.title }}</view>
                <view class="left_active">{{ timeformat( postsInfo.utcCreated ) }}</view>
            </view>
        </view>
        <view></view>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'

import { formattime } from '@/common/formatTime'

interface Props {
    postsInfo:any
}

const props = defineProps<Props>()

const timeformat = computed(()=>(time:number)=>{
    return formattime(time ,'YYYY-MM-DD')
})


onMounted(() => {
    console.log('postsInfo',props.postsInfo);
    

})




</script>
  
<style lang="scss" scoped>
.container{
    background: #fff;
    display: flex;
    .left{
        flex: 1;
        display: flex;
        align-items: center;
        .salon_img{
            width: 132rpx;
            height: 132rpx;
            border-radius: 8rpx;
            box-sizing: border-box;
            margin-right: 20rpx;
        }
        .left_text{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
            .left_title{
                color: #333333;
                font-weight: 500;
                font-size: 30rpx;
                margin-bottom: 8rpx;
            }
            .left_bace{
                font-size: 26rpx;
                color: #666666;
                font-weight: 400;
                margin-bottom: 12rpx;
                width: 100%;
                white-space: nowrap; 
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .left_active{
                font-size: 24rpx;
                color: #666666;
                font-weight: 400;
            }
        }
    }
    .right{
        .card_type{
            color: #666666;
            font-size: 24rpx;
            font-weight: 400;
        }
    }
}
</style>
 
