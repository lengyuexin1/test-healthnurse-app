<template>
    <view class="WaterFall_item" @click="todetail(item)">
        <view class="WaterFall_img_box">
            <image
                class="WaterFall_img"
                :class="{ 'right' : isSmall }"
                :src="item.mainPics && item.mainPics[0]"
                mode="aspectFill"
            />
            <view class="not_have_stock" v-if="item.stock == 0">
                抢光了
            </view>
        </view>
        <view class="WaterFall_text_box">
            <view class="WaterFall_text_title">{{ item.name }}</view>
            
            <view class="WaterFall_price">
                <view class="integral_number">
                    {{ (item.integral) }} 
                    <text class="integral_text">积分</text>
                </view>
                <view class="price_number" >
                    <view>
                        {{ (item.price / 100) }} 元
                    </view>
                    <view>
                        剩余 {{ item.stock }} 件
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
    
<script setup lang="ts">
import TnRate from '@tuniao/tnui-vue3-uniapp/components/rate/src/rate.vue'
import { ref, computed, reactive, onMounted } from 'vue'
import { getAssetsPic } from '@/common/setPicture'


interface Props {
    item: any,
    isSmall:boolean,
    
}

const props = defineProps<Props>()

interface Data {
    rateValue:number,

}
const data = reactive<Data>({
    rateValue:3,
})

interface Events {
    (e: 'clickwaterItem', item: any): void
}
const emit = defineEmits<Events>()


const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

onMounted(() => {
})

const todetail = (item:any) =>{
    emit('clickwaterItem',item)
}




</script>
  
<style lang="scss" scoped>
.WaterFall_item{
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 16rpx;
    overflow: hidden;
    margin-bottom: 18rpx;
    width: 100%;
    padding: 10rpx;
    padding-bottom: 0rpx;
    box-sizing: border-box;

    .WaterFall_img_box{
        position: relative;
        width: 100%;
        border-radius: 16rpx 16rpx 0rpx 0rpx;
        .WaterFall_img{
            width: 100%;
            height: 480rpx;
            display: block;
            box-sizing: border-box;
            &.right{
                height: 346rpx;
            }
        }
        .not_have_stock{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            width: 156rpx;
            height: 156rpx;
            border-radius: 50%;
            background-color: rgba(0, 0, 0, 0.5);
            text-align: center;
            line-height: 156rpx;
            font-weight: 400;
            font-size: 32rpx;
            color: #FFFFFF;
        }
        
    }
    
    .WaterFall_text_box{
        padding: 16rpx 20rpx;
        box-sizing: border-box;
        width: 100%;
        background: #fff;
        border-radius: 0rpx 0rpx 16rpx 16rpx;

        .WaterFall_text_title{
            font-size: 28rpx;
            color: #333333;
            margin-bottom: 24rpx;

            font-weight: 600;
            width: 100%;
            line-height: 25px!important;
            display: -webkit-box;
            text-overflow: ellipsis;
            overflow: hidden;
            -webkit-box-orient:vertical;
            -webkit-line-clamp:2;

        }
        .WaterFall_price{
            display: flex;
            flex-direction: column;
            margin-bottom: 8rpx;
            .integral_number{
                font-size: 28rpx;
                color: #FF1010;
                font-weight: 500;
                margin-right: 8rpx;
                .integral_text{
                    font-size: 24rpx;
                }
            }
            .price_number{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 24rpx;
                color: #666666;
                font-weight: 400;
            }

        }
    }

}
</style>
  