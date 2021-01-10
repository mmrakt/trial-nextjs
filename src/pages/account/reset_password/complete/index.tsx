import React from 'react'
import Layout from '../../../../components/layout'
import { CssBaseline, Container, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'

const ResetEmailComplete = (): React.ReactElement => {
    const router = useRouter()

    return (
        <Layout title="確認用メール送信">
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
export default ResetEmailComplete
