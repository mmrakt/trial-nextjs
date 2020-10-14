import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'
import Todo from '../components/task/index'

const Index = (): React.ReactElement => {
  return (
    <>
      <Layout title="Dashboard">
        <Todo />
      </Layout>
    </>
  )
}

Index.propTypes = {
  children: PropTypes.node,
}

export default Index
