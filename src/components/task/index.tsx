import React from 'react'
import Input from './Input'
import Filter from './Filter'
import TodoTabPanel from './TabPanel'
import Layout from '../Layout'
import { Box, Container, Typography } from '@material-ui/core'

const Todo = (): React.ReactElement => {
  const statuses = ['ALL', 'TODO', 'DONE']
  return (
    <Layout>
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Next.js example
          </Typography>
        </Box>
        <div>React Todo</div>
        <Input />
        <Filter />
        {statuses.map((status, index) => (
          <TodoTabPanel key={index} status={status} />
        ))}
      </Container>
    </Layout>
  )
}

export default Todo
