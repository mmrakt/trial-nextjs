import React from 'react'
import autosize from 'autosize'
import { useClassName } from '@/utils/index'

import styles from './index.module.css'

type Props = {
  value: string
  onEdit: (text: string) => void
  placeholder?: string
  className?: string
}

export const Editor = (props: Props): React.ReactElement => {
  const { className, placeholder, value, onEdit } = props
  const ref = React.useRef<HTMLTextAreaElement>(null)

  React.useEffect(() => {
    if (ref.current) {
      autosize(ref.current)
    }
  }, [])

  const handleChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
      onEdit(ev.target.value)
    },
    [onEdit]
  )
  const _className = useClassName(styles.editor, className)
  return (
    <textarea
      className={_className}
      placeholder={placeholder}
      ref={ref}
      onChange={handleChange}
      value={value}
    />
  )
}
