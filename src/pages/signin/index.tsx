import React from 'react'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import Layout from '../../components/layout'
import { Container } from '@material-ui/core'
import { AuthContext } from '../../auth/AuthProvider'
import Link from 'next/link'

const Signin = (): React.ReactElement => {
    const { signinAccount } = React.useContext(AuthContext)
    console.log(signinAccount)
    const uiConfig = {
        signInFlow: 'popup',
        signInSuccessUrl: '/',
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
    }

    return (
        <Layout title="ログイン">
            <Container>
                <header>
                    <div>
                        <StyledFirebaseAuth
                            uiConfig={uiConfig}
                            firebaseAuth={firebase.auth()}
                        />
                    </div>
                    <Link href="/account/reset_password">
                        <a>パスワードをお忘れの方はこちら</a>
                    </Link>
                </header>
            </Container>
        </Layout>
    )
}

export default Signin
