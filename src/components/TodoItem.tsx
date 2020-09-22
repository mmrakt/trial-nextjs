import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Divider from '@material-ui/core/Divider'
import DeleteIcon from '@material-ui/icons/Delete'

type Props = {
  todo: {
    key: string
    text: string
    done: boolean
  }
  onCheck: (checked: any) => void
  onDelete: (key: string) => void
}
function TodoItem(props: Props): any {
  const { todo, onCheck, onDelete } = props
  const handleChange = () => {
    onCheck(todo)
  }
  const handleDelete = () => {
    onDelete(todo.key)
  }
  return (
    <>
      <ListItem button>
        <Checkbox
          data-testid="checkbox"
          checked={todo.done}
          onChange={handleChange}
        ></Checkbox>
        <ListItemText
          primary={todo.text}
          style={
            todo.done
              ? { textDecoration: 'line-through', color: 'grey' }
              : { textDecoration: 'none' }
          }
        ></ListItemText>
        <DeleteIcon onClick={handleDelete}></DeleteIcon>
      </ListItem>
      <Divider></Divider>
    </>
  )
}

export default TodoItem
