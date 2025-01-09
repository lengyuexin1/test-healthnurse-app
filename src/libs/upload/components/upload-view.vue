
<template>
    <view class="content">
        <u-upload
            class="upload_wrap"
            :fileList="state.fileList"
            @afterRead="state.input"
            @delete="state.delete"
            :multiple="false"
            maxCount="1"
            :previewFullImage="true"
            :width="width"
            :height="height"
            ref="uUpload"
            :capture="['album']"
        >
            <view class="u-upload__seat row align-center center" :style="{ width, height }" @click.stop="handleClick">
                <u-icon name="camera-fill" size="26px" color="#D3D4D6"></u-icon>
            </view>    
        </u-upload>
        
        <yk-authpup ref="authpup" type="top" @changeAuth="chooseFile" permissionID="WRITE_EXTERNAL_STORAGE"></yk-authpup>
    </view>
</template>

<script>
import { BCUpload, path2url } from '@/libs/upload/upload-tools'
import ykAuthpup from "@/components/yk-authpup/yk-authpup.vue"
/** 上传单个图片 */
export default {
    name: 'UploadView',
    components: {
        ykAuthpup
    },
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        /** oss文件名 */
        fileName: {
            type: String
        },
        /** oss文件虚拟目录 */
        uploadPath: {
            type: String,
            required: true
        },
        value: {
            type: String
        },
        width: {
            type: String,
            default: '100rpx'
        },
        height: {
            type: String,
            default: '100rpx'
        }
    },
    data() {
        const upload = new BCUpload({ uploadPath: this.uploadPath, fileName: this.fileName })
        return {
            upload,
            state: upload.state
        }
    },
    created() {
        if (this.value) {
            this.upload.setList([path2url(this.value)])
        }

        const callback = () => {
            console.log('回调函数', this.state)
            const file = this.state.fileList.find((item) => item.status === 'success')
            // this.$emit('change', file && file.url)
            this.$emit("input", file && file.url)
        }
        this.upload.setUploadCallback({
            input: callback,
            delete: callback
        })
    },
    methods: {
        handleClick() {
            console.log("点击事件")
            // #ifdef APP-PLUS
            this.$refs.authpup.open()
            // #endif
            // #ifndef APP-PLUS
            this.chooseFile()
            // #endif
        },
        chooseFile() {
            this.$refs.uUpload.chooseFile()
        }
    }
}
</script>

<style lang="scss" scope>
.upload_wrap::v-deep {
    flex: 0;

    .u-upload__button, .u-upload__wrap__preview {
        margin: 0;
    }
}
</style>
