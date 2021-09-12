const dayjs = require('dayjs')
const fs = require('fs')

const weekTrans = '日一二三四五六'

const init = () => {
  const kLineData = getKLineData()
  console.log('kLineData length', kLineData.length)
  // const firstDayData = getFirstDayData(kLineData)
  // const weekNo = getWeekNoByTimeStamp(firstDayData.date)
  const { newKLineData, kLineArrByWeekNo } = computeDayChange(kLineData)
  // console.log('newKLineData', newKLineData)
  const dayAverage = countDayAverage(kLineArrByWeekNo)
  // writeKLineData(newKLineData)
}

const getKLineData = () => {
  const rawData = fs.readFileSync(__dirname + '/dataRaw.json', 'utf-8')
  return JSON.parse(rawData)
}

const writeKLineData = kLineData => {
  try {
    fs.writeFileSync(__dirname + '/newDataFormat.json', JSON.stringify(kLineData, null, '\t'))
    console.info('writeKLineDate success')
  } catch (error) {
    console.error('writeKLineDate error', error)
  }
}

const getFirstDayData = kLineData => {
  return kLineData[0]
}

const getWeekNoByTimeStamp = (timeStamp) => {
  return dayjs(timeStamp).day()
}

const computeDayChange = kLineData => {
  let firstPrice
  let weekNo
  let kLineArrByWeekNo = new Array(7).fill([])
  for (let i = 0; i < kLineData.length; i++) {
    if (i === 0) {
      firstPrice = kLineData[i].close
      kLineData[i].change = 0
      weekNo = dayjs(kLineData[i].date * 1000).day()
      kLineData[i].weekNo = weekNo
    } else {
      const prevClonse = kLineData[i - 1].close
      console.log('prevClonse', prevClonse)
      kLineData[i].change = +((kLineData[i].close - prevClonse) / prevClonse).toFixed(4)
      if (weekNo >= 6) {
        weekNo = -1
      }
      weekNo = weekNo + 1
      kLineData[i].weekNo = weekNo
    }
    kLineData[i].timeFormat = dayjs(kLineData[i].date * 1000).format('YYYY-MM-DD')
    // console.log('day change', kLineData[i].timeFormat, kLineData[i].weekNo, kLineData[i].change)
    kLineArrByWeekNo[weekNo].push(kLineData[i].change)
  }
  console.log('kLineArrByWeekNo', kLineArrByWeekNo)
  return { kLineData, kLineArrByWeekNo }
}

const countDayAverage = kLineArrByWeekNo => {
  for (let i = 0; i < kLineArrByWeekNo.length; i++) {
    const { ups, downs } = upAndDownCount(kLineArrByWeekNo[i])
    console.log(`周${weekTrans.charAt(i)}平均涨幅:`, arrayAverage(kLineArrByWeekNo[i]), '上涨下跌次数:', ups, downs)
  }
}

const arrayAverage = arr => {
  let sum = 0;
  for(let i in arr) {
      sum += arr[i];
  }
  let numbersCnt = arr.length;
  return `${((sum / numbersCnt) * 100).toFixed(2)}%`;
}

const upAndDownCount = arr => {
  let ups = 0
  let downs = 0
  for (let i = 0; i < arr.length; i++)  {
    arr[i] >=0 ? ups++ : downs++
  }
  return { ups, downs }
}

init()
