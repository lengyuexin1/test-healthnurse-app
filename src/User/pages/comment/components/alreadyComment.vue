<template>
    <view class="wrap tn-flex-column">
        <view class="date">{{ formatDate(props.item.utcCreated) }}</view>
        <view class="desc">{{ props.item.comment }}</view>
        <view class="image">
            <TnPhotoAlbum :data="props.item.pictures" :column="4" />
        </view>

        <view class="goods_comment" v-if="props.item.reply">
            商家回复: {{ props.item.reply }}
        </view>

        <view class="item tn-flex-row" @tap="clickItem">
            <view class="left">
                <image class="thumb" :src="props.item.itemThumb" mode="aspectFill" />
            </view>
            <view class="right">
                <view class="name tn-text-ellipsis-1">{{ props.item.itemName }}</view>
                <!-- <view class="time" v-if="props.item.apply == 2">服务时间：{{ formatTime(props.item.startTime) }}至{{ formatTime(props.item.endTime) }}</view>
                <view class="time" v-if="props.item.apply == 3 && props.item.specification">{{ props.item.specification }}</view> -->
            </view>
        </view>
        <view class="btn tn-flex-center-between">
            <view class="tn-flex-row">
                <text>浏览 {{ props.item.cntView || 0 }}</text>
                <text class="like">点赞 {{ props.item.cntLike || 0 }}</text>
            </view>
            <view class="del" @tap="clickDel">删除</view>
        </view>
    </view>
    <BCPopup
        ref="bcPopup"
        title="温馨提示"
        content="是否确定删除该评价？"
        subBtn="确认"
        cancelBtn="取消"
        @clickLeftBtn="confirmDel"
        @clickRightBtn="close">
    </BCPopup>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue'
import BCPopup from '@/components/popup/index.vue'
import TnPhotoAlbum from '@tuniao/tnui-vue3-uniapp/components/photo-album/src/photo-album.vue'
import dayjs from 'dayjs'

const props = defineProps({
    item: {
        type: Object,
        default: {}
    }
})

const bcPopup = ref()

const formatDate = (date: any) => {
    const datetime = dayjs(date * 1000)
    return datetime.format('YYYY/MM/DD')
}

const formatTime = (date: any) => {
    const datetime = dayjs(date * 1000)
    return datetime.format('YYYY/MM/DD HH:mm:ss')
}

const close = () => {
    bcPopup.value.close()
}

const clickDel = () => {
    bcPopup.value.open()
}

const confirmDel = () => {
    emit('delComment', props.item.id)
    close()
}

const clickItem = () => {
    // props.item.applyId == 3 && goto
}

const emit = defineEmits(["delComment"])

</script>

<style lang="scss" scoped>
$thirty: 30rpx;
$twenty-four: 24rpx;

.wrap {
    margin: $twenty-four;
    padding: $thirty;
    border-radius: $twenty-four;
    background-color: #FFFFFF;

    .date {
        font-weight: bold;
        font-size: 28rpx;
        color: #333333;
    }

    .desc {
        font-weight: 400;
        font-size: $twenty-four;
        color: #666666;
        line-height: 36rpx;
        margin-top: 12rpx;
    }

    .image {
        margin-top: $thirty;
    }
    .goods_comment{
        background: #F5F5F5;
        border-radius: 8rpx 8rpx 8rpx 8rpx;
        margin-top: 20rpx;
        padding: 16rpx;
        font-weight: 400;
        font-size: 24rpx;
        color: #666;
    }

    .item {
        background: #F5F5F5;
        border-radius: 8rpx 8rpx 8rpx 8rpx;
        margin-top: 20rpx;
        padding: 16rpx;

        .left {
            .thumb {
                width: 80rpx;
                height: 80rpx;
                border-radius: 8rpx;
            }
        }

        .right {
            margin-left: 16rpx;
            justify-content: space-between;

            .name {
                font-size: $twenty-four;
                color: #333333;
            }
            .time {
                font-weight: 400;
                font-size: 20rpx;
                color: #666666;
                margin-top: 10rpx;
            }
        }
    }

    .btn {
        color: #888888;
        font-size: $twenty-four;
        margin-top: $thirty;

        .like {
            margin-left: $thirty;
        }

        .del {
            color: #0083F6;
        }
    }
}
</style>
