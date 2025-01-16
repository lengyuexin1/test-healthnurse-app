<template>
    <view class="btn tn-flex-center-center">
        <TnButton width="100%" height="74rpx" font-size="28rpx" bg-color="#29c86f" text-color="#FFFFFF" :debounce="true"
                  @tap="clickBtn">
            {{ props.btnName }}
        </TnButton>
    </view>
</template>

<script lang="ts" setup>
import { defineEmits } from "vue"
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'

const props = defineProps({
    btnName: {
        type: String,
        default: "提交"
    }
})

const emit = defineEmits(["clickBtn"])

const clickBtn = () => {
    emit("clickBtn")
}

</script>
<style lang="scss" scoped>
.btn {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 100;
    display: flex;
    width: 100%;
    height: 146rpx;
    padding: 30rpx;
    background: white;
}
</style>
