<template>
    <view>
        <TnNotice ref="notifyRef" :z-index="props.zIndex" />
    </view>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import TnNotice from '@tuniao/tnui-vue3-uniapp/components/notify/src/notify.vue'
import type { TnNotifyInstance } from '@tuniao/tnui-vue3-uniapp/components/notify'

const props = defineProps({
    position: {
        /** top、center、bottom三种位置，默认为top */
        type: String,
        default: 'center'
    },
    textColor: {
        type: String,
        default: '#FFFFFF'
    },
    duration: {
        type: Number,
        default: 3000
    },
    zIndex: {
        type: Number,
        default: 20074
    }
})

const notifyRef = ref<TnNotifyInstance>()

const show = (msg: string) => {
    notifyRef.value?.show({
        msg,
        type: 'info',
        position: props.position as any,
        bgColor: 'rgba(0, 0, 0, 0.6)',
        textColor: props.textColor,
        duration: props.duration
    })
}

const success = (msg: string) => {
    notifyRef.value?.show({
        msg,
        type: 'success',
        position: props.position as any,
        textColor: props.textColor,
        duration: props.duration
    })
}

const warning = (msg: string) => {
    notifyRef.value?.show({
        msg,
        type: 'warning',
        position: props.position as any,
        textColor: props.textColor,
        duration: props.duration
    })
}

const error = (msg: string) => {
    notifyRef.value?.show({
        msg,
        type: 'error',
        position: props.position as any,
        textColor: props.textColor,
        duration: props.duration
    })
}

defineExpose({ show, success, warning, error })

</script>

<style lang="scss" scoped>
    
</style>
