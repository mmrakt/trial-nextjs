import React from "react";
import Input from "./TodoInput";
import Filter from "./TodoFilter";
import TodoItem from "./TodoItem";

function Todo() {
  const [todos, setTodos] = React.useState([]);
  const [filter, setFilter] = React.useState("ALL");

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
  const displayTodos = todos.filter((todo) => {
    if (filter === "ALL") return true;
    if (filter === "TODO") return !todo.done;
    if (filter === "DONE") return todo.done;
  });

  return (
    <div>
      <div>React Todo</div>
      {/* onAdd: リスト内に要素が追加された時 */}
      <Input onAdd={handleAdd}></Input>
      <Filter onChange={handleFilterChange} value={filter}></Filter>
      {displayTodos.map((todo) => (
        <TodoItem key={todo.text} todo={todo} onCheck={handleCheck}></TodoItem>
      ))}
    </div>
  );
}

export default Todo;
