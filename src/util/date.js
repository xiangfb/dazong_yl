class DateUtil {
  calcDate (date1, date2) {
    var date3 = date2 - date1
    var days = Math.floor(date3 / (24 * 3600 * 1000))
    var leave1 = date3 % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000))
    var leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000))
    var leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
    var seconds = Math.round(date3 / 1000)
    return {
      leave1,
      leave2,
      leave3,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    }
  }
  // 获取当前时间 YYYYMMDD
  getDay () {
    var nowDate = new Date()
    var year = nowDate.getFullYear()
    var month = nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1)
      : nowDate.getMonth() + 1
    var day = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate()
    var dateStr = year + month + day
    return dateStr
  }
}
export default new DateUtil()
