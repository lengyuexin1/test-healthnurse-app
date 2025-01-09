<template>
    <view class="WaterFall_item" :class="{ 'is_left' : props.direction == 1 , 'is_right' : props.direction == 2 }" @click="todetail(item)">
        <view class="WaterFall_img_box">
            <image
                :class="{'is_small' : isSmall}"
                class="WaterFall_img"
                :src="item.thumb"
                mode="aspectFill"
            />
            <view class="live_box" v-if="item.type == 99">
                <view class="live_left_box">
                    <image
                        class="live_img"
                        :src="getAssetsUrl('/leyou/icon/live.png')"
                        mode="scaleToFill"
                    />
                    <view>直播中</view>
                </view>
                <view class="live_number_box">
                   {{ item.cntUser }} 人观看
                </view>
            </view>
        </view>
        <view class="WaterFall_text_box">
            <view class="WaterFall_text_title">{{ item.name }}</view>
            
            <view class="WaterFall_text_bottom">
                <view class="WaterFall_text_author">
                    <image
                        class="WaterFall_text_author_img"
                        :src="item.accountAvatar"
                        mode="aspectFill"
                    />
                    <view class="WaterFall_author_name_box">
                        <view class="WaterFall_author_name">{{ item.accountName }}</view>
                    </view>
                </view>
                <view class="collection_box" v-if="item.type != 99">
                    <image
                        class="operation_img"
                        :src="getAssetsUrl(((item.isLike == 1) ? '/channel/like_highlight.svg' : '/channel/like.svg'))" mode="scaleToFill"
                    />
                    <view class="collection_number" :class="{ 'is_like' : item.isLike == 1 }">
                        <!-- {{ item.cntLike }} -->
                        {{ Math.floor(Math.random() * 900) + 100 }}
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'

import { getAssetsPic } from '@/common/setPicture'


interface Props {
    item: any,
    direction: number,
    isSmall: boolean,
}

const props = defineProps<Props>()

interface Data {
    rateValue:number
}
const data = reactive<Data>({
    rateValue:3
})

interface Events {
    (e: 'clickwaterItem', item: any): void
}
const emit = defineEmits<Events>()


onMounted(() => {

})




const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
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
    width: 100%;
    padding: 10rpx;
    padding-bottom: 0rpx;
    box-sizing: border-box;
    .WaterFall_img_box{
        position: relative;
        width: 100%;

        .WaterFall_img{
            width: 100%;
            height: 480rpx;
            display: block;
            box-sizing: border-box;
            border-radius: 16rpx 16rpx 0rpx 0rpx;

            &.is_small{
                height: 420rpx;
            }
        }
        .live_box{
            position: absolute;
            top: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.4);
            border-radius: 0rpx 16rpx 0rpx 16rpx;
            overflow: hidden;
            display: flex;
            align-items: center;
            font-size: 20rpx;
            color: #FFFFFF;
            .live_left_box{
                display: flex;
                align-items: center;
                padding: 4rpx 14rpx;
                box-sizing: border-box;
                background: #EA3E1A;
                border-radius: 0rpx 8rpx 0rpx 0rpx;
                .live_img{
                    width: 16rpx;
                    height: 16rpx;
                    margin-right: 4rpx;
                }
            }
            .live_number_box{
                padding: 4rpx 14rpx;
                box-sizing: border-box;
            }
            
        }
    }
    
    .WaterFall_text_box{
        padding: 16rpx 20rpx;
        box-sizing: border-box;
        width: 100%;
        background: #fff;
        border-radius:0rpx 0rpx 16rpx 16rpx;


        .WaterFall_text_title{
            font-size: 32rpx;
            color: #1A1A1A;
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
        .WaterFall_text_bace{
            color: #666666;
            font-size: 28rpx;
            margin-bottom: 12rpx;
            width: 100%;
            white-space: nowrap; 
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .rate_box{
            margin-bottom: 16rpx;
        }
        .WaterFall_price{
            display: flex;
            align-items: center;
            margin-bottom: 8rpx;
            .price_icon{
                font-size: 20rpx;
                color: #FF1010;
            }
            .price_number{
                font-size: 28rpx;
                color: #FF1010;
                font-weight: 600;
            }

        }
        .WaterFall_text_bottom{
            display: flex;
            align-items: center;
            justify-content: space-between;
            .WaterFall_text_author{
                display: flex;
                align-items: center;
                .WaterFall_text_author_img{
                    width: 30rpx;
                    height: 30rpx;
                    border-radius: 50%;
                    margin-right: 12rpx;
                    box-sizing: border-box;

                }
                .WaterFall_author_name_box{
                    .WaterFall_author_name{
                        font-size: 24rpx;
                        color: #666666;
                        margin-bottom: 4rpx;
                        width: 176rpx;
                        white-space: nowrap; 
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .WaterFall_author_time{
                        font-size: 20rpx;
                        color: #999999;
                    }
                }
            }
            .collection_box{
                display: flex;
                align-items: center;
                .operation_img{
                    width: 30rpx;
                    height: 30rpx;
                    margin-right: 10rpx;
                }
                .collection_number{
                    font-size: 24rpx;
                    color: #666666;
                    &.is_like{
                        color: #EA3E1A;
                    }
                }
            }
            .WaterFall_text_like{
                display: flex;
                align-items: center;
                .WaterFall_text_like_number{
                    font-size: 22rpx;
                    color: #AFAFAF;
                }
            }
        }
    }

}
</style>
  