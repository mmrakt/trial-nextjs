import React from "react";
import { TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

function Input({ onAdd }) {
  const [text, setText] = React.useState("");
  const handleChange = (e) => setText(e.target.value);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onAdd(text);
      setText("");
    }
  };
  return (
    <>
      <TextField
        fullWidth
        type="text"
        value={text}
        placeholder="Add Todo"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      ></TextField>
      <AddIcon />
    </>
  );
}

export default Input;
