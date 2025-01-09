<template>
    <view class="container" v-if="info.accountId">
        <view class="friend_box">
            <image  
                class="friend_img"
                :src="info.accountThumb"
                mode="scaleToFill"
            />
            <view class="friend_text">
                <view class="friend_name">{{ info.accountName }}</view>
                <view class="friend_desc" v-if="isnumber == 1">联系人: {{ info.addressBookName  }}</view>
                <view class="friend_desc" v-else>{{ info.accountDesc ? info.accountDesc : '快写点什么，让我看看你的独一无二' }}</view>
            </view>
            <view class="follow_btn" :class="{ 'is_follow' : info.isFans == 1 }" @click="toFollow">
                {{ info.isFans == 1 ? '已关注' : '关注' }}
            </view>
            <view class="del_icon" @click="delFun">
                <TnIcon name="close" size="32rpx" color="#666666"></TnIcon>
            </view>
        </view>

        <view class="bottom_border"></view>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'

interface Props {
    info: any,
    index: number,
    isnumber: number,
}

const props = defineProps<Props>()

interface Events {
    (e: 'delfriend', index: number): void
    (e: 'followFriend', item: any): void
}
const emit = defineEmits<Events>()

onMounted(() => {

})

const delFun = () => {
    emit('delfriend',props.index)
}

const toFollow = () => {
    emit('followFriend',props.info)
}

</script>
  
<style lang="scss" scoped>
.container{
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 30rpx;
    padding-bottom: 0rpx;
    box-sizing: border-box;
    background: #fff;

    .friend_box{
        display: flex;
        align-items: center;
        width: 100%;
        background: #fff;
        margin-bottom: 30rpx;
        .friend_img{
            width: 84rpx;
            height: 84rpx;
            border-radius: 50%;
            margin-right: 20rpx;
        }
        .friend_text{
            display: flex;
            flex-direction: column;
            width: 370rpx;
            margin-right: 36rpx;
            .friend_name{
                font-weight: 500;
                font-size: 28rpx;
                color: #333333;
                margin-bottom: 8rpx;
            }
            .friend_desc{
                width: 100%;
                font-weight: 400;
                font-size: 24rpx;
                color: #999999;
            }
        }
        .follow_btn{
            width: 112rpx;
            height: 50rpx;
            text-align: center;
            line-height: 50rpx;
            font-size: 24rpx;
            font-weight: 400;
            background: #EA3E1A;
            color: #FFFFFF;
            border-radius: 8rpx;
            margin-right: 30rpx;
            &.is_follow{
                background: #F5F7F9;
                color: #666666;
            }
        }
    }
    
    
    .bottom_border{
        width: 100%;
        height: 2rpx;
        background: #F2F2F2;
    }
}
</style>
 
