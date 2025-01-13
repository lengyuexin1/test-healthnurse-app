<template>
	<div>
		<button @click="user">用户管理</button>
		<button @click="home">家庭管理</button>
		<button @click="config">设备管理和配网</button>
		<button @click="manager">管理</button>
		<button @click="laYa">蓝牙配网</button>
	</div>
</template>

<script setup lang="ts">
const laYa = () => {
	uni.navigateTo({
		url: '/Tuya/pages/wisdom/layaNet'
	})
}
const user = () => {
	uni.navigateTo({
		url: '/Tuya/pages/wisdom/xm_tuya'
	});
}
const home = () => {
	uni.navigateTo({
		url: '/Tuya/pages/wisdom/xm_home'
	});
}
const config = () => {
	uni.navigateTo({
		url: '/Tuya/pages/wisdom/xm_config'
	})
}
const manager = () => {
	uni.navigateTo({
		url: '/Tuya/pages/wisdom/xm_user'
	})
}
</script>

<style></style>
