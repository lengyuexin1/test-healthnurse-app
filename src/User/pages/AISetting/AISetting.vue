<template>
    <view class="wrap tn-flex-column">
        <image class="AI" :src="getAssetsUrl('/leyou/assets/AI.png')" mode="scaleToFill" />
        <view class="txt">享老AI助手</view>
        <view class="sub">提供清晰，专业而简洁的享老知识</view>
        <view class="sub">帮助用户享受老年生活。~</view>
        <view class="btn tn-flex-column">
            <view>
                <TnButton shape="round" width="630rpx" height="100rpx" font-size="32rpx" bg-color="#FFFFFF" border-color="#F3F3F3" text-color="#818181" @tap="clickBtn(1)">
                    清除上下文
                </TnButton>
            </view>
            <view class="bottom">
                <TnButton shape="round" width="630rpx" height="100rpx" font-size="28rpx" bg-color="#EA3E1A" text-color="#FFFFFF" @tap="clickBtn(2)">
                    删除对话
                </TnButton>
            </view>
        </view>
    </view>
    <BCNotify ref="bcNotify"></BCNotify>
    <BCPopup
        ref="bcPopup"
        :title="data.title"
        :content="data.content"
        subBtn="确认"
        cancelBtn="取消"
        subBtnColor="#EA3E1A"
        @clickLeftBtn="confirm"
        @clickRightBtn="cancel">
    </BCPopup>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import BCNotify from '@/components/notify/index.vue'
import BCPopup from '@/components/popup/index.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import { getAssetsPic } from '@/common/setPicture'
import { GlobalEvents, dispatchWEvent } from "@/events/event-registry"

interface Data {
    title: string
    content: string
    type: number
}

const data = reactive<Data>({
    title: '',
    content: '',
    type: 0
})

const bcNotify = ref()

const bcPopup = ref()

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const confirm = () => {
    cancel()

    if (data.type == 1) {
        bcNotify.value.show('已清除上下文')
        dispatchWEvent(GlobalEvents.Del_Chat_Context)
    }
    else {
        bcNotify.value.show('已删除全部对话')
        dispatchWEvent(GlobalEvents.Del_Chat_Session)
    }
}

const cancel = () => {
    bcPopup.value.close()
}

const clickBtn = (type: number) => {
    data.type = type
    if (type == 1) {
        data.title = '清除上下文'
        data.content = '清除后，将重新开始对话，不关联此前的对话上下文，该操作不影响查看对话记录，是否确认清除？'
    }
    else {
        data.title = '删除对话'
        data.content = '是否删除全部对话？'
    }
    bcPopup.value.open()
}

</script>

<style lang="scss" scoped>
.wrap {
    margin: 20rpx;
    padding: 50rpx;
    align-items: center;
    // background-color: #FFFFFF;
}

image {
    width: 240rpx;
    height: 240rpx;
}

.txt {
    margin: 30rpx 0 50rpx 0;
    font-size: 44rpx;
    font-weight: bold;
    color: #333333;
}

.sub {
    margin: 0;
    font-size: 28rpx;
    color: #666666;
}

.btn {
    margin-top: 120rpx;

    .bottom {
        margin-top: 40rpx;
    }
}
</style>
