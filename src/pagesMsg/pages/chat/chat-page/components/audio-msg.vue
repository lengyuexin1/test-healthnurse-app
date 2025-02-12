<template>
    <view class="audio tn-flex-center-center" @tap="clickAudio">
        <template v-if="direction === 'left'">
            <text class="durLeft">{{ duration }}</text>
            <image :src="getAssetsUrl('/leyou/nim/message_icon_voice_reverse_play.png')" v-if="data.isPlay" />
            <image :src="getAssetsUrl('/leyou/nim/message_icon_voice_reverse.png')" v-else />
        </template>
        <template v-else-if="direction === 'right'">
            <text class="durRight">{{ duration }}</text>
            <image :src="getAssetsUrl('/leyou/nim/message_icon_voice_play.png')" v-if="data.isPlay" />
            <image :src="getAssetsUrl('/leyou/nim/message_icon_voice.png')" v-else />
        </template>
        <TnNotice ref="notifyRef"/>
    </view>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted, onUnmounted, nextTick, ref } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import TnNotice from '@tuniao/tnui-vue3-uniapp/components/notify/src/notify.vue'
import type { TnNotifyInstance } from '@tuniao/tnui-vue3-uniapp'

const AUDIO = uni.createInnerAudioContext()

interface Props {
    /** 数据 */
    item: any
}

interface Data {
    isPlay: boolean
}

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const data = reactive<Data>({
    isPlay: false
})

const props = defineProps<Props>()
const notifyRef = ref<TnNotifyInstance>()

// 语音时长
const duration = computed(() => {
    return Math.round(Number(props.item.attach.dur) / 1000) + "''"
})

// 方向z
const direction = computed(() => {
    return props.item.flow === 'out' ? 'right' : 'left'
})

// 播放语音
const clickAudio = () => {
    const url = props.item.attach.url

    // 播放语音
    data.isPlay = true
    AUDIO.src = url

    nextTick(() => {
        AUDIO.play()
    })
    AUDIO.onError((res: any) => {
        console.log(res)
        notifyRef.value?.show({ msg: '语音播放出错了', type: 'error', position: 'center', textColor: 'white' })
    })
    AUDIO.onEnded(() => {	//播放完成
        data.isPlay = false
    })
}

onUnmounted(() => {
    AUDIO.stop()
})

onMounted(() => {
    AUDIO.autoplay = true
    
    //语音自然播放结束
    AUDIO.onEnded(() => {
        data.isPlay = false
    })
})

</script>

<style lang="scss" scoped>
.audio {
    .durLeft {
        font-size: 28rpx;
        padding: 0 20rpx;
    }
    .durRight {
        font-size: 28rpx;
        padding: 0 20rpx;
    }
    image {
        width: 30rpx;
        height: 30rpx;
    }
}
</style>
