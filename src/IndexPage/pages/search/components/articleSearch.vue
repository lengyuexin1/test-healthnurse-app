<!-- eslint-disable vue/no-deprecated-filter -->
<template>
    <view class="entry row" @click="navArticleDetail">
        <view class="entrig column j-between">
            <view class="entupper">
                <view class="entname u-line-1">
                    {{ props.info.name }}
                    <!-- <u-parse :content="props.info.name"></u-parse> -->
                </view>
                <view class="enttim">{{ timefrom(props.info.utcCreated) }}</view>
            </view>
        </view>
        <view class="entlef">
            <image style="width: 220rpx;height: 180rpx;border-radius: 8rpx;" :src="props.info.thumb || ''"
                mode="aspectFill"></image>
            <view class="entplay row i-center j-center" v-if="props.info.type === 2">
                <TnIcon name="play-right-fill" color="#ffffff" size="15"></TnIcon>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { gotoarticledetails } from '@/routes/create-routes' // 文章详情
import { reactive, computed } from 'vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import dayjs from "dayjs"
interface Data {
    pStyle: {
        p: string
    }
}

const props = defineProps({
    info: {
        type: Object,
        default: () => ({})
    }
})

const data = reactive<Data>({
    pStyle: {
        p: `overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp:2;-webkit-box-orient: vertical;`
    }
})

const timefrom = computed(() => {

    return (timestamp: any) => {
        // 换一种方式转换时间戳
        // const date = new Date(parseInt(timestamp))
        // const year = date.getFullYear()
        // const month = date.getMonth() + 1
        // const day = date.getDate()
        // const hour = date.getHours()
        // const minute = date.getMinutes()
        // return `${year}-${month}-${day} ${hour}:${minute}`
        return dayjs.unix(timestamp).format('YYYY-MM-DD HH:mm:ss')
    }
})

const navArticleDetail = () => {
    gotoarticledetails({ id: props.info.id })
}
</script>

<style lang="scss" scoped>
.entry {
    padding: 32rpx;
    background-color: #FFFFFF;
    border-bottom: 2rpx solid #F2F2F2;
    margin-bottom: 24rpx;
    border-radius: 24rpx;

    .entlef {
        margin-left: 32rpx;
        position: relative;

        .entplay {
            width: 64rpx;
            height: 64rpx;
            border-radius: 50%;
            background-color: rgba(0, 0, 0, 0.3);
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 20;
        }
    }

    .entrig {
        flex: 1;

        .entupper {
            .entname {
                font-size: 30rpx;
                font-weight: bold;
                line-height: 42rpx;
                color: #333333;
                width: 380rpx;
            }

            .enttim {
                font-size: 24rpx;
                font-weight: 400;
                color: #999999;
                margin-top: 16rpx;
            }
        }
    }
}
</style>
