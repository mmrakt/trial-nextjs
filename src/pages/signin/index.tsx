import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { fbDb, fbAuth } from '../../../functions/firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import Layout from '../../components/Layout'
import { Container } from '@material-ui/core'

const Signin = () => {
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState<firebase.firestore.DocumentData[]>([])
    const [currentUser, setCurrentUser] = useState<firebase.User>()

    const uiConfig = {
        signInFlow: 'popup',
        signInSuccessUrl: '/',
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
    }

    useEffect(() => {
        const searchUsers = async () => {
            const res = await fbDb.collection('users').get()
            if (res.empty) return []
            const userList = []
            res.forEach((doc) => {
                userList.push(doc.data())
            })
            setUsers(userList)
        }

        firebase.auth().onAuthStateChanged((user) => {
            setLoading(false)
            if (!user) return
            if (user.email) return
            setCurrentUser(user)
            searchUsers()
        })
    }, [])

    return (
        <Layout title="Signin">
            <Container>
                <header>
                    {loading ? (
                        <p>LOADING.....</p>
                    ) : !currentUser ? (
                        <p>
                            <StyledFirebaseAuth
                                uiConfig={uiConfig}
                                firebaseAuth={firebase.auth()}
                            />
                        </p>
                    ) : (
                        users.map((user, index) => {
                            return <p key={index}> {user.name}</p>
                        })
                    )}
                </header>
            </Container>
        </Layout>
    )
}

export default Signin
