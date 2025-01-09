/**计算营业时间
 *
 * 传入机构的营业时间对象
 * businessDays : 营业日
 * businessFrame ： 营业模式(1自定义营业时间,2二十四小时营业)
 * timeRanges : 营业时间范围(数组 startTime,endTime 开始时间结束时间)
 */


export const businessTime  = (timeObj) => {
    if (timeObj.businessFrame == 2) {
        return '二十四小时营业'
    }
    else {
        const date = new Date()
        const day = date.getDay()

        const findDay = timeObj.businessDays.find((timeItem) => {
            return timeItem == day
        })

        if (day == 0 && findDay == 7) {
            // 特殊处理周日
            let timeStr = ''
            timeObj.timeRanges.forEach(item => {
                timeStr = timeStr + " " + item.startTime + '-' + item.endTime
            })
            return timeStr
        }
        else if (day == findDay) {
            // 当前时间 是否与设置营业时间一致
            let timeStr = ''
            timeObj.timeRanges.forEach(item => {
                timeStr = timeStr + " " + item.startTime + '-' + item.endTime
            })
            return timeStr
        }
        else {
            return '歇业中'
        }
    }
}
