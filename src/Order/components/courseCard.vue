<template>
    <view class="container">
        <image 
            class="card_img"
            :src="cardObj.cover"
            mode="aspectFill"
        />
        <view class="card_text">
            <view class="card_title">{{ cardObj.coursetitle }}</view>
            <view class="card_price_box">
                <view class="card_price">
                    ￥{{ cardObj.price / 100 }}
                </view>
                <view class="card_number">X1</view>
            </view>
        </view>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'

interface cardObjtype {
    price:number,
    cover:string,
    coursetitle:string,
}

interface Props {
    cardObj:cardObjtype
}

const props = defineProps<Props>()

onMounted(() => {

})




</script>
  
<style lang="scss" scoped>
.container{
    display: flex;
    .card_img{
        width: 140rpx;
        height: 140rpx;
        border-radius: 8rpx;
        margin-right: 20rpx;
    }
    .card_text{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .card_title{
            font-size: 30rpx;
            color: #333333;
            font-weight: 500;
        }
        .card_price_box{
            display: flex;
            align-items: center;
            justify-content: space-between;
            .card_price{
                font-weight: 500;
                font-size: 28rpx;
                color: #666666;
            }
            .card_number{
                font-size: 28rpx;
                color: #999999;
                font-weight: 400;
            }
        }
    }
}
</style>
  