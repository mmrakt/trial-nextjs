import React from 'react'
import {} from '@material-ui/core'
import Layout from '../../components/layout'
import { AuthContext, checkAuthenticated } from '../../auth/AuthProvider'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import Link from 'next/link'

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
    checkAuthenticated()
    return (
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
                    <div>
                        <Link href="/account/delete">
                            <a>アカウントの削除はこちら</a>
                        </Link>
                    </div>
                </div>
            )}
        </Layout>
    )
}
export default Mypage
