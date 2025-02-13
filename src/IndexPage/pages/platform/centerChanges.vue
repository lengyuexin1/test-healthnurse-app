<template>
    <pageContainer :loading="pageLoading"></pageContainer>
</template>
<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app"
import { columnDetail } from "@/api/setite-api"
import pageContainer from "@/components/container/page-container.vue"
import { gotoNewActive, gotoZone, gotoCateList } from '@/routes/active-routes'
import { ref } from "vue"

const pageLoading = ref(true)
onLoad((option: any) => {
    columnDetail(option.id).then(res => {
        if (res.isAdorn) {
            gotoZone(option.id, option.name)
        } else {
            gotoCateList({type: 2, id:option.id })
        }
    })
})
</script>