<template>
    <view class="container">
        <channelFollowPage ></channelFollowPage>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { onLoad, onReady } from '@dcloudio/uni-app'
import channelFollowPage from './components/channelFollowPage.vue'
 
interface Props {
}
const props = defineProps<Props>()

interface Data {
    type:number|string,
    isuser:number|string,
    accountId:string,
}
const data = reactive<Data>({
    type:0,
    isuser:0,
    accountId:""
})


onLoad((option)=>{
    data.type = Number(option!.type)
    data.isuser = Number(option!.isuser)
    data.accountId = option!.accountId
})

</script>
  
<style lang="scss" scoped>

</style>
  