import React from "react";
import Input from "./TodoInput";
import Filter from "./TodoFilter";
import TodoTabPanel from "./TodoTabPanel";

function Todo() {
  const [todos, setTodos] = React.useState([]);
  const [filter, setFilter] = React.useState("TODO");
  const statuses = ["ALL", "TODO", "DONE"];
  const getKey = () => Math.random().toString(32).substring(2);

  const handleAdd = (text) => {
    setTodos([...todos, { key: getKey(), text, done: false }]);
  };
  const handleFilterChange = (value) => setFilter(value);
  const handleCheck = (checked) => {
    const newTodos = todos.map((todo) => {
      if (todo.key === checked.key) {
        todo.done = !todo.done;
      }
      return todo;
    });
    setTodos(newTodos);
  };
  const handleDelete = (key) => {
    const newTodos = todos.map((todo) => {
      if (todo) {
        if (todo.key !== key) {
          return todo;
        }
      }
    });
    setTodos(newTodos);
  };
  return (
    <div>
      <div>React Todo</div>
      {/* onAdd: リスト内に要素が追加された時 */}
      <Input onAdd={handleAdd}></Input>
      <Filter onChange={handleFilterChange} value={filter}></Filter>
      {statuses.map((status, index) => (
        <TodoTabPanel
          key={index}
          status={status}
          filter={filter}
          hidden={filter !== status}
          todos={todos}
          onChange={handleCheck}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default Todo;
