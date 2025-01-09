<template>
    <view class="container">
        <!-- <customNavbar bg-color="#fdebdf"></customNavbar> -->
          <view class="conbg">
              <view class="back_icon" @click="goback">
                <TnIcon name="left" size="44" color="#333333" bold />
              </view>
          </view>
          <image :src="ruleDesc" mode="scaleToFill"  class="container_img"/>

    </view>
</template>

<script lang='ts' setup>
// import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
import { onShow,onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'; // 引入Vue 3的Composition API
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'

const ruleDesc =ref()
// 生命周期钩子
onLoad((option:any) => {
  ruleDesc.value = option.ruleDesc; // 通过props获取id
});


const goback = () => {
	uni.navigateBack()
}
</script>

<style lang="scss" scoped>
.conbg {
    background:#fdebdf;
    position: relative;
    width: 750rpx;
    height: 100rpx;
    .back_icon{
      position: absolute;
      bottom: -60rpx;
      left: 20rpx;
      z-index: 100;
    }
}
.container_img{
    width: 100%;
    height: 3493rpx;
}
</style>
