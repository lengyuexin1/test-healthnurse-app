<template>
    <view class="contraner">
        <z-paging 
            ref="paging" 
            :auto="false"
            :refresher-enabled="false"
            >
            <template #top>
                <PageTopbg></PageTopbg>
                <bc-page-navbar :title="'机构图集'"></bc-page-navbar>
            </template>
            <view class="img_details" v-if="data.detailObj.albums">
				<view class="img_box" v-if="data.detailObj.albums.length > 0">
					<image
						v-for="(item,index) in data.detailObj.albums"
						:key="index"
						class="img_item"
						:src="item"
						mode="aspectFill"
						@click="preImage(index,data.detailObj.albums)"
					/>
				</view>
				<view v-else>
					空
				</view>
			</view>

        </z-paging>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import { organizationDetail } from '@/api/service-api'


interface Props {
    itemId: string
}

const props = defineProps<Props>()

interface Data {
    detailObj:any,

}

const data = reactive<Data>({
    detailObj:{},
})

const getorganizationDetail = (shopId:string) =>{
    organizationDetail({
        shopId,
        isAd:0
    }).then((res:any)=>{
        data.detailObj = res || {}
    })
}





onMounted(() => {
    getorganizationDetail(props.itemId)
})




const preImage = (current:number, urls:any) => {
    uni.previewImage({
        current,
        urls
    })
}

</script>
  
<style lang="scss" scoped>
.contraner {
    .img_details{
		width: 100%;
		padding: 24rpx;
		box-sizing: border-box;
		.img_box{
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-wrap: wrap;
			.img_item{
				width: 340rpx;
				height: 340rpx;
				// border: 1px solid red;
				border-radius: 12rpx;
				margin-bottom: 14rpx;

			}
		}
	}
}
</style>
 
