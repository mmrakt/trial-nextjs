import React from 'react'
import Calendar from 'react-calendar'
import Layout from '../../components/Layout'
import Link from 'next/link'
import styles from './index.module.css'
import { useGetReportsDateTextQuery } from '@/generated/graphql'
import DoneIcon from '@material-ui/icons/Done'
import RemoveIcon from '@material-ui/icons/Remove'

const Check = (): React.ReactElement => {
  const { loading, error, data } = useGetReportsDateTextQuery()
  if (loading) return <p>Loading...</p>
  if (error) return <p>ERROR</p>

  const getTileContent = (calendar) => {
    const year = calendar.date.getFullYear()
    let month = calendar.date.getMonth() + 1
    let day = calendar.date.getDate()
    month = ('0' + month).slice(-2)
    day = ('0' + day).slice(-2)
    const formatDate = year + month + day

    if (data.reports.some((report) => report.dateText === formatDate)) {
      // 提出済み
      return (
        <div>
          <Link href={`/submit/${formatDate}`}>
            <DoneIcon color="secondary" />
          </Link>
        </div>
      )
    } else {
      // 未提出
      return (
        <div>
          <Link href={`/submit/${formatDate}`}>
            <RemoveIcon color="disabled" />
          </Link>
        </div>
      )
    }
  }
  return (
    <Layout title="提出状況確認">
      <div className={styles.calendarBox}>
        <Calendar
          className={styles.calendar}
          value={new Date()}
          tileContent={getTileContent}
          calendarType="US"
        />
      </div>
    </Layout>
  )
}

export default Check
