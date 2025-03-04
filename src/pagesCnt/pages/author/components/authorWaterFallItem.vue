<template>
    <view class="container">
        <view class="WaterFall_item" @click="toDeatil">
            <image
                class="WaterFall_img"
                :src="item.thumb"
                mode="aspectFill"
            />
            <view class="WaterFall_text">
                <view class="WaterFall_title">
                    {{ item.name }}
                </view>
                <!-- item.courserDetail.isCharge == 1 -->
                <view class="price_box" v-if="false">
                    ￥
                    <text class="price_number">
                        {{ item.courserDetail.price / 100 }}
                    </text>
                </view>
                <view class="WaterFall_author">
                    <image
                        class="author_img"
                        :src="item.accountAvatar"
                        mode="scaleToFill"
                    />
                    <view class="author_name">
                        {{ item.accountName }}
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'

interface Props {
    item:any
}

const props = defineProps<Props>()

interface Events {
    (e: 'toArticledetails', item: any): void
}
const emit = defineEmits<Events>()

onMounted(() => {

})

const toDeatil = () => {
    emit('toArticledetails',props.item)
}



</script>

<style lang="scss" scoped>
.WaterFall_item{

    border-radius: 6rpx;
    overflow: hidden;
    margin: 10rpx 5rpx 5rpx 10rpx;
    .WaterFall_img{
        width: 100%;
        height: 480rpx;
        &.right_img{
            height: 420rpx;
        }
    }
    .WaterFall_text{
        background: #fff;
        padding: 20rpx;
        box-sizing: border-box;
        .WaterFall_title{
            font-weight: 500;
            font-size: 32rpx;
            color: #1A1A1A;
            margin-bottom: 20rpx;
            width: 100%;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2; /* 这里是超出几行省略 */
            overflow: hidden;
        }
        .price_box{
            font-size: 24rpx;
            color: #FF1010;
            margin-bottom: 8rpx;
            .price_number{
                font-size: 30rpx;
            }
        }
        .WaterFall_author{
            display: flex;
            align-items: center;
            .author_img{
                width: 30rpx;
                height: 30rpx;
                margin-right: 8rpx;
                display: block;
                border-radius: 50%;
            }
            .author_name{
                font-size: 24rpx;
                font-weight: 400;
                color: #666666;
            }

        }
    }
    }
</style>

