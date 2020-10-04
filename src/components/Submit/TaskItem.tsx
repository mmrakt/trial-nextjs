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
} from '@material-ui/core'

type Props = {
  task: {
    id: string
    goal: boolean
    hours: number
    classfication: string
    detail: string
    note: string
  }
  onDelete: () => void
}
const TaskItem = (props: Props) => {
  const { task, onDelete } = props
  const [goal, setGoal] = useState(task.goal)
  const [hours, setHours] = useState(task.hours)
  const [classfication, setClassfication] = useState(task.classfication)
  const [detail, setDetail] = useState(task.detail)
  const [note, setNote] = useState(task.note)
  const customColumnStyle = { width: 12, backgroundColor: 'yellow' }

  const handleChangeGoal = (e) => {
    setGoal(e.target.value)
  }
  const handleChangeHours = (e) => {
    setHours(e.target.value)
  }
  const handleChangeClassfication = (e) => {
    setClassfication(e.target.value)
  }
  const handleChangeDetail = (e) => {
    setDetail(e.target.value)
  }
  const handleChangeNote = (e) => {
    setNote(e.target.value)
  }
  return (
    <>
      <TableRow>
        <TableCell component="th" scope="row" align="center">
          <Checkbox id="goal" onChange={handleChangeGoal} />
        </TableCell>
        <TableCell align="center">
          <Select
            labelId="demo-simple-select-label"
            id="hours"
            value={hours}
            onChange={handleChangeHours}
          >
            <MenuItem value={0.25}>0.25h</MenuItem>
            <MenuItem value={0.5}>0.5h</MenuItem>
            <MenuItem value={0.75}>0.75h</MenuItem>
            <MenuItem value={1}>1.0h</MenuItem>
            <MenuItem value={1.5}>1.5h</MenuItem>
            <MenuItem value={2}>2.0h</MenuItem>
          </Select>
        </TableCell>
        <TableCell align="center">
          <Select
            id="classfication"
            value={classfication}
            onChange={handleChangeClassfication}
          >
            <MenuItem value={'会議'}>会議</MenuItem>
            <MenuItem value={'資料作成'}>資料作成</MenuItem>
            <MenuItem value={'コーディング'}>コーディング</MenuItem>
            <MenuItem value={'テスト'}>テスト</MenuItem>
            <MenuItem value={'レビュー'}>レビュー</MenuItem>
            <MenuItem value={'その他'}>その他</MenuItem>
          </Select>
        </TableCell>
        <TableCell align="center">
          <TextField id="detail" onChange={handleChangeDetail} />
        </TableCell>
        <TableCell align="center">
          <TextField id="note" onChange={handleChangeNote} />
        </TableCell>
        <TableCell align="center">
          <DeleteIcon onClick={onDelete} />
        </TableCell>
      </TableRow>
    </>
  )
}
export default TaskItem
