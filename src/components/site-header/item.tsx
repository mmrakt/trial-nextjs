import React from 'react'
import { useClassName } from '@/utils'
import styles from './index.module.css'

type Props = {
  className?: string
  children?: React.ReactElement
}

export const SiteHeaderItem = (props: Props): React.ReactElement => {
  const { className, children } = props
  const _className = useClassName(styles.item, className)

  return <div className={_className}>{children}</div>
}
