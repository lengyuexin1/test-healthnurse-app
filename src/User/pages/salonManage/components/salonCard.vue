<template>
    <view class="container">
        <view class="left">
            <image
                class="salon_img"
                :src="props.salonItem.cover"
                mode="aspectFill"
            />
            <view class="left_text">
                <view class="left_title">{{ props.salonItem.name }}</view>
                <view class="left_bace">{{ props.salonItem.desc }}</view>
                <view class="left_active">活跃度: {{ props.salonItem.activation ? props.salonItem.activation : '--' }}</view>
            </view>
        </view>
        <view class="right">
            <view class="card_type" v-if="props.salonItem.audit" :class="{ 'under_review' : props.salonItem.audit.audit == 2 , 'not_passed' : props.salonItem.audit.audit == 3 }">
                {{ props.salonItem.audit.auditName}}
            </view>
            
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'

interface Props {
    salonItem:any
}
const props = defineProps<Props>()


onMounted(() => {
    
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
            width: 370rpx;
            flex: 1;
            .left_title{
                color: #333333;
                font-weight: 500;
                font-size: 30rpx;
                margin-bottom: 8rpx;
                width: 100%;
                white-space: nowrap; 
                overflow: hidden;
                text-overflow: ellipsis;
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
            &.under_review{
                color: #FBA02B;
            }
            &.not_passed{
                color: #EA3E1A;
            }
            
        }
    }
}
</style>
 
