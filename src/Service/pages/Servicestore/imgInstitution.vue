<template>
    <view class="container">
        <imgInstitutionPage :itemId="data.itemId" ></imgInstitutionPage>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import imgInstitutionPage from './components/imgInstitutionPage.vue'

import { onLoad } from '@dcloudio/uni-app'

interface Data {
    itemId:string,
}
const data = reactive<Data>({
    itemId:'',
})

onMounted(() => {

})


onLoad((option:any)=>{
    data.itemId = option.itemId
})



</script>
  
<style lang="scss" scoped>

</style>
 
