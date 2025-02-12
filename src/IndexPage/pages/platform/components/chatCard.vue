<template>
    <view class="container" @tap="clickChatCard">
        <view class="item tn-flex-column">
            <view>
                <view class="top tn-flex-center-between">
                    <view class="tag tn-flex-row">
                        <BarPlaying></BarPlaying>
                        {{ item.categoryName || '--' }}
                    </view>
                </view>
                <view class="title">{{ item.tname }}</view>
            </view>
            <view>
                <view class="member tn-flex-center-between">
                    <view>
                        <image :src="ele.thumb" mode="scaleToFill" v-for="(ele, idx) in sliceMemberList" :key="idx" />
                    </view>
                    <view class="online">
                        <TnIcon name="my" size="32rpx" color="black" />
                        <text>{{ item.cntMember }}人</text>
                    </view>
                </view>
            </view>
            <image class="stat" :src="getAssetsUrl('/leyou/assets/stat.png')" mode="scaleToFill" />
        </view>
    </view>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import BarPlaying from '@/components/barPlaying/barPlaying.vue'
import { getAssetsPic } from '@/common/setPicture'
import { gotoChatPage } from '@/routes/nim-routes'
import { joinGroupChat } from '@/api/user-api'
import { GlobalEvents, dispatchWEvent } from "@/events/event-registry"

interface Props {
    item: any
}

const props = defineProps<Props>()

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const sliceMemberList = computed(() => {
    return props.item?.memberList?.slice(0, 5)
})

const clickChatCard = () => {
    joinGroupChat({ tid: props.item.tid }).then(() => {
        dispatchWEvent(GlobalEvents.Join_Group_Chat)
        gotoChatPage({
            to: props.item.tid,
            scene: 'friendsGroup'
        })
    })
}

onMounted(() => {
    
})

</script>
  
<style lang="scss" scoped>
.container {
    .item {
        position: relative;
        width: 100%;
        height: 360rpx;
        padding: 24rpx;
        border-radius: 16rpx;
        justify-content: space-between;
        box-shadow: 0rpx 0rpx 16rpx rgba(234,62,26,0.08);
        background: linear-gradient(180deg, #FFE5DF 0%, #FFFFFF 50%);

        .stat {
            position: absolute;
            right: 24rpx;
            bottom: 24rpx;
            z-index: 0;
            width: 128rpx;
            height: 120rpx;
        }
        
        .tag {
            align-items: center;
            font-weight: 400;
            font-size: 26rpx;
            color: #333333;
            padding: 5rpx 16rpx;
            border-radius: 24rpx;
            background-color: rgba(255, 255, 255, .6);

            image {
                width: 28rpx;
                height: 28rpx;
                margin-right: 10rpx;
            }
        }

        .title {
            margin-top: 15rpx;
            font-weight: bold;
            font-size: 32rpx;
            color: #333333;
        }

        .member {
            z-index: 10;
            position: relative;
            align-items: center;

            image {
                width: 46rpx;
                height: 46rpx;
                margin-right: -10rpx;
                border-radius: 50%;
                border: solid 1rpx #FFFFFF;
            }

            .online {
                font-weight: 500;
                font-size: 28rpx;
                color: #333333;

                text {
                    margin-left: 5rpx;
                }
            }
        }
    }
}
</style>
 
