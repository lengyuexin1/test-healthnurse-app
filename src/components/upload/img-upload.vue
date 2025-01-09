<template>
	<view>
		<TnImageUpload
			v-model="imageList"
			:action="actionUrl"
			:custom-upload-handler="uploadHandle"
			:limit="limit"
			:show-error-tips="false"
			ref="imageUploadRef"
			@change="upchange"
		>
		<!-- 自定义上传框内容需要手动触发上传方法 -->
			<template #uploadBtn>
				<slot name="uploadBtn"></slot>
			</template>

		</TnImageUpload>
	</view>
		
		
</template>

<script lang="ts" setup>
import dayjs from "dayjs"
import { ref, watch, defineEmits, defineExpose } from 'vue'
import TnImageUpload from '@tuniao/tnui-vue3-uniapp/components/image-upload/src/image-upload.vue'
import { uploadFileApi } from '@/api/file-api'
import type {
  ImageUploadCustomFunction,
  ImageUploadFile,
  TnImageUploadInstance
} from '@tuniao/tnui-vue3-uniapp'
const props = defineProps({
	imageArr: {
		type: Array as any,
		default: []
	},
	limit: {
		type: Number,
		default: 1
	}
})
interface Events {
    (e: "update:imageArr", val: any): void,
	(e: "upchange"): void
}
const imageList:any = ref(props.imageArr)
const emit = defineEmits<Events>()
watch(imageList, (newValue: any) => {
    emit("update:imageArr", newValue)
})

const actionUrl = ref('http://192.168.3.23:8090/upload/image')

const uploadHandle: ImageUploadCustomFunction =  (file: ImageUploadFile) => {
	console.log('上传',file);
	
	console.log(dayjs().valueOf())
	const url = (file as UniApp.ChooseImageSuccessCallbackResultFile).path


	const name = dayjs().valueOf() + ''
		 return new Promise((resolve, reject) => {
			  uploadFileApi(url,name, 'merchant/license').then((res:any) => {
				console.log('调用成功');

				  resolve(res.url)
			  }).catch(err => {
				reject(err)
			  })
		 })
}


const imageUploadRef = ref<TnImageUploadInstance>()
const chooseFileFun = () => {
  	imageUploadRef.value?.chooseFile()
}

const upchange = () => {
	emit('upchange')
}

defineExpose({
    chooseFileFun
})

</script>

<style lang="scss" scoped>

</style>