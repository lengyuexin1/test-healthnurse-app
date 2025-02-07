<template>
    <view class="content" v-if="list.length > 0">
        <view class="searhed" v-if="current === 0">{{curName || ''}}</view>
        <template v-if="outlist[curIds].type === 1">
            <block v-for="(item) in list" :key="item.id">
                <serveSearch :info="item"></serveSearch>
            </block>
        </template>
        <template v-if="outlist[curIds].type === 2">
            <view class="watebox">
                <WaterfallsFlow :wfList="list" :isHtml="true"></WaterfallsFlow>
            </view>
        </template>
        <template v-if="outlist[curIds].type === 3">
            <block v-for="(item) in list" :key="item.id">
                <shopSearch :info="item"></shopSearch>
            </block>
        </template>
        <template v-if="outlist[curIds].type === 4">
            <block v-for="(item) in list" :key="item.id">
                <articleSearch :info="item"></articleSearch>
            </block>
        </template>
        <template v-if="outlist[curIds].type === 5">
            <videoSearch :list="list"></videoSearch>
        </template>
        <view class="searmore row i-center j-center" @click="switchOut" v-if="current === 0">
            查看更多
            <view class="morerig row i-center j-center"><u-icon name="arrow-right" color="#FFFFFF" size="24rpx"></u-icon></view>
        </view>
    </view>
</template>

<script>
import serveSearch from './serveSearch.vue'
import shopSearch from './shopSearch.vue'
import articleSearch from './articleSearch.vue'
import videoSearch from './videoSearch.vue'
import WaterfallsFlow from '@/components/GodsFlow/GodsFlow.vue'
export default {
    name: 'searchVessel',
    components: {
        serveSearch,
        WaterfallsFlow,
        shopSearch,
        articleSearch,
        videoSearch
    },
    data() {
        return {
            artucleList:[],
            videoList:[]
        }
    },
    computed: {
        curName() {
            if (this.outlist.length <= 0 || !this.curIds) { return '' }
            return this.outlist[this.curIds].name + '类'
        }
    },
    props: {
        list: Array,
        curIds: Number,
        current: Number,
        outlist: {
            type: Array,
            default: () => []

        }
    },
    methods: {
        switchOut() {
            this.$emit('switchVessel', { index: this.curIds })
        }
    }
}
</script>

<style lang="scss" scoped>
.content{
    padding: 16rpx 20rpx;

    .searhed{
        height: 92rpx;
        background: linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0) 100%);
        box-shadow: 0rpx 0rpx 8rpx rgba(0,0,0,0.04);
        border-radius: 12rpx;
        font-size: 32rpx;
        font-weight: 500;
        line-height: 92rpx;
        color: #333333;
        padding: 0 30rpx;
    }
    .searmore{
        height: 72rpx;
        background: #FFFFFF;
        border-radius: 12rpx;
        font-size: 28rpx;
        font-weight: 400;
        color: #333333;

        .morerig{
            width: 30rpx;
            height: 30rpx;
            background: #070606;
            border-radius: 30rpx;
            margin-left: 8rpx;
        }
    }

    .watebox{
        // padding: 0 10rpx;
    }
}
</style>
