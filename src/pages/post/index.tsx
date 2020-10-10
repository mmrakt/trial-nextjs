import React from 'react'
import styles from './index.module.css'
import { Editor } from '@/components/editor'
import { SiteHeader, SiteHeaderItem } from '@/components/site-header'
import { Button } from '@/components/button'

const PostPage = (): React.ReactElement => {
  const [subject, setSubject] = React.useState('')
  const [content, setContent] = React.useState('')

  const handleChangeSubject = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setSubject(ev.target.value)
    },
    []
  )
  const siteHeaderRight = (
    <>
      <SiteHeaderItem>
        <Button type="submit">
          <span>投稿する</span>
        </Button>
      </SiteHeaderItem>
      <SiteHeaderItem>
        <img className={styles.userIcon} src="/profile.png" />
      </SiteHeaderItem>
    </>
  )

  return (
    <>
      <SiteHeader right={siteHeaderRight} />
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
        <footer className={styles.footer}>
          <Button className={styles.submitButton}>投稿する</Button>
        </footer>
      </div>
    </>
  )
}

export default PostPage
