import React from 'react'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'

type DataItem = {
  name: string
  value: number
}

export type PieChartProps = {
  data: DataItem[]
}

const getOption = (props: PieChartProps) => {
  return {
    series: [{
      type: 'pie',
      radius: '60%',
      center: ['50%', '50%'],
      data: props.data,
      silent: true,
      label: {
        formatter: '{b}: {c}'
      }
    }]
  }
}

export default (props: PieChartProps) => {
  return <ReactEchartsCore
    echarts={ echarts }
    theme="light"
    option={ getOption(props) as any }
    style={ { height: '200px', marginTop: '20px' } }
  />
}