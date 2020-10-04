import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { v4 as uuidv4 } from 'uuid'
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import FilterListIcon from '@material-ui/icons/FilterList'
import { LeakRemoveTwoTone } from '@material-ui/icons'
import {
  Checkbox,
  TextField,
  FormControlLabel,
  Tooltip,
  IconButton,
  Toolbar,
  TableSortLabel,
  TableRow,
  TablePagination,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Typography,
  Paper,
  Switch,
  Select,
  MenuItem,
  Button,
} from '@material-ui/core'
import Layout from '../components/Layout'
import TaskItem from '../components/Submit/TaskItem'

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  buttons: {
    display: 'flex',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    justifyContent: 'flex-end',
  },
}))

const Submit = () => {
  const classes = useStyles()
  const [tasks, setTasks] = useState([
    {
      id: uuidv4(),
      goal: true,
      hours: 0.25,
      classfication: '',
      detail: '',
      note: '',
    },
  ])
  const handleAdd = () => {
    setTasks([
      ...tasks,
      {
        id: uuidv4(),
        goal: true,
        hours: 0.25,
        classfication: '',
        detail: '',
        note: '',
      },
    ])
  }
  const handleDelete = (id) => {
    const newTasks = tasks.filter((row) => row.id !== id)
    setTasks(newTasks)
  }
  const handleReset = () => {
    setTasks([])
  }

  return (
    <Layout title="Submit Report">
      <Button variant="contained" onClick={handleAdd}>
        add task
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Within the goal</TableCell>
              <TableCell align="center">hours</TableCell>
              <TableCell align="center">classification</TableCell>
              <TableCell align="center">detail</TableCell>
              <TableCell align="center">note</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TaskItem
                task={task}
                key={task.id}
                onDelete={() => {
                  handleDelete(task.id)
                }}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.buttons}>
        <Button
          variant="contained"
          color="secondary"
          disableElevation
          className={classes.button}
          onClick={handleReset}
        >
          Reset All
        </Button>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          className={classes.button}
        >
          Submit
        </Button>
      </div>
    </Layout>
  )
}
export default Submit
