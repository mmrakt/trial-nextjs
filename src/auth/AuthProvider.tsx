import React from 'react'
import { fbAuth, fbDb } from '../../functions/firebase'

interface IAuthContext {
    signinAccount:
        | {
              userId: string
              userName: string
              email: string
              profile: string
          }
        | null
        | undefined
}
const AuthContext = React.createContext<IAuthContext>({
    signinAccount: undefined,
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
                        setSigninAccount(doc.data())
                        localStorage.setItem(
                            'signinAccount',
                            JSON.stringify({
                                userName: doc.data().userName,
                                profile: doc.data().profile,
                            })
                        )
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
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}
export { AuthContext, AuthProvider }
