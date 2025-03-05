<template>
	<view class="container">
        <z-paging
            ref="paging"
            :auto="false"
            :refresher-enabled="false"
        >
            <template #top>
                <PageTopbg ></PageTopbg>
                <bc-page-navbar :title="'社区公约'" ></bc-page-navbar>
            </template>
            <view class="content_box">
                <view class="content_title">社区公约</view>
                <view class="content_desc">COMMUNITY GUIDELINES</view>
                <view class="take_effect_time">2024年09月25日生效</view>
                <view class="content_text" v-if="!data.ruleObj?.desc">
                    数以亿计的用户在保椿生活平台上分享自己的生活经验。这些分享真诚而友好，中立且客观，保椿生活一直珍视并引以为傲。而社区氛围的维护离不开社区和所有用户的共同努力，需要大家一起进一步营造和维护。为此，在法律法规和公序良俗的要求之外，保椿生活与用户约定一个共同遵守的社区行为规范，由大家共同遵守，依照公约行事，做到真诚分享、友好互动。也与商家和品牌约定，做到真诚经营，用心创造。
                </view>
                <view class="content_text" v-else>
                    {{ data.ruleObj.desc }}
                </view>
                <view class="rule_btn" @click="toruleCore">
                    <view>规则中心</view>
                    <TnIcon name="right" size="30" color="#EA3E1A"></TnIcon>
                </view>
            </view>

		</z-paging>

        <BCNotify ref="bcNotify"></BCNotify>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { onLoad, onShow } from "@dcloudio/uni-app"

import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import BCNotify from '@/components/notify/index.vue'
import { getAssetsPic } from '@/common/setPicture'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { gotoruleCore } from "@/routes/user-routes"
import { ruleCategory, ruleList } from '@/api/user-api'


interface Data {
    ruleObj: any
}

const data = reactive<Data>({
    ruleObj: []
})

const bcNotify = ref()

const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})

onLoad((options:any) => {
    ruleList({
        pageNumber: 1,
        pageSize: 10,
        query: {
            categoryId: 59
        }
    }).then((res:any) => {
        data.ruleObj = res.data[0]
        console.log('data.ruleObj', data.ruleObj)
    })

})

onShow(() => {
})

const toruleCore = () => {
    gotoruleCore()
}



</script>

<style lang="scss" scoped>
.content_box{
    background: linear-gradient( 180deg, #FFFFFF 0%, #FDE7E3 100%);
    border-radius: 24rpx;
    padding: 50rpx 40rpx;
    .content_title{
        font-size: 64rpx;
        font-weight: 500;
        color: #333333;
    }
    .content_desc{
        font-size: 40rpx;
        font-weight: 400;
        color: #6A6A6A;
        margin-bottom: 16rpx;
    }
    .take_effect_time{
        padding: 8rpx 20rpx;
        box-sizing: border-box;
        background: #EA3E1A;
        font-size: 24rpx;
        color: #FFFFFF;
        font-weight: 400;
        margin-bottom: 40rpx;
        width:fit-content;
    }
    .content_text{
        padding: 40rpx;
        box-sizing: border-box;
        background: #FFFFFF;
        border-radius: 20rpx;
        font-weight: 400;
        font-size: 28rpx;
        color: #333333;
        line-height: 48rpx;
        margin-bottom: 22rpx;
    }
    .rule_btn{
        display: flex;
        align-items: center;
        justify-content: center;
        color: #EA3E1A;
        font-size: 30rpx;
        font-weight: 400;
        width: 670rpx;
        margin: auto;
        height: 100rpx;
        border-radius: 20rpx;
        background: #FFFFFF;
    }
}
</style>
<style>
page{
    background: #FDE7E3;
    /* background: linear-gradient( 180deg, #FFFFFF 0%, #FDE7E3 100%); */
}
</style>
