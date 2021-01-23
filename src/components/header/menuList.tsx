import React from 'react'
import {} from '@material-ui/core'
import { Menu, MenuItem } from '@material-ui/core'
import Link from 'next/link'
import { AuthContext } from '../../auth/AuthProvider'
import { fbAuth } from 'functions/firebase'
import Image from 'next/image'
import { useRouter } from 'next/router'

const MenuList = (): React.ReactElement => {
    const { signinAccount } = React.useContext(AuthContext)
    const [isOpenModal, setIsOpenModal] = React.useState(null)
    const router = useRouter()

    const handleModalOpen = (e) => {
        setIsOpenModal(e.currentTarget)
    }
    const handleClose = () => {
        setIsOpenModal(null)
    }
    const handleSignout = React.useCallback(async () => {
        await fbAuth.signOut()
        router.push('/')
    }, [])

    return (
        <>
            <Image
                src={
                    signinAccount && signinAccount.avatarURL
                        ? signinAccount.avatarURL
                        : '/avatar.png'
                }
                alt="アバター画像"
                width={50}
                height={50}
                className="rounded-full"
                onClick={handleModalOpen}
            />
            <Menu
                id="simple-menu"
                anchorEl={isOpenModal}
                keepMounted
                open={Boolean(isOpenModal)}
                onClose={handleClose}
            >
                {signinAccount ? (
                    // NOTE: Material-uiのコンポーネント内でfragmentを使うとエラーになる
                    <div>
                        <MenuItem onClick={handleClose}>
                            <Link href={`/${signinAccount.userId}`}>
                                <a>マイページ</a>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <a onClick={handleSignout}>ログアウト</a>
                        </MenuItem>
                    </div>
                ) : (
                    <div>
                        <MenuItem onClick={handleClose}>
                            <Link href="/signin">
                                <a>ログイン</a>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Link href="/signup">
                                <a>ユーザー登録</a>
                            </Link>
                        </MenuItem>
                    </div>
                )}
            </Menu>
        </>
    )
}

export default MenuList
