import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import {
  Checkbox,
  TextField,
  TableRow,
  TableCell,
  Select,
  MenuItem,
} from '@material-ui/core'

type Props = {
  task: {
    id: string
    target: boolean
    hours: number
    category: number
    project: string
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
const TaskItem = (props: Props): React.ReactElement => {
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
          {/* TODO: 選択フォームの初期値の設定 */}
          <Checkbox id="target" onChange={onCheck} value={task.target} />
        </TableCell>
        <TableCell align="center">
          <Select
            labelId="demo-simple-select-label"
            id="hours"
            onChange={handleChangeHours}
            fullWidth
            value={task.hours}
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
          <Select
            id="category"
            onChange={handleChangeCategory}
            fullWidth
            value={task.category}
          >
            <MenuItem value={1}>会議</MenuItem>
            <MenuItem value={2}>資料作成</MenuItem>
            <MenuItem value={3}>コーディング</MenuItem>
            <MenuItem value={4}>テスト</MenuItem>
            <MenuItem value={5}>レビュー</MenuItem>
            <MenuItem value={6}>その他</MenuItem>
          </Select>
        </TableCell>
        <TableCell align="center">
          <Select
            id="project"
            onChange={handleChangeProject}
            fullWidth
            value={task.project}
          >
            <MenuItem value={'MS新基盤'}>MS新基盤</MenuItem>
            <MenuItem value={'MSエンハンス'}>MSエンハンス</MenuItem>
            <MenuItem value={'新卒研修'}>新卒研修</MenuItem>
            <MenuItem value={'その他'}>その他</MenuItem>
          </Select>
        </TableCell>
        <TableCell align="center">
          <TextField
            id="ticketTitle"
            onChange={handleChangeTicketTitle}
            placeholder="バグの調査"
            value={task.ticketTitle}
            fullWidth
          />
        </TableCell>
        <TableCell align="center">
          <TextField
            id="note"
            onChange={handleChangeNote}
            value={task.note}
            fullWidth
          />
        </TableCell>
        <TableCell align="center">
          <DeleteIcon onClick={onDelete} />
        </TableCell>
      </TableRow>
    </>
  )
}
export default TaskItem
