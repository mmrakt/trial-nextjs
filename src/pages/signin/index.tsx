import React from 'react'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import Layout from '../../components/layout'
import { Container } from '@material-ui/core'
import { AuthContext, checkUnAuthenticated } from '../../auth/AuthProvider'

const Signin = (): React.ReactElement => {
    checkUnAuthenticated()
    const { signinAccount } = React.useContext(AuthContext)
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
                </header>
            </Container>
        </Layout>
    )
}

export default Signin
