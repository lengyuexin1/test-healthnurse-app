<template>
    <view class="wrap">
        <!--  -->
        <template v-if="data.pageObj.type != 1">
            <MpHtml :content="replaceWhite(data.content)" v-if="data.content" :tag-style="data.pStyle"></MpHtml>
            <view class="empty" v-else>
                <TnEmpty mode="data" color="#999999" />
            </view>
        </template>
        <template v-else>
            <!-- <web-view v-if="data.pageObj.link" :src="data.pageObj.link"></web-view> -->

            <view v-if="data.userType == 'MP-WEIXIN'">
                <video 
                :src="data.pageObj.link"
                :id="'videoView'"
                object-fit='cover'
                ></video>
            </view>
            <view v-else>
                <MpHtml :content="`<video style='width:100%;background:#000;z-index:1;'
                    poster='${data.pageObj.cover}' src='${data.pageObj.link}' controls duration='10' object-fit='cover'></video>`" ></MpHtml>
            </view>
        </template>
    </view>
    <BCNotify ref="bcNotify"></BCNotify>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { onLoad } from "@dcloudio/uni-app"
import TnEmpty from '@tuniao/tnui-vue3-uniapp/components/empty/src/empty.vue'
import BCNotify from '@/components/notify/index.vue'
import { schoolAddView, schoolDetail } from '@/api/create-api'
import MpHtml from '@/Create/uni_modules/mp-html/components/mp-html/mp-html.vue'

interface Data {
    content: string
    pStyle: any
    pageObj: any
    userType: string
}

const data = reactive<Data>({
    content: '',
    pStyle: {
        video: 'width:100%;',
        div: 'opacity: 1;margin: 42rpx 0rpx 42rpx 0rpx;line-height: 56rpx;font-size:32rpx!important;color: #333333;display: block;',
        p: 'opacity: 1;margin: 42rpx 0rpx 42rpx 0rpx;line-height: 56rpx;font-size:32rpx!important;color: #333333;display: block;',
        span: 'opacity: 1;margin: 42rpx 0rpx 42rpx 0rpx;line-height: 56rpx;font-size:32rpx!important;color: #333333;display: block;',
    },
    pageObj: {},
    userType: '',
})

const bcNotify = ref()

// 处理富文本默认图片，视频大小
const replaceWhite = (html: any) => {
    if (html !== '') {
        let newContent: any = html.replace(/<video[^>]*>/gi, function (match: any, capture: any) {
            match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '')
            match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '')
            match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '')
            return match
        })
        newContent = newContent.replace(/style="[^"]+"/gi, function (match: any, capture: any) {
            match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi,
                'max-width:100%;');
            return match
        })
        newContent = newContent.replace(/<br[^>]*\/>/gi, '')
        newContent = newContent.replace(/\<video/gi,
            '<video muted="false"').replace(/\<img/gi,
                '<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"').replace(/\muted="muted"/gi, '')

        return newContent
    }
}

onMounted(()=>{
    // #ifdef MP-WEIXIN
    data.userType = 'MP-WEIXIN'
    // #endif

    // #ifdef APP-PLUS
    data.userType = 'APP-PLUS'
    // #endif

})

onLoad((options) => {
    schoolDetail({ id: options?.id }).then((res: any) => {
        uni.setNavigationBarTitle({ title: res?.title })
        data.content = res?.content ?? '';
        data.pageObj = res

        
    }).catch((err: any) => {
        bcNotify.value.error(err.message)
    })

    schoolAddView({
        articleId: options?.id
    }).then(() => {

    }).catch((err: any) => {
        bcNotify.value.error(err.message)
    })
})

</script>

<style lang="scss" scoped>
.wrap {
    padding: 10rpx;
    video{
        width: 100%;
    }
}
.empty {
    margin-top: 50%;
}
</style>
