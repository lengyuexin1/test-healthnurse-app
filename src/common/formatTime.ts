import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import calendar from 'dayjs/plugin/calendar';

dayjs.extend(calendar)
dayjs.extend(relativeTime); 
dayjs.locale('zh-cn');

// 多久之前
export const agoTime = (tiem:number)=> {
    return dayjs(tiem * 1000).fromNow();
}

// 传入时间戳(格式默认为年月日时分)
export const formattime = (tiem:number, format:string = 'YYYY-MM-DD hh:mm') => {
    return dayjs(tiem * 1000).format(format);
}

// // 日历时间
export const calendarTime = (time:number) => {
    return dayjs(time * 1000).calendar(null, {
        sameDay: '[今天]', 
        nextDay: '[明天]', 
        nextWeek: 'dddd', 
        lastDay: '[昨天]', 
        lastWeek: '[上]dddd',
        sameElse: 'YYYY年MM月DD日' 
      })
}
