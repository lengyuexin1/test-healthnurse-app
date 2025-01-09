
// 节流:触发函数事件后，短时间间隔内无法连续调用，只有上一次函数执行后，过了规定的时间间隔，才能进行下一次的函数调用。
let lastCall = 0
export function Throttle(fn: any, delay: number) {
	const now = new Date().getTime();
	if (now - lastCall < delay) {
		return
	}
	lastCall = now
	fn.apply(this, arguments)
}


// 防抖 (Debouncing) 的含义是指在一定时间内，多次触发同一个事件，只执行最后一次操作
let timer: any
export function Debounce(fn: any, delay: number) {
	clearTimeout(timer)
	timer = setTimeout(() => {
		fn()
	}, delay)
}

// 指定时间内仅响应一次函数
export class Throttler {
    constructor(interval: any) {
        this.interval = interval; // 时间间隔
        this.lastExecutedTime = null as any; // 上次执行时间
    }

    // 触发执行的函数
    execute(fn:any) {
        const currentTime = Date.now();

        // 判断是否已经超过指定时间间隔
        if (!this.lastExecutedTime || currentTime - this.lastExecutedTime >= this.interval) {
        fn(); // 执行目标函数
        this.lastExecutedTime = currentTime; // 记录当前时间为执行时间
        }
    }
}