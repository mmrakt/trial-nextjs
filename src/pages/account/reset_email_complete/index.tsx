import React from 'react'
import Layout from '../../../components/layout'
import { AuthContext } from '../../../auth/AuthProvider'
import { CssBaseline, Container, Typography } from '@material-ui/core'

const ResetEmail = (): React.ReactElement => {
    const { signinAccount } = React.useContext(AuthContext)
    //checkAuthenticated()
    return (
        <Layout title="確認用メール送信完了">
            {signinAccount && (
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <p>アカウント情報を変更しました。</p>
                    <p>確認用メールのURLより本人確認をおこなってください。</p>
                    <Typography component="p" color="inherit" noWrap>
                        {signinAccount.email}
                    </Typography>
                </Container>
            )}
        </Layout>
    )
}
export default ResetEmail
