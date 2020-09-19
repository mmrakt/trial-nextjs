function TodoItem({ todo, onCheck }) {
  const handleChange = () => {
    onCheck(todo);
  };
  return (
    <label>
      <input type="checkbox" checked={todo.done} onChange={handleChange} />
      {todo.text}
    </label>
  );
}

export default TodoItem;
