import React from 'react'
import Layout from '../../../../components/layout'
import { CssBaseline, Container, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'

const UpdateEmailComplete = (): React.ReactElement => {
    const router = useRouter()

    return (
        <Layout title="パスワード再設定完了">
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <p>
                    指定のメールアドレスにパスワード再設定メールを送信しました。
                </p>
                <p>添付のリンクよりパスワードの再設定をおこなってください。</p>
                <Typography component="p" color="inherit" noWrap>
                    {router.query.email}
                </Typography>
            </Container>
        </Layout>
    )
}
export default UpdateEmailComplete
