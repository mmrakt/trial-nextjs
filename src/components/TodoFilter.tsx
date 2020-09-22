import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

type Props = {
  value: string
  onChange: (value: string) => void
}
function Filter(props: Props): any {
  const { value, onChange } = props
  const handleChange = (event, newValue) => {
    onChange(newValue)
  }
  return (
    <>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="ALL" value="ALL" />
        <Tab label="TODO" value="TODO" />
        <Tab label="DONE" value="DONE" />
      </Tabs>
    </>
  )
}

export default Filter
