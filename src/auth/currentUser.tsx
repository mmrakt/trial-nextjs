import React from 'react'
import { fbAuth, fbDb } from '../../functions/firebase'

const currenUser = (): { key: string } => {
    const [currentUser, setCurrentUser] = React.useState(null)

    React.useEffect(() => {
        fbDb.collection('users')
            .doc(fbAuth.currentUser.uid)
            .get()
            .then((doc) => {
                setCurrentUser(doc)
            })
    }, [])

    return currentUser
}
export default currenUser
