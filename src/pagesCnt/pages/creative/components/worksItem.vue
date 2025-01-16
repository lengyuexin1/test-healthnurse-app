<template>
    <view>
        <view
              class="works_item"
              :class="{ 'not_border': index == 0 }"
              @click="toArticledetails">
            <image
                  class="works_item_img"
                  :src="info.cover"
                  mode="aspectFill"
            />
            <view class="works_item_right">
                <view class="works_item_title">{{ info.title ? info.title : '[无标题]' }}</view>
                <view class="works_item_bottom">
                    <view class="works_item_bottom_left">
                        <view class="works_item_bottom_state">
                            <text v-if="info.status == 3">已发布</text>
                            <text v-if="info.status == 1">草稿</text>
                            <text v-if="info.status == 2">审核中</text>
                            <text v-if="info.status == 5">未通过</text>
                            <text v-if="info.status == 4">未发布</text>
                            <text v-if="info.status == 6">仅自己可看</text>
                            <!--                            <text v-if="info.audit.audit == 5">已发布</text>-->
                            <!--                            <text v-if="info.audit.audit == 1">草稿</text>-->
                            <!--                            <text v-if="info.audit.audit == 2">审核中</text>-->
                            <!--                            <text v-if="info.audit.audit == 3">未通过</text>-->
                        </view>
                        <view class="works_item_bottom_time">
                            {{ timeformat(info.status == 3 || info.status == 5 ? info.utcExamined : info.utcCreated) }}
                        </view>
                    </view>
                    <view class="more_operate_box">
                        <view @click.stop="showoperate">
                            <TnIcon name="more-horizontal" color="#B2B2B2" size="34"></TnIcon>
                        </view>
                    </view>
                </view>

            </view>

        </view>
        <view class="bottom_number_box">
            <view class="number_text">{{ info.cntLook ? info.cntLook : '--' }} 阅读</view>
            <view class="number_text">{{ info.cntComment ? info.cntComment : '--' }} 评论</view>
            <view class="number_text">{{ info.cntLike ? info.cntLike : '--' }} 点赞</view>
            <view class="number_text" @click="todataDateil">
                <view>详细数据</view>
                <TnIcon name="right" color="#B2B2B2" size="24"></TnIcon>
            </view>
        </view>

    </view>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { formattime } from '@/common/formatTime'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { assistantDetail, gotovideoPreview, gotoarticledetails } from '@/routes/create-routes'

interface Props {
    info: any,
    index: number,
    record: number | string,
}

const props = defineProps<Props>()

interface Events {
    (e: 'openoperation', item: any, index: number): void

    (e: 'showPagebcNotify', text: string): void
}

const emit = defineEmits<Events>()

const timeformat = computed(() => (time: number) => {
    return formattime(time, 'YYYY-MM-DD HH:mm')
})

onMounted(() => {

})

const toArticledetails = () => {
    console.log('props.info', props.info)
    if (props.info.status == 5) {
        if (props.info.type == 1 || props.info.type == 3) {
            gotoarticledetails({ id: props.info.id })
            return
        }
        if (props.info.type == 2) {
            // 创作中心进入到视频详情，是否需要特殊处理为仅单个视频不上下滚动
            gotovideoPreview({ videoId: props.info.id, videoPagetype: 0 })
        }
    }
    if (props.info.status == 2) {
        emit('showPagebcNotify', '作品审核中...')

    }
    if (props.info.status == 3) {
        emit('showPagebcNotify', '作品被驳回...')

    }
}

const showoperate = () => {
    emit('openoperation', props.info, props.index)
}

const todataDateil = () => {
    if (props.info.status == 5) {
        assistantDetail({
            articleId: props.info.id,
            articleType: props.info.type
        })
    }
    if (props.info.status == 2) {
        emit('showPagebcNotify', '作品审核中...')

    }
    if (props.info.status == 3) {
        emit('showPagebcNotify', '作品被驳回...')

    }

}


</script>

<style lang="scss" scoped>
.works_item {
    display: flex;
    padding: 30rpx 0rpx;
    box-sizing: border-box;
    position: relative;

    &.not_border {
        border-top: none;
    }

    .works_item_img {
        width: 180rpx;
        height: 130rpx;
        background: #E6E6E6;
        margin-right: 24rpx;
        border-radius: 12rpx;
    }

    .works_item_right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;

        .works_item_title {
            font-size: 28rpx;
            color: #1B1B1B;

        }

        .works_item_bottom {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .works_item_bottom_left {
                display: flex;
                align-items: center;
                color: #999999;
                font-size: 24rpx;

                .works_item_bottom_state {
                    margin-right: 20rpx;
                }
            }

            .works_item_bottom_right {
                display: flex;
                align-items: center;

                .works_item_del {
                    font-size: 24rpx;
                    color: #999999;
                }
            }
        }

    }

    .more_operate {
        background: #fff;
        display: flex;
        align-items: center;
        position: absolute;
        bottom: 18rpx;
        right: 64rpx;
        box-shadow: 0rpx 0rpx 28rpx rgba(0, 0, 0, 0.14);

        .operate_text {
            padding: 16rpx 30rpx;
            box-sizing: border-box;
            color: #666666;
            font-size: 28rpx;
        }
    }
}

.bottom_number_box {
    width: 100%;
    display: flex;
    align-items: center;
    padding-bottom: 24rpx;
    border-bottom: 2rpx solid #F2F2F2;
    box-sizing: border-box;

    .number_text {
        font-size: 24rpx;
        color: #666666;
        font-weight: 400;
        display: flex;
        align-items: center;
        margin-right: 30rpx;
    }
}
</style>

