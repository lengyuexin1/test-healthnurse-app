# 使用说明

### 简介

Emoji表情管理菜单，支持输入，支持自定义扩充表情，支持多端

### 引入

默认为easycom模式，可直接键入`<shinn-xEmoji>`标签。

### 事件列表

```javascript
@change="changeEmoji"
```

### 参数列表

```javascript
#是否显示
show:{
	type:boolean,
	default:false,
}
#与底端的距离
bottom:{
	type:string,
	default:"0rpx",
}
```