import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import DeleteIcon from "@material-ui/icons/Delete";

function TodoItem({ todo, onCheck, onDelete }) {
  const handleChange = () => {
    onCheck(todo);
  };
  const handleDelete = () => {
    onDelete(todo.key);
  };
  const lineThrough = {
    textDecoration: "line-through",
  };
  return (
    <>
      <ListItem button>
        <Checkbox checked={todo.done} onChange={handleChange}></Checkbox>
        <ListItemText
          primary={todo.text}
          style={
            todo.done
              ? { textDecoration: "line-through", color: "grey" }
              : { textDecoration: "none" }
          }
        ></ListItemText>
        <DeleteIcon onClick={handleDelete}></DeleteIcon>
      </ListItem>
      <Divider></Divider>
    </>
  );
}

export default TodoItem;
