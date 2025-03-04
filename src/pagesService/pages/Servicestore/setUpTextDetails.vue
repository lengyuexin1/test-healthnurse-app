<template>
    <div class="contraner">
        <z-paging
              ref="paging"
              :refresher-enabled="false"
              :loading-more-enabled="false"

              :defaultPageSize="10"
              :empty-view-img-style="{ width: '320rpx',height: '320rpx' }"
              :auto="false"
        >

            <view class="text_details">
                <view class="text_box" v-if="detailObj.content">
                    {{ detailObj.content }}
                </view>
            </view>
        </z-paging>

    </div>
</template>
<script setup>
import { organizationDetail } from '@/api/service-api'
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { onLoad } from '@dcloudio/uni-app'

const route = useRoute()
const detailObj = reactive({})
onLoad(async (options) => {

    const res = await organizationDetail({ shopId: options.itemId, isAd: 0 })
    Object.assign(detailObj, res)
})

</script>
<style lang="scss" scoped>
.contraner {
    .text_details {
        width: 100%;
        padding: 24rpx;
        box-sizing: border-box;

        .text_box {
            border-radius: 24rpx;
            padding: 40rpx 30rpx;
            box-sizing: border-box;
            background: #fff;
            color: #333333;
            font-size: 28rpx;
            line-height: 56rpx;
        }
    }

}


</style>
