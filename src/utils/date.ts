// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const formatDate = (date: any): any => {
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    month = ('0' + month).slice(-2)
    day = ('0' + day).slice(-2)
    return year + month + day
}

export const formatDateTime = (today: Date): any => {
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const day = today.getDate()
    const hour = today.getHours()
    const minute = today.getMinutes()
    const secound = today.getSeconds()
    return year + '' + month + '' + day + '' + hour + '' + minute + '' + secound
}
