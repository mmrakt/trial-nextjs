import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { db } from '../../functions/firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import Layout from '../components/Layout'
import { Container } from '@material-ui/core'

function signin() {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<firebase.firestore.DocumentData[]>([])
  const [myAccount, setMyAccount] = useState<firebase.User>()

  const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
  }

  useEffect(() => {
    //usersコレクションを返却
    const searchUsers = async () => {
      // Firestoreのコレクションを指定してデータ取得
      const res = await db.collection('users').get()
      if (res.empty) return []
      const userList = []
      // DocumentData型にはmapメソッドが定義されていないため、forEachのループでデータを加工
      res.forEach((doc) => {
        userList.push(doc.data())
      })
      setUsers(userList)
    }

    firebase.auth().onAuthStateChanged((user) => {
      setLoading(false)
      if (!user) return
      if (user.email) return
      setMyAccount(user)
      searchUsers()
    })
  }, [])

  return (
    <Layout>
      <Container>
        <header>
          {loading ? (
            <p>LOADING.....</p>
          ) : !myAccount ? (
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

export default signin
