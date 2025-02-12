<template>
    <div class="content">
        <view class="evaluate" id="toView2">
            <view class="evaluate-header">
                <view class="evaluate-header-title">用户点评</view>

                <view class="evaluate-header-more" @tap="readMore">
                    <text>查看全部评价</text>
                    <u-icon name="arrow-right" color="#CCCCCC" size="34rpx"></u-icon>
                </view>
            </view>
            <template v-if="score.total && score.total.cnt > 0">
                <view class="evaluateScore row">
                    <view class="evaluate-num">{{ score.total.value.toFixed(1) }} <text>分</text></view>
                    <view>
                        <view class="evaluatePeop">{{score.total.cnt}}人评价</view>
                        <u-rate
                            gutter="0"
                            :value="Number(score.total.value)"
                            readonly
                            active-color="#FCCF0A"
                        ></u-rate>
                    </view>
                </view>
            </template>
            <view class="evaluate-tabs">
                <view
                    class="tabli"
                    v-for="(item, index) in score.list"
                    :key="index"
                >
                    <view>{{ item.name }} ({{ item.cnt }})</view>
                </view>
            </view>
            <view class="evaluate-each" v-if="commlist.length > 0">
                <discuss-view
                    bgColor="#F6F6F6"
                    :pingjia="commlist"
                ></discuss-view>
            </view>
        </view>
    </div>
</template>

<script>
import discussView from "./discuss-view.vue"
import { getAssetsPic } from "@/common/setPicture.js"
import { getCommentScore, godsCommLists } from "@/api/care-api"
import { gotoCommentList } from "@/routes/care-routes"
export default {
    name: "commentView", //服务详情评论
    components: {
        discussView
    },
    computed: {
        getAssetsUrl() {
            return (url) => {
                return getAssetsPic(url)
            }
        }
    },
    data() {
        return {
            commlist: [],
            score: {}
        }
    },
    props: {
        itemId: {
            type: String,
            required: true
        },
        applyId: {
            type: Number,
            default: 2
        },
        shopId: {
            type: String,
            default: ''
        }
    },
    mounted() {

    },
    watch: {
        shopId: {
            immediate: true,
            handler(newData) {
                if (newData != '') {
                    this.gitCommentScore()
                    this.gitCommentList()
                }
            }
        }
    },
    methods: {
        // 获取评论评分
        gitCommentScore() {
            /* 商城 shopId 服务itemId */
            getCommentScore({ itemId: this.applyId === 3 ? this.itemId : this.itemId })
                .then((res) => {
                    if (!res.length) { return }
                    const arr = []
                    /* let obj = {};
                    for (const item of res) {
                        if (item.name != "总评分") {
                            arr.push(item);
                        } else {
                            obj = item
                        }
                    } */
                    this.score = {
                        total: res[0],
                        list: arr
                    }
                })
                .catch((err) => {
                    this.$refs.uToast.error(err.message)
                })
        },
        // 评论列表
        gitCommentList() {
            godsCommLists({
                pageNumber: 1,
                pageSize: 2,
                query: {
                    itemId: this.itemId,
                    shopId: this.shopId
                }
            }).then((res) => {
                this.commlist = res.res
            })
                .catch((err) => {
                    this.$refs.uToast.error(err.message)
                })
        },
        // 评论列表
        readMore() {
            gotoCommentList({
                orderid: this.itemId,
                score: JSON.stringify(this.score),
                shopId: this.shopId
            })
        }
    }
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

        text{
            font-size: 28rpx;
            font-weight: 400;
        }
    }
    .evaluatePeop{
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

        text{
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
