<template>
    <z-paging ref="paging" :auto="false" :refresher-enabled="false">
        <template #top>
            <PageTopbg :zIndex="-1"></PageTopbg>
            <bc-page-navbar :title="'冷暖新风控制'"></bc-page-navbar>
        </template>
        <bc-device-air-cond ></bc-device-air-cond>
    </z-paging>
</template>
<script setup lang="ts">
import PageTopbg from '@/components/page-topbg/page-topbg.vue'

</script>
<style scoped lang="scss">
</style>