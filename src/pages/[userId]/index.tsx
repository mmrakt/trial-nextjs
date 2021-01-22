import React from 'react'
import {} from '@material-ui/core'
import Layout from '../../components/layout'
import { AuthContext } from '../../auth/AuthProvider'
import Link from 'next/link'
import ProtectedRoute from '../../auth/ProtectedRoute'

const Mypage = (): React.ReactElement => {
    const { signinAccount } = React.useContext(AuthContext)
    return (
        <ProtectedRoute>
            {signinAccount && (
                <Layout title="マイページ">
                    <div className="flex my-8 space-x-4 mx-auto itmes-center">
                        <div>
                            {signinAccount.avatarURL ? (
                                <img
                                    className="shadow-inner w-32 rounded-full"
                                    src={signinAccount.avatarURL}
                                    alt="アバター"
                                />
                            ) : (
                                <img
                                    className="shadow-inner w-32 rounded-full"
                                    src="avatar.png"
                                    alt="アバター"
                                />
                            )}
                        </div>
                        <div>
                            <h1 className="leading-tight font-semibold text-3xl my-2 mx-2">
                                {signinAccount.userName}
                            </h1>
                            <p className="text-grey-500 my-2 mx-2">
                                @{signinAccount.userId}
                            </p>
                            <p className="w-60 break-words my-2 mx-2">
                                {signinAccount.profile}
                            </p>
                        </div>
                        <Link href="/settings">
                            <a className="underline">プロフィール設定</a>
                        </Link>
                    </div>
                    <ul>
                        <li>
                            メールアドレスの変更は
                            <Link href="/account/reset_email">
                                <a className="underline">こちら</a>
                            </Link>
                        </li>
                        <li>
                            アカウントの削除は
                            <Link href="/account/delete">
                                <a className="underline">こちら</a>
                            </Link>
                        </li>
                    </ul>
                </Layout>
            )}
        </ProtectedRoute>
    )
}
export default Mypage
