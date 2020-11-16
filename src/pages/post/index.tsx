import React from 'react'
import styles from './index.module.css'
import { Editor } from '@/components/editor'
import { SiteHeader, SiteHeaderItem } from '@/components/site-header'
import { Button } from '@/components/button'
import { UserIcon } from '@/components/user-icon'
import { usePostArticleMutation } from '@/generated/graphql'
import { useRouter } from 'next/router'

const PostPage = (): React.ReactElement => {
    const [subject, setSubject] = React.useState('')
    const [content, setContent] = React.useState('')
    const [postArticle] = usePostArticleMutation()
    const [postDisabled, setPostDisabled] = React.useState(false)
    const router = useRouter()

    const handleChangeSubject = React.useCallback(
        (ev: React.ChangeEvent<HTMLInputElement>) => {
            setSubject(ev.target.value)
        },
        []
    )
    const handlePost = React.useCallback(
        async (ev: React.FormEvent<HTMLFormElement>) => {
            ev.preventDefault()
            if (!content || !subject || postDisabled) {
                return
            }
            setPostDisabled(true)
            const { data } = await postArticle({
                variables: {
                    authorId: '39284047-84c6-46f0-b019-405e18ffaf28',
                    content,
                    subject,
                    publishedAt: 'now()',
                },
            })
            if (data && data.insert_articles_one) {
                const articleId = data.insert_articles_one.id
                router.push(`/hoge/${articleId}`)
                setPostDisabled(false)
            } else {
                console.log('POST anknown state', data)
            }
        },
        [content, subject, postDisabled, postArticle, router]
    )
    const siteHeaderRight = (
        <>
            <SiteHeaderItem>
                <form onSubmit={handlePost}>
                    <Button type="submit">
                        <span>投稿する</span>
                    </Button>
                </form>
            </SiteHeaderItem>
            <SiteHeaderItem>
                <UserIcon src="/profile.png" />
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
            </div>
        </>
    )
}

export default PostPage
