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
    userName: string | null
    setUserName: any
    profile: string | null
    setProfile: any
}
const AuthContext = React.createContext<IAuthContext>({
    signinAccount: undefined,
    userName: undefined,
    setUserName: undefined,
    profile: undefined,
    setProfile: undefined,
})

type IProps = {
    children?: React.ReactNode
}

const AuthProvider = (props: IProps): React.ReactElement => {
    const [signinAccount, setSigninAccount] = React.useState(null)
    const [userName, setUserName] = React.useState(null)
    const [profile, setProfile] = React.useState(null)

    React.useEffect(() => {
        fbAuth.onAuthStateChanged((user) => {
            if (user) {
                fbDb.collection('users')
                    .doc(user.uid)
                    .get()
                    .then((doc) => {
                        setSigninAccount(doc.data())
                        setUserName(doc.data().userName)
                        setProfile(doc.data().profile)
                    })
            }
        })
    }, [])

    return (
        <AuthContext.Provider
            value={{
                signinAccount: signinAccount,
                userName: userName,
                setUserName: setUserName,
                profile: profile,
                setProfile: setProfile,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}
export { AuthContext, AuthProvider }
