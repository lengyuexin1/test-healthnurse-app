<template>
    <view class="container">
        <view class="balance_info_title">
            服务信息
        </view>
        <view class="balance_info_box">
            <view class="balance_info_left">
                <image
                    class="balance_info_left_img"
                    :src="props.balanceInfoObj.servicethumb"
                    mode="aspectFill"
                />
            </view>
            <view class="balance_info_right">
                <view class="balance_info_right_box">
                    <view class="balance_info_right_title">{{ props.balanceInfoObj.title }}</view>
                    <view class="balance_info_right_bace">{{ props.balanceInfoObj.optiontitle }}</view>
                    <view class="balance_info_right_price_box">
                        <view class="balance_info_right_price">
                            ￥{{ props.balanceInfoObj.optionprice / 100 }}
                        </view>
                        <view>
                            <TnNumberBox v-model="data.vModelValue" bg-color="#f5f5f5" :max="data.maxStock"
                            :min="1" buttonSize="56rpx" inputWidth="66rpx" @change="changevalue">
                            </TnNumberBox>
                        </view>

                    </view>
                </view>
                <view class="balance_info_right_shop">
                    <text>服务由</text>
                    <text class="shop_name">{{ props.balanceInfoObj.shopname }}</text>
                    <text>提供</text>
                </view>
            </view>
        </view>
    </view>
</template>
    
<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import TnNumberBox from '@tuniao/tnui-vue3-uniapp/components/number-box/src/number-box.vue'


interface Props {
    balanceInfoObj:any
}
const props = defineProps<Props>()

interface Data {
    vModelValue:number,
    maxStock:number,
}
const data = reactive<Data>({
    vModelValue:1,
    maxStock:31,
})

interface Events {
    (e: 'getquantity', quantity: number): void
}
const emit = defineEmits<Events>()


onMounted(() => {

})

const changevalue = (value:number) => {
    emit('getquantity',value)
}


</script>
  
<style scoped>
:deep(.tn-number-box){
    border-radius: 28rpx;
    overflow: hidden;
}
:global(.tn-number-box){
    border-radius: 28rpx;
    overflow: hidden;
}
</style>

<style lang="scss" scoped>
.container{
    width: 100%;
    padding: 30rpx;
    box-sizing: border-box;
    background: #fff;
    border-radius: 24rpx;
    .balance_info_title{
        font-weight: 600;
        font-size: 32rpx;
        color: #333333;
        margin-bottom: 24rpx;

    }
    .balance_info_box{
        display: flex;
        .balance_info_left{
            width: 180rpx;
            height: 180rpx;
            border-radius: 12rpx;
            margin-right: 18rpx;
            .balance_info_left_img{
                width: 100%;
                height: 100%;
            }
        }
        .balance_info_right{
            flex: 1;
            .balance_info_right_box{
                width: 100%;
            }
            .balance_info_right_title{
                font-weight: 600;
                font-size: 32rpx;
                color: #333333;
                margin-bottom: 4rpx;
            }
            .balance_info_right_bace{
                font-weight: 400;
                font-size: 28rpx;
                color: #666666;
                margin-bottom: 20rpx;
            }
            .balance_info_right_price_box{
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 8rpx;
                .balance_info_right_price{
                    font-weight: 500;
                    font-size: 32rpx;
                    color: #FC3848;
                    margin-bottom: 10rpx;

                }
            }
            
            .balance_info_right_shop{
                display: flex;
                align-items: center;
                font-size: 26rpx;
                color: #999999;
                .shop_name{
                    padding: 6rpx 12rpx;
                    box-sizing: border-box;
                    background-color: #FFF6E6;
                    color: #F88400;
                    border-radius: 8rpx;
                    margin: 0rpx 12rpx;
                }
            }

        }
    }
}
</style>
  