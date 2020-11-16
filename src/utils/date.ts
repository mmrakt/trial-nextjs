export const formatDate = (date: any): any => {
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    month = ('0' + month).slice(-2)
    day = ('0' + day).slice(-2)
    return year + month + day
}
