<template>
    <view>
        <TnPopup v-model="data.showPopup" close-btn>
            <view class="box tn-p-lg tn-flex-column">
                <image :src="getAssetsUrl(imageType)" mode="scaleToFill" v-if="type" />
                <view class="title">{{ title }}</view>
                <view class="content">{{ content }}</view>
                <view class="btnBox">
                    <TnButton class="btn" width="160rpx" height="80rpx" font-size="28rpx" :bg-color="subBtnColor" text-color="#FFFFFF" @tap="clickLeftBtn">
                        {{ subBtn }}
                    </TnButton>
                    <TnButton class="btn" width="160rpx" height="80rpx" font-size="28rpx" :bg-color="cancelBtnColor" plain border-color="#B1B8C2" text-color="#292C33" v-if="num == 2" @tap="clickRightBtn">
                        {{ cancelBtn }}
                    </TnButton>
                </view>
            </view>
        </TnPopup>
    </view>
</template>

<script lang="ts" setup>
import { defineEmits, reactive, computed } from "vue"
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import { getAssetsPic } from '@/common/setPicture'

const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        default: ''
    },
    type: {
        /** 图标类型： 审核auth, 提示warning, 通过pass, 拒绝refuse */
        type: String,
        default: ''
    },
    num: {
        /** 按钮数量, 最多支持两个 */
        type: Number,
        default: 2
    },
    subBtn: {
        type: String,
        default: '确定'
    },
    subBtnColor: {
        // 确定按钮颜色
        type: String,
        default: '#E6454A'
    },
    cancelBtn: {
        type: String,
        default: '取消'
    },
    cancelBtnColor: {
        // 取消按钮颜色
        type: String,
        default: '#FFFFFF'
    }
})

interface Data {
    showPopup: boolean,
    imageList: any
}

const data = reactive<Data>({
    showPopup: false,
    imageList: [
        { type: 'auth', image: '/leyou/static/icon/auth.svg' },
        { type: 'pass', image: '/leyou/static/icon/pass.svg' },
        { type: 'refuse', image: '/leyou/static/icon/refuse.svg' },
        { type: 'warning', image: '/leyou/static/icon/warning.svg' }
    ]
})

const getAssetsUrl = computed(() => (src : string) => {
	return getAssetsPic(src)
})

const imageType = computed(() => {
    const filter = data.imageList.filter((item: any) => props.type === item.type)
    return filter[0].image
})

const open = () => {
    data.showPopup = true
}

const close = () => {
    data.showPopup = false
}

const emit = defineEmits(["clickLeftBtn", "clickRightBtn"])

const clickLeftBtn = () => {
    emit("clickLeftBtn")
}

const clickRightBtn = () => {
    emit("clickRightBtn")
}

defineExpose({ open, close })

</script>
<style lang="scss" scoped>
    .box {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40rpx;
        width: 480rpx;
        min-height: 300rpx;
        background: #FFFFFF;
        border-radius: 16rpx;

        image {
            width: 144rpx;
            height: 144rpx;
            margin-bottom: 40rpx;
        }

        .title {
            font-weight: bold;
            font-size: 32rpx;
            color: #292C33;
        }
        .content {
            margin-top: 40rpx;
            font-weight: 400;
            font-size: 28rpx;
            color: #292C33;
        }
        .btnBox {
            width: 100%;
            margin-top: 60rpx;
            display: flex;
            justify-content: space-between; /* 默认平均分布 */
            align-items: center;

            .btn {
                flex: 1; /* 当有多个按钮时，使它们平均分布 */
                margin: 0 15rpx
            }
        }
        .singleBtn {
            justify-content: center; /* 当只有一个按钮时，使其居中 */

            .btn {
                flex: none; /* 当只有一个按钮时，使其铺满 */
                width: 100%;
            }
        }
    }
</style>
