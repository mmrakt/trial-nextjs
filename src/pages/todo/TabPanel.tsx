import React from 'react'
//import TodoItem from './Item'
import List from '@material-ui/core/List'
import { useSelector } from 'react-redux'
import { rootState } from '../../rootReducer'

type Props = {
    status: string
}
function TodoTabPanel(props: Props): any {
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
            {/* {displayTodos.map((todo, index) => (
                // <TodoItem
                //     data-testid="todoItem"
                //     key={index}
                //     todo={todo}
                // ></TodoItem>
            ))} */}
        </List>
    )
}

export default TodoTabPanel
