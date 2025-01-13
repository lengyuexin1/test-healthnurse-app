<template>
    <view class="emoji_box">
        <view class="emoji_list">
            <view class="emoji_item" v-for="(item,index) in data.emojiList" @click="upEmojiItem(item)" :key="index">
                {{ item }}
            </view>
        </view>
        <!-- <view class="add_emoji">
            <image  
                class="add_emoji_img"
                :src="getAssetsUrl('/leyou/create/addEmoji_icon.svg')"
                mode="scaleToFill"
            />
        </view> -->
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'


interface Props {
}
const props = defineProps<Props>()

interface Data {
    emojiList: any
}
const data = reactive<Data>({
    emojiList:[
        '😆 哈哈哈',
        '🤔???',
        '🤞​比心比心',
        '🥳 太棒了',
        '👍 摸摸头',
        '👌 dd',
        '💪 加油',
    ]
})

interface Events {
    (e: 'upEmojiItem', item: any): void
}
const emit = defineEmits<Events>()



onMounted(() => {
    
})


const upEmojiItem = (item:any) => {
    emit('upEmojiItem',item)
}

</script>
  
<style lang="scss" scoped>
.emoji_box{
    width: 100%;
    height: 96rpx;
    position: relative;
    .emoji_list{
        display: flex;
        align-items: center;
        // padding-right: 100rpx;
        box-sizing: border-box;
        overflow-x: scroll;

        .emoji_item{
            display: flex;
            align-items: center;
            flex-shrink: 0;

            padding: 12rpx 20rpx;
            box-sizing: border-box;
            background: #F7F7F7;
            border-radius: 34rpx;
            font-size: 28rpx;
            font-weight: 400;
            color: #666666;
            margin-right: 20rpx;

        }
    }
    .add_emoji{
        position: absolute;
        top: 0;
        right: 0;
        width: 100rpx;
        height: 64rpx;

        display: flex;
        align-items: center;
        justify-content: flex-end;

        background: linear-gradient( 90deg, rgba(255,255,255,0) 0%, #FFFFFF 30%);
        box-sizing: border-box;

        .add_emoji_img{
            width: 48rpx;
            height: 48rpx;
        }
    }
}
</style>
  