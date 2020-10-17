import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { makeStyles } from '@material-ui/core/styles'
import {
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
  Button,
} from '@material-ui/core'
import Layout from '../../components/Layout'
import TaskItem from '../../components/Submit/TaskItem'
import { usePostTaskMutation } from '@/generated/graphql'
import {
  usePostReportMutation,
  useGetReportDataQuery,
} from '@/generated/graphql'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableHead: {},
  buttons: {
    display: 'flex',
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(3),
    justifyContent: 'flex-end',
  },
}))

const Submit = (): React.ReactElement => {
  const classes = useStyles()
  const router = useRouter()
  const reportDate = router.query
  const [postTask] = usePostTaskMutation()
  const [postReport] = usePostReportMutation()
  const [tasks, setTasks] = useState([])

  const { data } = useGetReportDataQuery({
    variables: {
      dateText: reportDate.date as string,
    },
  })
  React.useEffect(() => {
    if (data) {
      if (data.reports.length) {
        const registerdTasks = [...data.reports[0].tasks]
        setTasks(registerdTasks)
      }
    }
  }, [data])

  const handleAddTask = () => {
    setTasks([
      ...tasks,
      {
        id: uuidv4(),
        target: false,
        hours: 1,
        category: 1,
        project: '',
        ticketTitle: '',
        note: '',
      },
    ])
  }

  const handleDeleteAllTask = (id) => {
    const newTasks = tasks.filter((row) => row.id !== id)
    setTasks(newTasks)
  }
  const handleReset = () => {
    setTasks([])
  }
  const handleCheck = (id) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          id: task.id,
          target: !task.target,
          hours: task.hours,
          category: task.category,
          project: task.project,
          ticketTitle: task.ticketTitle,
          note: task.note,
        }
      } else {
        return task
      }
    })
    setTasks(newTasks)
  }
  const handleChangeHours = (id, hours) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          id: task.id,
          target: task.target,
          hours: hours,
          category: task.category,
          project: task.project,
          ticketTitle: task.ticketTitle,
          note: task.note,
        }
      } else {
        return task
      }
    })
    setTasks(newTasks)
  }
  const handleChangeCategory = (id, category) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          id: task.id,
          target: task.target,
          hours: task.hours,
          category: category,
          project: task.project,
          ticketTitle: task.ticketTitle,
          note: task.note,
        }
      } else {
        return task
      }
    })
    setTasks(newTasks)
  }
  const handleChangeProject = (id, project) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          id: task.id,
          target: task.target,
          hours: task.hours,
          category: task.category,
          project: project,
          ticketTitle: task.ticketTitle,
          note: task.note,
        }
      } else {
        return task
      }
    })
    setTasks(newTasks)
  }
  const handleChangeticketTitle = (id, ticketTitle) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          id: task.id,
          target: task.target,
          hours: task.hours,
          category: task.category,
          project: task.project,
          ticketTitle: ticketTitle,
          note: task.note,
        }
      } else {
        return task
      }
    })
    setTasks(newTasks)
  }
  const handleChangeNote = (id, note) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          id: task.id,
          target: task.target,
          hours: task.hours,
          category: task.category,
          project: task.project,
          ticketTitle: task.ticketTitle,
          note: note,
        }
      } else {
        return task
      }
    })
    setTasks(newTasks)
  }
  const handleSubmit = React.useCallback(
    async (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault()

      await postReport({
        variables: {
          dateText: reportDate as any,
          createdAt: 'now()',
          updatedAt: null,
        },
      })
      tasks.forEach(async (task) => {
        const { data } = await postTask({
          variables: {
            target: task.target,
            reportDateText: reportDate as any,
            hourId: task.hours,
            categoryId: task.category,
            project: task.project,
            ticketTitle: task.ticketTitle,
            note: task.note,
          },
        })
        if (data) {
          console.log('post unknown state', data)
        }
      })
    },
    [tasks, postReport, postTask]
  )

  return (
    <Layout title="提出フォーム">
      <Button
        variant="contained"
        onClick={handleAddTask}
        className={classes.button}
      >
        作業を追加
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell align="center">目標</TableCell>
              <TableCell align="center">時間(h)</TableCell>
              <TableCell align="center">カテゴリー</TableCell>
              <TableCell align="center">プロジェクト</TableCell>
              <TableCell align="center">作業概要</TableCell>
              <TableCell align="center">備考</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TaskItem
                task={task}
                key={task.id}
                onCheck={() => {
                  handleCheck(task.id)
                }}
                onChangeHours={(hours) => {
                  handleChangeHours(task.id, hours)
                }}
                onChangeCategory={(category) => {
                  handleChangeCategory(task.id, category)
                }}
                onChangeProject={(project) => {
                  handleChangeProject(task.id, project)
                }}
                onChangeTicketTitle={(ticketTitle) => {
                  handleChangeticketTitle(task.id, ticketTitle)
                }}
                onChangeNote={(note) => {
                  handleChangeNote(task.id, note)
                }}
                onDelete={() => {
                  handleDeleteAllTask(task.id)
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
          一括削除
        </Button>
        <form onSubmit={handleSubmit}>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            className={classes.button}
            type="submit"
          >
            提出する
          </Button>
        </form>
      </div>
    </Layout>
  )
}
export default Submit
