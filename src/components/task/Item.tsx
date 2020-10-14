import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Divider from '@material-ui/core/Divider'
import DeleteIcon from '@material-ui/icons/Delete'
// import { useDispatch } from 'react-redux'
import { handleCheck, handleDelete } from '../../modules/todoModule'

type Props = {
  todo: {
    key: string
    text: string
    done: boolean
  }
  onCheck: () => void
  onDelete: (todo) => void
}
function TodoItem(props: Props): any {
  const { todo, onCheck, onDelete } = props

  return (
    <>
      <ListItem button>
        <Checkbox
          data-testid="checkbox"
          checked={todo.done}
          onChange={() => {
            onCheck
          }}
        ></Checkbox>
        <ListItemText
          primary={todo.text}
          style={
            todo.done
              ? { textDecoration: 'line-through', color: 'grey' }
              : { textDecoration: 'none' }
          }
        ></ListItemText>
        <DeleteIcon
          onClick={() => {
            onDelete(todo)
          }}
        ></DeleteIcon>
      </ListItem>
      <Divider></Divider>
    </>
  )
}

export default TodoItem
