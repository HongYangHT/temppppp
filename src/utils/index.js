/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description:
 * @Date: 2019-12-18 11:46:56
 * @LastEditTime: 2019-12-20 14:58:02
 */
function getDateStr(AddDayCount) {
  let dd = new Date()
  dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期
  let y = dd.getFullYear()
  let m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
  let d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
  return y + '-' + m + '-' + d + ' 00:00:00'
}
function getCurrent() {
  let dd = new Date()
  let y = dd.getFullYear()
  let m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1
  let d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate()
  return y + '-' + m + '-' + d + ' 23:59:59'
}

function getMonthDays(myMonth) {
  let currentYear = new Date().getFullYear()
  let monthStartDate = new Date(currentYear, myMonth, 1)
  let monthEndDate = new Date(currentYear, myMonth + 1, 1)
  let days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24)
  return days
}
function getQuarterSeasonStartMonth(month) {
  let spring = 0 // 春
  let summer = 3 // 夏
  let fall = 6 // 秋
  let winter = 9 // 冬
  // 月份从0-11
  if (month < 3) {
    return spring
  }

  if (month < 6) {
    return summer
  }

  if (month < 9) {
    return fall
  }

  return winter
}

function getSeasonMonthDays(year, month) {
  // 本月第一天 1-31
  let relativeDate = new Date(year, month, 1)
  // 获得当前月份0-11
  let relativeMonth = relativeDate.getMonth()
  // 获得当前年份4位年
  let relativeYear = relativeDate.getFullYear()

  // 当为12月的时候年份需要加1
  // 月份需要更新为0 也就是下一年的第一个月
  if (relativeMonth === 11) {
    relativeYear++
    relativeMonth = 0
  } else {
    // 否则只是月份增加,以便求的下一月的第一天
    relativeMonth++
  }
  // 一天的毫秒数
  let millisecond = 1000 * 60 * 60 * 24
  // 下月的第一天
  let nextMonthDayOne = new Date(relativeYear, relativeMonth, 1)
  // 返回得到上月的最后一天,也就是本月总天数
  return new Date(nextMonthDayOne.getTime() - millisecond).getDate()
}

function getCurrentSeason() {
  // 起止日期数组
  let startStop = []
  // 获取当前时间
  let currentDate = new Date()
  // 获得当前月份0-11
  let currentMonth = currentDate.getMonth()
  // 获得当前年份4位年
  let currentYear = currentDate.getFullYear()
  // 获得本季度开始月份
  let quarterSeasonStartMonth = getQuarterSeasonStartMonth(currentMonth)
  // 获得本季度结束月份
  let quarterSeasonEndMonth = quarterSeasonStartMonth + 2

  // 获得本季度开始的日期
  let quarterSeasonStartDate = new Date(currentYear, quarterSeasonStartMonth, 1, 0, 0, 0)
  // 获得本季度结束的日期
  let quarterSeasonEndDate = new Date(currentYear, quarterSeasonEndMonth, getSeasonMonthDays(currentYear, quarterSeasonEndMonth), 23, 59, 59)
  // 加入数组返回
  startStop.push(quarterSeasonStartDate)
  startStop.push(quarterSeasonEndDate)
  // 返回
  return startStop
}
export const getDateSelectOptions = () => {
  let currentYear = new Date().getFullYear()
  let currentMonth = new Date().getMonth()
  let lastMonthDate = new Date()
  lastMonthDate.setDate(1)
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1)
  let lastMonth = lastMonthDate.getMonth()
  const shortcuts = {
    shortcuts: [
      {
        text: '今天',
        value() {
          return [getDateStr(0), getCurrent()]
        },
      },
      {
        text: '昨天',
        value() {
          let date = new Date(getDateStr(-1))
          const start = new Date(getDateStr(-1))
          const end = date.setTime(date.getTime() + 3600 * 1000 * 24 - 1)
          return [start, new Date(end)]
        },
      },
      {
        text: '最近7天',
        value() {
          const start = new Date(getDateStr(-7))
          const end = new Date(getCurrent())
          return [start, end]
        },
      },
      {
        text: '最近30天',
        value() {
          const start = new Date(getDateStr(-30))
          const end = new Date(getCurrent())
          return [start, end]
        },
      },
      {
        text: '本月',
        value() {
          let days = new Date(currentYear, currentMonth + 1, 0).getDate()
          let month = currentMonth + 1
          if (days < 10) {
            days = `0${days}`
          }
          if (month < 10) {
            month = `0${month}`
          }
          const start = `${currentYear}-${month}-01 00:00:00`
          const end = `${currentYear}-${month}-${days} 23:59:59`
          return [new Date(start), new Date(end)]
        },
      },
      {
        text: '上月',
        value() {
          let lastMonthStartDate = new Date(currentYear, lastMonth, 1, 0, 0, 0)
          let lastMonthEndDate = new Date(currentYear, lastMonth, getMonthDays(lastMonth), 23, 59, 59)
          let start = lastMonthStartDate
          let end = lastMonthEndDate
          return [start, end]
        },
      },
      {
        text: '本季度',
        value() {
          return getCurrentSeason()
        },
      },
      {
        text: '今年',
        value() {
          return [new Date(`${currentYear}-01-01 00:00:00`), new Date(`${currentYear}-12-31 23:59:59`)]
        },
      },
    ],
  }
  return shortcuts
}
