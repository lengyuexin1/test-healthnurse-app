# 可多段进度条组件

# 使用实例
`html`
```
<luo-line-press :queryData="obj"></luo-line-press>
```
`javascript`
```
import luoLinePress from '@/components/luo-linePress/luo-linePress.vue';
	export default {
		components:{
			luoLinePress
		},
		data() {
			return {
				obj:{
					lv: 2,//在哪一段
					lvNum: 20,//一段总进度
					lvNowNum: 2,//一段选中进度
					title: 'LV.1 初级销售人员'
				}
			};
		},
		methods:{
		}
	}
```

# props
参数名          |说明                                              | 类型        |   默认值
---------------|-------------------------------------------------- -|-------------|------------
lvFlex		|分为到少段 										|Number | 默认为3 	
queryData	   		| 传进去的数据	 									| Obj | obj
bgColor        | 未选中颜色以及title的背景色                  | String       | （默认：#1c2633）
actBgColor       |  选中的颜色                                 | String       | （默认：#1093FE）
titColor   |   标题颜色        |     String | （默认：#ffffff）
