import React from 'react'
import {} from '@material-ui/core'
import { Menu, MenuItem, Button } from '@material-ui/core'
import Link from 'next/link'
import { AuthContext } from '../../auth/AuthProvider'
import { fbAuth } from 'functions/firebase'
import { createPortal } from 'react-dom'

const MenuList = (): React.ReactElement => {
    const { signinAccount } = React.useContext(AuthContext)
    const [isOpenModal, setIsOpenModal] = React.useState(null)
    const handleModalOpen = (e) => {
        setIsOpenModal(e.currentTarget)
    }
    const handleClose = () => {
        setIsOpenModal(null)
    }
    const handleSignout = React.useCallback(async () => {
        await fbAuth.signOut()
        location.href = '/'
    }, [])

    return (
        <>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleModalOpen}
            >
                {signinAccount && signinAccount.avatarURL ? (
                    <img
                        src={signinAccount.avatarURL}
                        alt="アバター画像"
                        className="rounded-full w-10"
                    />
                ) : (
                    <img
                        src="avatar.png"
                        alt="デフォルトのアバター画像"
                        className="rounded-full w-10"
                    />
                )}
            </Button>
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
