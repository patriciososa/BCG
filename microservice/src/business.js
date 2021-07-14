import conf from './configuration'

const getUTCPeriodTime = (startDate, day, periodHour) => {
  const month = startDate.getUTCMonth()
  const year = startDate.getUTCFullYear()

  return new Date(Date.UTC(year, month, day, periodHour)).getTime()
}

const getNightPeriodAdd = (startDate) => {
  const startTime = startDate.getTime()
  const day = startDate.getUTCDate()

  const startMorning = getUTCPeriodTime(startDate, day, 0)
  const endMorning = getUTCPeriodTime(startDate, day, conf.nightPeriodEndsHour)

  const startNight = getUTCPeriodTime(startDate, day, conf.nightPeriodStartHour)
  const endNight = getUTCPeriodTime(startDate, day + 1, 0)

  return (startTime > startMorning && startTime < endMorning)
    || (startTime > startNight && startTime < endNight) ? conf.nightPeriodAdd : 0
}

const getBusyPeriodsAdd = (startDate) => {
  const startTime = startDate.getTime()
  const day = startDate.getUTCDate()

  const start = getUTCPeriodTime(startDate, day, conf.busyPeriodStartHour)
  const end = getUTCPeriodTime(startDate, day, conf.busyPeriodEndsHour)

  return  startTime > start &&  startTime < end ? conf.busyPeriodAdd : 0
}

export default function (startTime, distance) {
  const startDate = new Date(startTime)
  const nightPeriodAdd = getNightPeriodAdd(startDate)
  const busyPeriodsAdd = getBusyPeriodsAdd(startDate)

  return conf.initialCharge + distance * conf.milePrice + nightPeriodAdd + busyPeriodsAdd
}