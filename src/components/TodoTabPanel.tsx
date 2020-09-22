import React from 'react'
import TodoItem from './TodoItem'
import List from '@material-ui/core/List'

type Props = {
  filter: string
  todos: any[]
  status: string
  onChange: any
  onDelete: any
}
function TodoTabPanel(props: Props): any {
  const { filter, todos, status, onChange, onDelete } = props
  const displayTodos = todos.filter((todo) => {
    if (todo) {
      switch (filter) {
        case 'ALL':
          return true
        case 'TODO':
          return !todo.done
        case 'DONE':
          return todo.done
      }
    }
  })
  const handleCheck = (checked) => {
    onChange(checked)
  }
  const handleDelete = (key) => {
    onDelete(key)
  }

  return (
    <List component="nav" hidden={filter !== status} role="tabpanel">
      {displayTodos.map((todo) => (
        <TodoItem
          data-testid="todoItem"
          key={todo.key}
          todo={todo}
          onCheck={handleCheck}
          onDelete={handleDelete}
        ></TodoItem>
      ))}
    </List>
  )
}

export default TodoTabPanel
