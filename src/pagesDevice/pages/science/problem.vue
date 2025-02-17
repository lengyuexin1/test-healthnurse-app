<template>
    <view class="container">
        <customNavbar pageTitle="常见问题"></customNavbar>
        <view class="mainbg">
            <view class="ducbox">
                <view class="docli row i-center j-between" v-for="item in problemList" :key="item.id" @click="linkCaption(item.id)">
                    <view class="doctit u-line-2">{{item.name}}</view>
                    <u-icon name="arrow-right" size="20" color="#818181"></u-icon>
                </view>
            </view>
        </view>
        <u-safe-bottom></u-safe-bottom>
    </view>
</template>

<script>
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
import { gotoProblemDetail } from '@/route/care-routes'
import { productshowDetail } from '@/api/smart-api'
export default {
    components: {
        customNavbar
    },
    data() {
        return {
            godsId: "",
            problemList: []
        }
    },
    onLoad(options) {
        this.pageTitle = options.name
        this.godsId = options.id
        productshowDetail(this.godsId).then(res => {
            this.problemList = res.questionList
        })
    },
    methods: {
        linkCaption(qid) {
            gotoProblemDetail({ pid: this.godsId, qid })
        }
    }
}
</script>

<style lang="scss" scoped>
.mainbg{
    background: linear-gradient( 180deg, #DFF7EF 0%, transparent 50%);
    padding: 1rpx;
}
.ducbox{
    background: #FFFFFF;
    border-radius: 16rpx;
    margin: 20rpx;
    padding: 0 30rpx;

    .docli{
        padding: 40rpx 0;
        border-bottom: 2rpx solid #F2F2F2;

        &:last-child{
            border-bottom: none;
        }

        .doctit{
            font-weight: 400;
            font-size: 28rpx;
            color: #333333;
            margin-right: 36rpx;
        }
    }
}
</style>
