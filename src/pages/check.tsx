import React from 'react'
import Calendar from 'react-calendar'
import Layout from '../components/Layout'

const Check = () => {
  return (
    <Layout title="Check Report">
      <div>
        <Calendar locale="ja-JP" value={new Date()} />
      </div>
    </Layout>
  )
}

export default Check
