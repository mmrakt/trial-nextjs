import React from 'react'
import Layout from '../../components/Layout'
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts'
import { useGetAllTasksQuery } from '@/generated/graphql'

const Aggregate = (): any => {
  const { data } = useGetAllTasksQuery()

  if (!data) {
    return <p>...loading</p>
  }
  const januaryTasks = data.tasks.filter((task) => {
    return task.reportDateText.match(/202001../)
  })
  const februaryTasks = data.tasks.filter((task) => {
    return task.reportDateText.match(/202002../)
  })
  const marchTasks = data.tasks.filter((task) => {
    return task.reportDateText.match(/202003../)
  })
  const aprilTasks = data.tasks.filter((task) => {
    return task.reportDateText.match(/202004../)
  })
  const mayTasks = data.tasks.filter((task) => {
    return task.reportDateText.match(/202005../)
  })
  const juneTasks = data.tasks.filter((task) => {
    return task.reportDateText.match(/202006../)
  })
  const julyTasks = data.tasks.filter((task) => {
    return task.reportDateText.match(/202007../)
  })
  const augustTasks = data.tasks.filter((task) => {
    return task.reportDateText.match(/202008../)
  })
  const septemberTasks = data.tasks.filter((task) => {
    return task.reportDateText.match(/202009../)
  })
  const octoberTasks = data.tasks.filter((task) => {
    return task.reportDateText.match(/202010../)
  })
  const novemberTasks = data.tasks.filter((task) => {
    return task.reportDateText.match(/202011../)
  })
  const decemberTasks = data.tasks.filter((task) => {
    return task.reportDateText.match(/202012../)
  })
  // const monthlyTotalHour = (tasks) => {
  //   if (tasks.length === 0) return 0
  //   else {
  //     return tasks
  //       .map((task) => {
  //         return parseFloat(task.hour.hour)
  //       })
  //       .reduce((pre, x) => {
  //         return pre + x
  //       })
  //   }
  // }
  const monthlyProjectlHour = (tasks, projectName) => {
    const eachProjectTasks = tasks.filter((task) => {
      return task.project === projectName
    })
    if (eachProjectTasks.length === 0) return 0
    else {
      return eachProjectTasks
        .map((task) => {
          return parseFloat(task.hour.hour)
        })
        .reduce((pre, x) => {
          return pre + x
        })
    }
  }
  const monthlyTotalHourList = [
    {
      name: '1月',
      MS新基盤: monthlyProjectlHour(januaryTasks, 'MS新基盤'),
      MSエンハンス: monthlyProjectlHour(januaryTasks, 'MSエンハンス'),
      新卒研修: monthlyProjectlHour(januaryTasks, '新卒研修'),
      その他: monthlyProjectlHour(januaryTasks, 'その他'),
    },
    {
      name: '2月',
      MS新基盤: monthlyProjectlHour(februaryTasks, 'MS新基盤'),
      MSエンハンス: monthlyProjectlHour(februaryTasks, 'MSエンハンス'),
      新卒研修: monthlyProjectlHour(februaryTasks, '新卒研修'),
      その他: monthlyProjectlHour(februaryTasks, 'その他'),
    },
    {
      name: '3月',
      MS新基盤: monthlyProjectlHour(marchTasks, 'MS新基盤'),
      MSエンハンス: monthlyProjectlHour(marchTasks, 'MSエンハンス'),
      新卒研修: monthlyProjectlHour(marchTasks, '新卒研修'),
      その他: monthlyProjectlHour(marchTasks, 'その他'),
    },
    {
      name: '4月',
      MS新基盤: monthlyProjectlHour(aprilTasks, 'MS新基盤'),
      MSエンハンス: monthlyProjectlHour(aprilTasks, 'MSエンハンス'),
      新卒研修: monthlyProjectlHour(aprilTasks, '新卒研修'),
      その他: monthlyProjectlHour(aprilTasks, 'その他'),
    },
    {
      name: '5月',
      MS新基盤: monthlyProjectlHour(mayTasks, 'MS新基盤'),
      MSエンハンス: monthlyProjectlHour(mayTasks, 'MSエンハンス'),
      新卒研修: monthlyProjectlHour(mayTasks, '新卒研修'),
      その他: monthlyProjectlHour(mayTasks, 'その他'),
    },
    {
      name: '6月',
      MS新基盤: monthlyProjectlHour(juneTasks, 'MS新基盤'),
      MSエンハンス: monthlyProjectlHour(juneTasks, 'MSエンハンス'),
      新卒研修: monthlyProjectlHour(juneTasks, '新卒研修'),
      その他: monthlyProjectlHour(juneTasks, 'その他'),
    },
    {
      name: '7月',
      MS新基盤: monthlyProjectlHour(julyTasks, 'MS新基盤'),
      MSエンハンス: monthlyProjectlHour(julyTasks, 'MSエンハンス'),
      新卒研修: monthlyProjectlHour(julyTasks, '新卒研修'),
      その他: monthlyProjectlHour(julyTasks, 'その他'),
    },
    {
      name: '8月',
      MS新基盤: monthlyProjectlHour(augustTasks, 'MS新基盤'),
      MSエンハンス: monthlyProjectlHour(augustTasks, 'MSエンハンス'),
      新卒研修: monthlyProjectlHour(augustTasks, '新卒研修'),
      その他: monthlyProjectlHour(augustTasks, 'その他'),
    },
    {
      name: '9月',
      MS新基盤: monthlyProjectlHour(septemberTasks, 'MS新基盤'),
      MSエンハンス: monthlyProjectlHour(septemberTasks, 'MSエンハンス'),
      新卒研修: monthlyProjectlHour(septemberTasks, '新卒研修'),
      その他: monthlyProjectlHour(septemberTasks, 'その他'),
    },
    {
      name: '10月',
      MS新基盤: monthlyProjectlHour(octoberTasks, 'MS新基盤'),
      MSエンハンス: monthlyProjectlHour(octoberTasks, 'MSエンハンス'),
      新卒研修: monthlyProjectlHour(octoberTasks, '新卒研修'),
      その他: monthlyProjectlHour(octoberTasks, 'その他'),
    },
    {
      name: '11月',
      MS新基盤: monthlyProjectlHour(novemberTasks, 'MS新基盤'),
      MSエンハンス: monthlyProjectlHour(novemberTasks, 'MSエンハンス'),
      新卒研修: monthlyProjectlHour(novemberTasks, '新卒研修'),
      その他: monthlyProjectlHour(novemberTasks, 'その他'),
    },
    {
      name: '12月',
      MS新基盤: monthlyProjectlHour(decemberTasks, 'MS新基盤'),
      MSエンハンス: monthlyProjectlHour(decemberTasks, 'MSエンハンス'),
      新卒研修: monthlyProjectlHour(decemberTasks, '新卒研修'),
      その他: monthlyProjectlHour(decemberTasks, 'その他'),
    },
  ]

  return (
    <Layout title="集計データ確認">
      <div>
        <BarChart width={1000} height={400} data={monthlyTotalHourList}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="MS新基盤" stackId="projects" fill="#8884d8" />
          <Bar dataKey="MSエンハンス" stackId="projects" fill="#82ca9d" />
          <Bar dataKey="新卒研修" stackId="projects" fill="#ffd700" />
          <Bar dataKey="その他" stackId="projects" fill="#c0c0c0" />
        </BarChart>
      </div>
    </Layout>
  )
}

export default Aggregate
