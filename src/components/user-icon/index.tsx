import React from 'react'
import styles from './index.module.css'

type Props = {
  src: string
}

export const UserIcon = (props: Props): React.ReactElement => {
  const { src } = props
  return <img src={src} className={styles.userIcon} />
}
