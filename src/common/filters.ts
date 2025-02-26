
export const moneyFilter = (e:any) => {
    if (!e) { return '0' }
    const num = parseInt(e) / 100
    const all = Number.isInteger(num) ? num : num.toFixed(2)
    return all
}// 优惠券 - 折扣券
export const discountFilter = (e) => {
    if (!e) { return "10" }
    return parseInt(e) / 100 //.toFixed(2)
}
