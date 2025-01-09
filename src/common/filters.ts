
export const moneyFilter = (e:any) => {
    if (!e) { return '0' }
    const num = parseInt(e) / 100
    const all = Number.isInteger(num) ? num : num.toFixed(2)
    return all
}