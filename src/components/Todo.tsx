import React from 'react'
import Input from './TodoInput'
import Filter from './TodoFilter'
import TodoTabPanel from './TodoTabPanel'

function Todo(): any {
  const statuses = ['ALL', 'TODO', 'DONE']
  return (
    <div>
      <div>React Todo</div>
      <Input />
      <Filter />
      {statuses.map((status, index) => (
        <TodoTabPanel key={index} status={status} />
      ))}
    </div>
  )
}

export default Todo
