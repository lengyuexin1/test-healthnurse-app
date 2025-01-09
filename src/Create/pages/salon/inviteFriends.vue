<template>
    <view class="container">
        <salonInvitePage :id="data.id"></salonInvitePage>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import salonInvitePage from './components/salonInvitePage.vue'
import { onLoad, onReady } from '@dcloudio/uni-app'

interface Data {
    id:string
}
const data = reactive<Data>({
    id:''
})

onMounted(() => {

})

onLoad((option:any)=>{
    data.id = option.id
})



</script>
  
<style lang="scss" scoped>

</style>
  