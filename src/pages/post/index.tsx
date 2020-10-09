import React from 'react'
import { NextPage } from 'next'
import styles from './index.module.css'
import { Editor } from '@/components/editor'

const PostPage = (): React.ReactElement => {
  const [subject, setSubject] = React.useState('')
  const [content, setContent] = React.useState('')

  const handleChangeSubject = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setSubject(ev.target.value)
    },
    []
  )

  return (
    <div className={styles.editContent}>
      <input
        className={styles.subject}
        type="text"
        placeholder="タイトル"
        value={subject}
        onChange={handleChangeSubject}
      />
      <Editor
        className={styles.editor}
        placeholder="本文"
        value={content}
        onEdit={setContent}
      />
    </div>
  )
}

export default PostPage
