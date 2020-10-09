import React from 'react'
import styles from './index.module.css'

type ParagraphProps = {
  p: string
}
const Paragraph = (props: ParagraphProps) => {
  const { p } = props
  return <div className={styles.paragraph}>{p}</div>
}

export default Paragraph
