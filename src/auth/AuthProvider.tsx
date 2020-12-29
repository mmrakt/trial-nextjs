import React from 'react'
import { fbAuth, fbDb } from '../../functions/firebase'
import { useRouter } from 'next/router'

interface IAuthContext {
    signinAccount:
        | {
              userId: string
              userName: string
              email: string
              profile: string
              avatarURL: string
          }
        | null
        | undefined
    setSigninAccount: React.Dispatch<any>
}
const AuthContext = React.createContext<IAuthContext>({
    signinAccount: undefined,
    setSigninAccount: undefined,
})

type IProps = {
    children?: React.ReactNode
}

const AuthProvider = (props: IProps): React.ReactElement => {
    const [signinAccount, setSigninAccount] = React.useState(null)

    //NOTE: usersコレクションから取得し、stateとlocalstorageそれぞれにセット
    React.useEffect(() => {
        fbAuth.onAuthStateChanged((user) => {
            if (user) {
                fbDb.collection('users')
                    .doc(user.uid)
                    .get()
                    .then((doc) => {
                        if (doc.data()) {
                            setSigninAccount(doc.data())
                            localStorage.setItem(
                                'signinAccount',
                                JSON.stringify({
                                    userName: doc.data().userName,
                                    profile: doc.data().profile,
                                })
                            )
                        }
                    })
                    .then(() => {
                        console.log('succuess!')
                    })
            }
        })
    }, [])

    return (
        <AuthContext.Provider
            value={{
                signinAccount: signinAccount,
                setSigninAccount: setSigninAccount,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

const checkAuthenticated = (): void => {
    if (typeof window !== 'undefined') {
        if (!fbAuth.currentUser) {
            useRouter().push('/signin')
        }
    }
}

const checkUnAuthenticated = (): void => {
    if (typeof window !== 'undefined') {
        if (fbAuth.currentUser) {
            useRouter().push('/')
        }
    }
}

export { AuthContext, AuthProvider, checkAuthenticated, checkUnAuthenticated }
