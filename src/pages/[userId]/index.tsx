import React from 'react'
import {} from '@material-ui/core'
import Layout from '../../components/layout'
import { AuthContext } from '../../auth/AuthProvider'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import Link from 'next/link'
import ProtectedRoute from '../../auth/ProtectedRoute'

const AvatarImg = styled.img`
    border-radius: 50%;
    height: 100px;
    widht: 100px;
`
const FlexContainer = styled.div`
    display: flex;
    padding: 0 20px;
    .flexItem {
        margin-left: auto;
        margin-right: auto;
    }
`

const Mypage = (): React.ReactElement => {
    const { signinAccount } = React.useContext(AuthContext)
    //checkAuthenticated()
    return (
        <ProtectedRoute>
            <Layout title="マイページ">
                {signinAccount && (
                    <div>
                        <FlexContainer>
                            <p className="flexItem">
                                {signinAccount.avatarURL ? (
                                    <AvatarImg src={signinAccount.avatarURL} />
                                ) : (
                                    <AvatarImg src="/profile.png" />
                                )}
                            </p>
                            <div className="flexItem">
                                <Typography variant="h5" component="h2">
                                    {signinAccount.userName}
                                </Typography>
                                <Typography
                                    gutterBottom
                                    variant="body2"
                                    component="p"
                                >
                                    @{signinAccount.userId}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {signinAccount.profile}
                                </Typography>
                            </div>
                            <div className="flexItem">
                                <button>
                                    <Link href="/settings">設定</Link>
                                </button>
                            </div>
                        </FlexContainer>
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
                    </div>
                )}
            </Layout>
        </ProtectedRoute>
    )
}
export default Mypage
