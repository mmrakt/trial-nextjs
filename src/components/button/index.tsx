import React from 'react'
import { useClassName } from '@/utils'

import styles from './index.module.css'

type Props = React.ComponentPropsWithRef<'button'>

export const Button = (props: Props) => {
  const { className, children, ...rest } = props
  const _className = useClassName(styles.button, className)

  return (
    <button className={_className} {...rest}>
      {children}
    </button>
  )
}
