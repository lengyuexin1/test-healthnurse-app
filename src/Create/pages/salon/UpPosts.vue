<template>
    <view class="container">
        <UpPostsPage :salonId="data.salonId" :ischange="data.ischange" :id="data.id"></UpPostsPage>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import UpPostsPage from './components/UpPostsPage.vue'
import { onLoad } from '@dcloudio/uni-app'


interface Data {
    salonId:string,
    ischange:number,
    id:string

}
const data = reactive<Data>({
    salonId:'',
    ischange:0,
    id:''

})

onLoad((option:any)=>{
    if (Number(option.ischange)) {
        data.ischange = 1
        data.id = option.id
    }else{
        data.ischange = 0
    }
    data.salonId = option.salonId
})


</script>
  
<style>
page{
    background: #fff;
}
</style>
 
