<template>
    <view class="content_item" v-if="data.infoObj.id">
        <view class="item_title">{{ data.infoObj.title }}</view>
        <view class="item_content">
            <text class="content_text">
                <text>{{ data.isshow ? data.contentText : data.hideText }}</text>
                <text class="show_btn" @click.stop="changeShow" v-if="data.needshowBtn">{{ data.isshow ? '收起' : '全文' }}</text>
            </text>
        </view>
        <view class="item_img_box">
            <image
                v-for="(item,index) in data.infoObj.images" :key="index"
                class="item_img"
                :src="item"
                mode="aspectFill"
                @click.stop="preImage(index,data.infoObj.images)"

            />
        </view>
        <view class="item_bottom">
            <view class="bottom_item" @click.stop="tocollect">
                <image
                    class="item_icon"
                    :src="getAssetsUrl( data.infoObj.isFavorite ? '/leyou/newpagemenu/collectHeight_icon.svg' : '/leyou/newpagemenu/collect_icon.svg')"
                    mode="scaleToFill"
                />
                <view class="item_number">{{ data.infoObj.cntCollect }}</view>
            </view>
            <view class="bottom_item">
                <image
                    class="item_icon"
                    :src="getAssetsUrl('/leyou/newpagemenu/comment_icon.svg')"
                    mode="scaleToFill"
                />
                <view class="item_number">{{ data.infoObj.cntComment }}</view>
            </view>
            <view class="bottom_item" @click.stop="tolike">
                <image
                    class="item_icon"
                    :src="getAssetsUrl( data.infoObj.isLike ? '/leyou/newpagemenu/likeHeight_icon.svg' : '/leyou/newpagemenu/like_icon.svg')"
                    mode="scaleToFill"
                />
                <view class="item_number">{{ data.infoObj.cntLike }}</view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { onLoad } from '@dcloudio/uni-app'

import { getAssetsPic } from '@/common/setPicture'
import { newfavorite,
    unnewFavorite,
    getnewLike,
    unnewLike, } from "@/api/create-api"
import { PlatformManage } from "@bc/sys"
import { gotocourseVideo, gotoLiveShow, gotowxLive, gotoSalonDetail } from '@/routes/create-routes'


import BCNotify from '@/components/notify/index.vue'


interface Props {
    info: any,
}
const props = defineProps<Props>()


interface Data {
    infoObj: any
    contentText: string
    hideText: string
    isshow: boolean
    needshowBtn: boolean
}
const data = reactive<Data>({
    infoObj: {},
    contentText: '',
    hideText: '',
    isshow: false,
    needshowBtn: false
})


const bcNotify = ref()

onMounted(async () => {
    console.log('props.info' ,props.info);
    data.infoObj = props.info
    // data.contentText = '这款按摩仪特别好用，推荐推荐推荐。这款按摩仪特别好用，推荐推荐推荐。这款按摩仪特别，这款按摩仪特别好用，推荐推荐推荐。这款按摩仪特别好用，推荐推荐推荐。这款按摩仪特别'
    data.contentText = props.info.desc

    if (data.contentText.length > 40) {
        data.needshowBtn = true
        data.hideText = data.contentText.slice(0,40) + '...'
    }else{
        data.hideText = data.contentText
    }

    console.log('data.hideText',data.hideText);

})


const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

onLoad((option:any) => {

})

const changeShow = () => {
    if (data.isshow) {
        data.isshow = false
        data.hideText = data.contentText.slice(0,40) + '...'
    }else{
        data.isshow = true
        data.hideText = data.contentText
    }

}

// 图片预览
const preImage = (current:number, urls:any) => {
    uni.previewImage({
        current,
        urls
    })
}

// 收藏
const tocollect = () => {
    if (data.infoObj.isFavorite == 1) {
        unnewFavorite({
            articleId: [data.infoObj.id],
            happyType: 98,
        }).then(() => {
            data.infoObj.isFavorite = 0;
            data.infoObj.cntCollect--;
            // bcNotify.value.show('取消收藏')
        })
    }
    else {
        newfavorite({
            articleId: data.infoObj.id,
            happyType: 98,
        }).then(() => {
            data.infoObj.isFavorite = 1;
            data.infoObj.cntCollect++;
            // bcNotify.value.show('收藏成功')
        })
    }
}

// 点赞 
const tolike = () => {
    if (data.infoObj.isLike == 1) {
        unnewLike({
            articleIds: [data.infoObj.id],
            happyType: 98,
        }).then(() => {
            data.infoObj.isLike = 0;
            data.infoObj.cntLike--;
        })
    }
    else {
        getnewLike({
            articleId: data.infoObj.id,
            happyType: 98,
        }).then(() => {
            data.infoObj.isLike = 1;
            data.infoObj.cntLike++;
        })
    }
}

defineExpose({
})

</script>

<style lang="scss" scoped>
.content_item{
    .item_title{
        font-weight: 500;
        font-size: 30rpx;
        color: #333333;
        margin-bottom: 12rpx;
    }
    .item_content{
        font-weight: 400;
        font-size: 28rpx;
        color: #666666;
        margin-bottom: 16rpx;
        .content_text{
            .show_btn{
                font-weight: 500;
                font-size: 28rpx;
                color: #007EDF;
                margin-left: 6rpx;
            }
        }
        
    }
    .item_img_box{
        display: grid;
        grid-gap: 14rpx;
        grid-template-columns: auto auto auto;
        margin-bottom: 24rpx;
        .item_img{
            width: 204rpx;
            height: 140rpx;
            border-radius: 8rpx;
            overflow: hidden;
            // border: 2rpx solid red;
        }
    }
    .item_bottom{
        display: flex;
        align-items: center;
        justify-content: space-around;
        .bottom_item{
            display: flex;
            align-items: center;
            .item_icon{
                width: 34rpx;
                height: 34rpx;
                margin-right: 8rpx;
            }
            .item_number{
                font-size: 24rpx;
                color: #333333;
                font-weight: 400;
            }
        }
    }
}

</style>
