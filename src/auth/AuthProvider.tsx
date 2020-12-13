import React from 'react'
import { fbAuth, fbDb } from '../../functions/firebase'

interface IAuthContext {
    currentUser:
        | {
              userId: string
              userName: string
              email: string
          }
        | null
        | undefined
}
const AuthContext = React.createContext<IAuthContext>({
    currentUser: undefined,
})

type IProps = {
    children?: React.ReactNode
}

const AuthProvider = (props: IProps): React.ReactElement => {
    const [currentUser, setCurrentUser] = React.useState(null)

    React.useEffect(() => {
        fbAuth.onAuthStateChanged((user) => {
            if (user) {
                fbDb.collection('users')
                    .doc(user.uid)
                    .get()
                    .then((doc) => {
                        setCurrentUser(doc)
                    })
            }
        })
    }, [])

    return (
        <AuthContext.Provider value={{ currentUser: currentUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}
export { AuthContext, AuthProvider }
