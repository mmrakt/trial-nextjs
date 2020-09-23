import React from 'react'
import TodoItem from './TodoItem'
import List from '@material-ui/core/List'
import { useSelector } from 'react-redux'
import { rootState } from '../rootReducer'

function TodoTabPanel(props: any): any {
  const { status } = props
  const { todos, filter } = useSelector((state: rootState) => state.todos)
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

  return (
    <List component="nav" hidden={filter !== status} role="tabpanel">
      {displayTodos.map((todo) => (
        <TodoItem data-testid="todoItem" key={todo.key} todo={todo}></TodoItem>
      ))}
    </List>
  )
}

export default TodoTabPanel
