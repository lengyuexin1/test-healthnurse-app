<template>
	<view class="expandable-text">
	  <view
		class="expandable-text-content"
		:style="{ height: collapse ? lineHeight * line + 'rpx' : textHeight + 'rpx' }"
	  >
		<text :style="{ display: collapse && textHeight > lineHeight * line ? 'inline' : '' }">
		  <slot>{{ longText }}</slot>
		</text>
	  </view>
  
	  <!-- Expand/Collapse Button -->
	  <view
		v-if="textHeight > lineHeight * line"
		class="expandable-text-footer"
		@click="setType"
	  >
		<slot name="expand-icon">
		  <text>{{ collapse ? expandText : foldText }}</text>
		</slot>
	  </view>
	</view>
  </template>
<script setup>
import { ref, computed, watch, onMounted } from 'vue'
// Props
const props = defineProps({
  line: {
    type: Number,
    default: 1,
  },
  lineHeight: {
    type: Number,
    default: 32,
  },
  longText: {
    type: String,
    default: '',
  },
  useExpandSlot: {
    type: Boolean,
    default: false,
  },
  expandText: {
    type: String,
    default: '展开',
  },
  foldText: {
    type: String,
    default: '收起',
  },
})

// Reactive State
const collapse = ref(true)  // Track if content is collapsed
const textHeight = ref(0)    // Track the height of the content

// Computed property to calculate number of lines
const lines = computed(() => {
  return textHeight.value / props.lineHeight
})

// Watch for changes in the text and recalculate height
watch(() => props.longText, (newText) => {
  if (newText) {
    calculateTextHeight()
  }
})

// Method to calculate text height
const calculateTextHeight = () => {
  const query = uni.createSelectorQuery()
  query.select('.expandable-text-content').boundingClientRect()
  query.exec(([rect]) => {
    textHeight.value = rect.height
  })
}

// Toggle collapse state
const setType = () => {
  collapse.value = !collapse.value
  // Optionally emit an event to the parent to track the collapse state
  emit('updateStatus', collapse.value)
}

// On mounted, calculate text height
onMounted(() => {
  calculateTextHeight()
})
</script>

<style scoped lang="scss">
	.clearboth {
		clear: both;
	}

	.jj-expandable-text {
		display: flex;
		color: #666666;
		font-size: 28rpx;
	}

	.jj-expandable-text .text {
		position: relative;
		line-height: 1.5;
		max-height: 1.5em;
		overflow: hidden;
		transition: .3s max-height;
		flex: 1;
	}

	.jj-expandable-text .text::before {
		content: '';
		float: right;
		width: 0;
		/*设置为0，或者不设置宽度*/
		height: calc(100% - var(--lineheight));
		/*先随便设置一个高度*/
		background: red;
	}

	.jj-expandable-text .text::after {
		content: '';
		width: 100%;
		height: 100%;
		position: absolute;
		// background: #fff;
	}

	.jj-expandable-text .expandable {
		max-height: 1000px;
		/*超出最大行高度就可以了*/
	}

	.jj-expandable-text .expandable::after {
		visibility: hidden;
	}

	.jj-expandable-text .btn {
		float: right;
		position: relative;
		margin-left: 1em;
	}

	.jj-expandable-text .btn .opt-hint {
		color: #3E9FFF;
	}

	.jj-expandable-text .btn::before {
		content: '...';
		position: absolute;
		letter-spacing: 2rpx;
		left: -6rpx;
		bottom: -2rpx;
		color: inherit;
		transform: translateX(-100%)
	}

	.jj-expandable-text .btn::after {
		content: '.';
		opacity: 0;
		width: 0;
	}

	.jj-expandable-text .expandable .btn::after {
		content: '.';
		opacity: 0;
		width: 0;
	}

	.jj-expandable-text .expandable .btn::before {
		visibility: hidden;
		/*在展开状态下隐藏省略号*/
	}

	// .jj-placeholder {
	// 	visibility: hidden;
	// }
</style>
