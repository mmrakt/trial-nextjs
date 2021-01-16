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
                            <h1 className="leading-tight font-semibold text-3xl">
                                {signinAccount.userName}
                            </h1>
                            <p className="text-grey-500">
                                @{signinAccount.userId}
                            </p>
                        </div>
                        <button>
                            <Link href="/settings">設定</Link>
                        </button>
                    </div>
                    <ul>
                        <li>
                            <Link href="/account/reset_email">
                                <a>メールアドレスの変更はこちら</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/account/delete">
                                <a>アカウントの削除はこちら</a>
                            </Link>
                        </li>
                    </ul>
                </Layout>
            )}
        </ProtectedRoute>
    )
}
export default Mypage
