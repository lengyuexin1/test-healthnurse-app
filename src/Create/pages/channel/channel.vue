<template>
    <view class="container">
        <channelPage ></channelPage>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import channelPage from './components/channelPage.vue'


interface Props {
}

const props = defineProps<Props>()

onMounted(() => {

})




</script>
  
<style>
page{
    background: #F8F8F8;
}
</style>
  