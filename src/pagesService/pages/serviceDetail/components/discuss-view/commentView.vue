<template>
    <div class="content">
        <view class="evaluate">
            <view class="evaluate-header">
                <view class="evaluate-header-title">用户点评</view>
                <!-- @tap="readMore" -->
                <view class="evaluate-header-more" @click="toserviceComment">
                    <text>查看全部评价</text>
                    <TnIcon name="right" color="#CCCCCC" size="34rpx"></TnIcon>
                </view>
            </view>
            <template v-if="score.total && score.total.cnt > 0">
                <view class="evaluateScore row">
                    <view class="evaluate-num">{{ score.total.value.toFixed(1) }} <text>分</text></view>
                    <view>
                        <view class="evaluatePeop">{{ score.total.cnt }}人评价</view>
                        <TnRate v-model="score.total.value" readonly active-color="#FCCF0A" size="32rpx"></TnRate>
                    </view>
                </view>
            </template>
            <view class="evaluate-tabs">
                <view class="tabli" v-for="(item, index) in score.list" :key="index">
                    <view>{{ item.name }} ({{ item.cnt }})</view>
                </view>
            </view>
            <view class="evaluate-each" v-if="commlist?.length > 0">
                <discuss-view bgColor="#F6F6F6" :pingjia="commlist"></discuss-view>
            </view>
        </view>
    </div>
</template>

<script lang="ts" setup>
import discussView from "./discuss-view.vue"
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { commentScore, godsCommList } from "@/api/service-api"
import { getAssetsPic } from "@/common/setPicture"
import TnRate from '@tuniao/tnui-vue3-uniapp/components/rate/src/rate.vue'
// import { gotoCommentList } from "@/route/care-routes"
import { computed, ref } from "vue"
import { gotoserviceComment } from '@/routes/goods-routes'

const commlist = ref([])
const score:any = ref({})


const props = withDefaults(defineProps<{
    itemId: string,
    applyId?: number,
    shopId: string,
}>(), {
    bgstyle: '',
    applyId: 2,
    shopId: '',
})


const gitCommentScore = () => {
    /* 商城 shopId 服务itemId */
    commentScore({
        itemId:props.itemId
    }).then((res) => {
            if (!res.length) { return }
            const arr: any = []
            score.value = {
                total: res[0],
                list: arr
            }
        })
        .catch((err) => {
            // this.$refs.uToast.error(err.message)
        })
}
gitCommentScore()
// 评论列表
const gitCommentList = () => {
    const data:any = {
        pageNumber: 1,
        pageSize: 2,
        query: {
            itemId: props.itemId,
            shopId: props.shopId
        }
    }
    godsCommList(data).then((res: any) => {
        commlist.value = res.data
    })
        .catch((err) => {
            // this.$refs.uToast.error(err.message)
        })
}
gitCommentList()


const toserviceComment = () => {
    gotoserviceComment({
        id:props.itemId,
        shopId:props.shopId,
    })
}

</script>

<style lang="scss" scoped>
/* 评价 ↓ */
.evaluate {
    margin-top: 16rpx;
    background-color: #ffffff;
    padding: 0rpx 25rpx;
    border-radius: 24rpx;

    .evaluate-header {
        padding: 30rpx 0;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .evaluate-header-title {
        font-size: 34rpx;
        font-weight: bold;
        color: #333333;
        margin-right: 16rpx;
    }

    .evaluate-num {
        font-size: 68rpx;
        font-weight: 500;
        line-height: 58rpx;
        color: #29C86F;
        margin-right: 24rpx;

        text {
            font-size: 28rpx;
            font-weight: 400;
        }
    }

    .evaluatePeop {
        font-size: 28rpx;
        font-weight: 400;
        color: #808080;
        margin-bottom: 6rpx;
    }

    .evaluate-header-more {
        flex: 1;
        text-align: right;
        font-size: 28rpx;
        font-weight: 400;
        color: #999999;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        text {
            margin-right: 8rpx;
        }
    }

    .evaluate-tabs {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
    }

    .tabli {
        font-size: 24rpx;
        font-weight: 400;
        color: #3B3B3B;
        background: #F3F3F3;
        border-radius: 28rpx;
        padding: 10rpx 26rpx;
        text-align: center;
        margin-bottom: 15rpx;
        margin-right: 15rpx;
    }

    .tabli:last-child {
        margin-right: 0rpx;
    }
}

/* 评价 ↑ */
</style>
