import React from 'react'
import {} from '@material-ui/core'
import { MenuItem } from '@material-ui/core'
import Link from 'next/link'
import { AuthContext } from '../../auth/AuthProvider'
import { fbAuth } from 'functions/firebase'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Modal from '../Modal'

const MenuList = (): React.ReactElement => {
    const { signinAccount } = React.useContext(AuthContext)
    const [isOpenModal, toggleModal] = React.useState(null)
    const router = useRouter()

    const handleModalOpen = (e) => {
        toggleModal(e.currentTarget)
    }
    const handleModalClose = () => {
        toggleModal(null)
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
            <Modal isOpenModal={isOpenModal} toggleModal={toggleModal}>
                {signinAccount ? (
                    // NOTE: Material-uiのコンポーネント内でfragmentを使うとエラーになる
                    <div>
                        <MenuItem onClick={handleModalClose}>
                            <Link href={`/${signinAccount.userId}`}>
                                <a>マイページ</a>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleModalClose}>
                            <a onClick={handleSignout}>ログアウト</a>
                        </MenuItem>
                    </div>
                ) : (
                    <div>
                        <MenuItem onClick={handleModalClose}>
                            <Link href="/signin">
                                <a>ログイン</a>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleModalClose}>
                            <Link href="/signup">
                                <a>ユーザー登録</a>
                            </Link>
                        </MenuItem>
                    </div>
                )}
            </Modal>
        </>
    )
}

export default MenuList
