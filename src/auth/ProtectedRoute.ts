import React from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from './AuthProvider'

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
    const { signinAccount } = React.useContext(AuthContext)

    if (!signinAccount) {
        if (typeof window !== 'undefined') {
            useRouter().push('/signin')
        }
    }
    return children
}

export default ProtectedRoute
