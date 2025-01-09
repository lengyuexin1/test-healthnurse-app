<template>
    <view class="WaterFall_item" @click="todetail(item)">
        <view class="WaterFall_fixed">
            <image
                class="WaterFall_img"
                :src="item.cover"
                mode="aspectFill"
            />
            <image
                class="play_icon"
                :src="getAssetsUrl('/channel/play.svg')"
                mode="scaleToFill"
                v-if="item.type == 2"
            />
        </view>
        <view class="WaterFall_text_box">
            <view class="WaterFall_text_title">{{ item.name }}</view>
            <view class="WaterFall_text_bottom">
                <view class="WaterFall_text_author">
                    <image
                        class="WaterFall_text_author_img"
                        :src="item.accountThumb"
                        mode="aspectFill"
                    />
                    <view class="WaterFall_author_name_box">
                        <view class="WaterFall_author_name">{{ item.accountName }}</view>
                        <view class="WaterFall_author_time">{{ fromagoTime(item.utcCreated) }}</view>
                    </view>
                </view>

                <view class="WaterFall_text_like">
                    <image
                        class="like_icon"
                        :src="item.isLike == 1 ? getAssetsUrl('/channel/like_highlight.svg') : getAssetsUrl('/channel/like.svg')"
                        mode="scaleToFill"
                    />
                    <view class="WaterFall_text_like_number">
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
import { agoTime } from '@/common/formatTime'
import { getAssetsPic } from '@/common/setPicture'


interface Props {
    item: any
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

const fromagoTime = computed(()=>(tiem:number)=> {
    return agoTime(tiem);
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
    overflow: hidden;
    margin-bottom: 18rpx;
    width: 100%;
    padding: 10rpx;
    padding-bottom: 0rpx;
    box-sizing: border-box;
    .WaterFall_fixed{
        width: 100%;
        position: relative;
        .WaterFall_img{
            width: 100%;
            height: 480rpx;
            display: block;
            box-sizing: border-box;
            border-radius: 16rpx 16rpx 0rpx 0rpx;
            &.right{
                height: 346rpx;
            }
        }
        .play_icon{
            position: absolute;
            width: 80rpx;
            height: 80rpx;
            border-radius: 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
    }

    
    .WaterFall_text_box{
        padding: 16rpx 20rpx;
        box-sizing: border-box;
        width: 100%;
        background: #fff;
        border-radius: 0rpx 0rpx 16rpx 16rpx;



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
		.WaterFall_text_remarks{
			font-weight: 400;
			font-size: 13px;
			color: #666666;
			margin-bottom: 16rpx;
			width: 100%;
			line-height: 18px!important;
			display: -webkit-box;
			text-overflow: ellipsis;
			overflow: hidden;
			-webkit-box-orient:vertical;
			-webkit-line-clamp:2;
		}
        .WaterFall_text_bottom{
            display: flex;
            align-items: center;
            justify-content: space-between;
            .WaterFall_text_author{
                display: flex;
                align-items: center;
                .WaterFall_text_author_img{
                    width: 40rpx;
                    height: 40rpx;
                    border-radius: 50%;
                    margin-right: 12rpx;
                    box-sizing: border-box;

                }
                .WaterFall_author_name_box{
					display: flex;
					flex-direction: column;
					
                    .WaterFall_author_name{
                        font-size: 24rpx;
                        color: #666666;
                        margin-bottom: 4rpx;
                        width: 160rpx;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .WaterFall_author_time{
                        font-size: 20rpx;
                        color: #999999;
						
                    }
					.join{
						width: 104rpx;
						height: 48rpx;
						text-align: center;
						line-height: 48rpx;
						color: #EA3E1A;
						font-weight: 500;
						font-size: 22rpx;
						border-radius: 24rpx;
						border: 1px solid #EA3E1A;
						margin-left: 26rpx;
					}
                }
	
            }
            .WaterFall_text_like{
                display: flex;
                align-items: center;
                .like_icon{
                    width: 28rpx;
                    height: 28rpx;
                    margin-right: 8rpx;
                }
                .WaterFall_text_like_number{
                    font-size: 24rpx;
                    color: #666666;
                }
            }
        }
    }

}

</style>
  