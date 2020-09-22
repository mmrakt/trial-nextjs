import React from 'react'
import { TextField } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

type Props = {
  onAdd: (text: string) => void
}
function Input(props: Props): any {
  const { onAdd } = props
  const [text, setText] = React.useState('')
  const handleChange = (e) => setText(e.target.value)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onAdd(text)
      setText('')
    }
  }
  return (
    <>
      <TextField
        data-testid="text"
        fullWidth
        type="text"
        value={text}
        placeholder="Add Todo"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      ></TextField>
      <AddIcon />
    </>
  )
}

export default Input
