
<template>
    <view class="content">
        <u-upload
            :fileList="state.fileList"
            @afterRead="state.input"
            @delete="state.delete"
            :multiple="state.multiple"
            :maxCount="maxCount"
            :previewFullImage="true"
            uploadIcon="level"
            :width="width"
            :height="height"
            ref="uUpload"
            :capture="['album']"
        >
            <view class="u-upload__seat row align-center center" :style="{ width, height }" @click.stop="handleClick">
                <image src="@/static/img/icon/uploadIcon.png" mode="scaleToFill" />
            </view>
        </u-upload>

        <yk-authpup ref="authpup" :isNativeHead="false" type="top" @changeAuth="chooseFile" permissionID="WRITE_EXTERNAL_STORAGE"></yk-authpup>
    </view>
</template>

<script>
import { BCUpload, path2url } from '@/libs/upload/upload-tools'
import ykAuthpup from "@/components/yk-authpup/yk-authpup.vue"
/** 支持批量上传 */
export default {
    name: 'UploadLayout',
    components: {
        ykAuthpup
    },
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        /** oss文件虚拟目录 */
        uploadPath: {
            type: String,
            required: true
        },
        value: {
            type: Array,
            default: () => {
                return []
            }
        },
        maxCount: {
            type: Number,
            default: 3
        },
        width: {
            type: String,
            default: '100rpx'
        },
        height: {
            type: String,
            default: '100rpx'
        },
        uploadIcon: {
            type: String,
            default: 'camera-fill'
        }
    },
    data() {

        const upload = new BCUpload({ uploadPath: this.uploadPath }).setList(this.value.map(item => item))
        return {
            upload, 
            state: upload.state
        }
    },
    created() {

        console.log(this.upload, this.uploadPath)
        const fun = () => {
            const paths = this.state.fileList.filter((item) => item.status === 'success').map(item => item.url)
            this.$emit('change', paths)
        }
        this.upload.setUploadCallback({ 
            input: fun,
            delete: fun
        })
    },
    methods: {
        handleClick() {
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

<style lang="scss" scoped>
::v-deep .u-upload__deletable {
    height: 18px;
    width: 18px;
}
::v-deep .u-icon__icon {
    font-size: 14px !important;
    line-height: 14px !important;
}
::v-deep .u-upload__success {
    // border-width: 10px;
}
.u-upload__seat{
    background-color: rgb(244, 245, 247);
    border-radius: 2px;

    image {
        width: 50rpx;
        height: 50rpx;
    }
}
</style>

