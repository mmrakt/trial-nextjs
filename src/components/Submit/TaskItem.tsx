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
    target: boolean
    hours: number
    category: number
    ticketTitle: string
    note: string
  }
  onDelete: () => void
  onCheck: () => void
  onChangeHours: (hours: number) => void
  onChangeCategory: (category: number) => void
  onChangeProject: (project: string) => void
  onChangeTicketTitle: (ticketTitle: string) => void
  onChangeNote: (note: string) => void
}
const TaskItem = (props: Props) => {
  const {
    task,
    onDelete,
    onCheck,
    onChangeHours,
    onChangeCategory,
    onChangeProject,
    onChangeTicketTitle,
    onChangeNote,
  } = props
  // const [target, setTarget] = useState(false)
  // const [hours, setHours] = useState(0.25)
  // const [category, setcategory] = useState('')
  // const [ticketTitle, setticketTitle] = useState(task.ticketTitle)
  // const [note, setNote] = useState('')
  const customColumnStyle = { width: 12, backgroundColor: 'yellow' }

  const handleChangeHours = (e) => {
    onChangeHours(e.target.value)
  }
  const handleChangeCategory = (e) => {
    onChangeCategory(e.target.value)
  }
  const handleChangeProject = (e) => {
    onChangeProject(e.target.value)
  }
  const handleChangeTicketTitle = (e) => {
    onChangeTicketTitle(e.target.value)
  }
  const handleChangeNote = (e) => {
    onChangeNote(e.target.value)
  }
  return (
    <>
      <TableRow>
        <TableCell component="th" scope="row" align="center">
          <Checkbox id="target" onChange={onCheck} />
        </TableCell>
        <TableCell align="center">
          <Select
            labelId="demo-simple-select-label"
            id="hours"
            onChange={handleChangeHours}
          >
            <MenuItem value={1}>0.25h</MenuItem>
            <MenuItem value={2}>0.5h</MenuItem>
            <MenuItem value={3}>0.75h</MenuItem>
            <MenuItem value={4}>1h</MenuItem>
            <MenuItem value={5}>1.5h</MenuItem>
            <MenuItem value={6}>2h</MenuItem>
            <MenuItem value={7}>2.5h</MenuItem>
            <MenuItem value={8}>3h</MenuItem>
            <MenuItem value={9}>3.5h</MenuItem>
            <MenuItem value={10}>4h</MenuItem>
            <MenuItem value={11}>4.5h</MenuItem>
            <MenuItem value={12}>5h</MenuItem>
          </Select>
        </TableCell>
        <TableCell align="center">
          <Select id="category" onChange={handleChangeCategory}>
            <MenuItem value={1}>会議</MenuItem>
            <MenuItem value={2}>資料作成</MenuItem>
            <MenuItem value={3}>コーディング</MenuItem>
            <MenuItem value={4}>テスト</MenuItem>
            <MenuItem value={5}>レビュー</MenuItem>
            <MenuItem value={6}>その他</MenuItem>
          </Select>
        </TableCell>
        <TableCell align="center">
          <Select id="project" onChange={handleChangeProject}>
            <MenuItem value={'MS新基盤'}>MS新基盤</MenuItem>
            <MenuItem value={'MSエンハンス'}>MSエンハンス</MenuItem>
            <MenuItem value={'新卒研修'}>新卒研修</MenuItem>
            <MenuItem value={'その他'}>その他</MenuItem>
          </Select>
        </TableCell>
        <TableCell align="center">
          <TextField id="ticketTitle" onChange={handleChangeTicketTitle} />
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
