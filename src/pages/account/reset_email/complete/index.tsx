import React from 'react'
import Layout from '../../../../components/layout'
import { AuthContext } from '../../../../auth/AuthProvider'
import { CssBaseline, Container, Typography } from '@material-ui/core'
import ProtectedRoute from '../../../../auth/ProtectedRoute'

const Complete = (): React.ReactElement => {
    const { signinAccount } = React.useContext(AuthContext)
    return (
        <ProtectedRoute>
            <Layout title="確認用メール送信完了">
                {signinAccount && (
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <p>アカウント情報を変更しました。</p>
                        <p>
                            確認用メールのURLより本人確認をおこなってください。
                        </p>
                        <Typography component="p" color="inherit" noWrap>
                            {signinAccount.email}
                        </Typography>
                    </Container>
                )}
            </Layout>
        </ProtectedRoute>
    )
}
export default Complete
