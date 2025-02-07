<template>
     <!-- v-if="!isinstitution" -->
     <view class="question">
                    <view class="question_box">
                        <view class="question_box_icon">
                            <image class="icon_img" :src="getAssetsUrl('/shop/shopicon.png')" mode="scaleToFill" />
                        </view>
                        <view class="question_box_title" @click="gotoIMSessionChat(2)">
                            <view class="question_title">联系商家</view>
                            <view class="question_bace">物流/售后咨询</view>
                        </view>
                    </view>
                    <view class="question_box">
                        <view class="question_box_icon">
                            <image class="icon_img" :src="getAssetsUrl('/shop/pticon.png')" mode="scaleToFill" />
                        </view>
                        <view class="question_box_title" @click="gotoIMSessionChat(1)">
                            <view class="question_title">平台客服</view>
                            <view class="question_bace">其他问题/纠纷</view>
                        </view>
                    </view>
                    <view class="border_box"></view>
                </view>

</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { gotoIMSessionChat } from "@/route/message-routes"
import { gotoUserLink } from '@/route/user-routes'
interface Props {
    serviceInfo:any,
    showInfo:boolean,
}

const props = defineProps<Props>()

onMounted(() => {

})


/* 跳转客服 */
const gotoChat = () => {
    gotoIMSessionChat({
        // shopId: ordinfo.entity && this.ordinfo.entity.shopId,
        // title: ordinfo.entity.shopName,
        type: 2
    })
}
/* 纠纷 */
const gotoProposal = (orderId) => {
    gotoUserLink({ orderId: orderId }, 'jianyi')
}

</script>

<style lang="scss" scoped>
.content{
    width: 100%;
    background: #FFFFFF;
    border-radius: 24rpx;
    padding: 30rpx;
    box-sizing: border-box;
    .contit{
        font-size: 32rpx;
        color: #333333;
        font-weight: 500;
        margin-bottom: 30rpx;
    }
    .mation{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .mattit{
            font-size: 30rpx;
            font-weight: bold;
            color: #333333;
            flex-shrink: 0;
        }
        .mattip{
            display: flex;
            align-items: center;
        }
    }
    .convitae{
        display: flex;
        align-items: center;
        padding: 20rpx 24rpx;
        background: #f6f6f6;
        border-radius: 8rpx;
        font-size: 28rpx;
        font-weight: 400;
        color: #666666;
        div {
            background: #ff7331;
            width: 8rpx;
            height: 8rpx;
            border-radius: 8rpx;
            margin-right: 12rpx;
        }
    }
}
</style>
