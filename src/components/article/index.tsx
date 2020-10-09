import React from 'react'
import styles from './index.module.css'
import Paragraph from './paragraph'

type ArticleProps = {
  content: string
}

const Article = (props: ArticleProps): React.ReactElement => {
  const { content } = props
  return (
    <>
      {content.split('\n\n').map((p, i) => (
        <Paragraph p={p} key={i} />
      ))}
    </>
  )
}

export default Article
