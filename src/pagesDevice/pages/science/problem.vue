<template>
    <view class="container">
        <customNavbar pageTitle="常见问题"></customNavbar>
        <view class="mainbg">
            <view class="ducbox">
                <view class="docli row i-center j-between" v-for="item in data.problemList" :key="item.id"
                      @click="linkCaption(item.id)">
                    <view class="doctit u-line-2">{{ item.name }}</view>
                    <TnIcon name="right" size="20" color="#818181"></TnIcon>
                </view>
            </view>
        </view>
        <!--        <u-safe-bottom></u-safe-bottom>-->
    </view>
</template>

<script lang="ts" setup>
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { gotoProblemDetail } from '@/routes/care-routes'
import { productshowDetail } from '@/api/smart-api'
import { reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

interface Data {
    godsId: string,
    problemList: any[]
}

const data = reactive<Data>({
    godsId: "",
    problemList: []
})
onLoad((options) => {
    data.pageTitle = options.name
    data.godsId = options.id
    productshowDetail(data.godsId).then(res => {
        data.problemList = res.questionList
    })
})
const linkCaption = (qid) => {
    gotoProblemDetail({ pid: data.godsId, qid })
}
</script>

<style lang="scss" scoped>
.mainbg {
    background: linear-gradient(180deg, #DFF7EF 0%, transparent 50%);
    padding: 1rpx;
}

.ducbox {
    background: #FFFFFF;
    border-radius: 16rpx;
    margin: 20rpx;
    padding: 0 30rpx;

    .docli {
        padding: 40rpx 0;
        border-bottom: 2rpx solid #F2F2F2;

        &:last-child {
            border-bottom: none;
        }

        .doctit {
            font-weight: 400;
            font-size: 28rpx;
            color: #333333;
            margin-right: 36rpx;
        }
    }
}
</style>
