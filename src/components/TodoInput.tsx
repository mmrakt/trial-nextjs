import React from "react";
import { TextField } from "@material-ui/core";

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
    <div>
      <TextField
        type="text"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      ></TextField>
    </div>
  );
}

export default Input;
