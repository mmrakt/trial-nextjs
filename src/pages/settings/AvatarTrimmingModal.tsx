import React, { useState } from 'react'
import {} from '@material-ui/core'
import { AuthContext } from '../../auth/AuthProvider'
import { Button } from '@material-ui/core'
import { fbDb, fbAuth, fbStorage } from '../../../functions/firebase'
import ReactCrop, { Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { formatDateTime } from '../../utils/date'
import Modal from 'react-modal'
import { defaultCrop, imageCropped } from '../../utils/crop'

const modalStyle = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.85)',
    },
    content: {
        position: 'absolute',
        top: '5rem',
        left: '5rem',
        right: '5rem',
        bottom: '5rem',
        backgroundColor: 'white',
        padding: '1.5rem',
    },
}

type IProps = {
    src: any
    modalIsOpen: boolean
    onRequestClose: () => void
}

const AvatalTrimmingModal = (props: IProps): React.ReactElement => {
    const { signinAccount, setSigninAccount } = React.useContext(AuthContext)
    const { src, modalIsOpen, onRequestClose } = props
    const [crop, setCrop] = useState<Crop>(defaultCrop)
    const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null)
    const [croppedImageUrl, setCroppedImageUrl] = useState<string>('')
    const [croppedBlob, setCroppedBlob] = useState<Blob>(null)

    const onImageLoaded = (image: HTMLImageElement) => {
        setImageRef(image)
    }
    const onCropChange = (crop: Crop) => {
        setCrop(crop)
    }
    const onCropComplete = (crop: Crop) => {
        const canvas = imageCropped(imageRef, crop)
        if (canvas !== undefined) {
            canvas.toBlob(
                (blob) => {
                    window.URL.revokeObjectURL(croppedImageUrl)
                    setCroppedImageUrl(window.URL.createObjectURL(blob))
                    setCroppedBlob(blob)
                },
                'image/jpeg',
                0.95
            )
        }
    }
    const onUploadAvatar = (): void => {
        try {
            fbStorage
                .ref()
                .child('images/' + formatDateTime(new Date()))
                .put(croppedBlob)
                .then((snapshot) => {
                    snapshot.ref.getDownloadURL().then((avatarURL: string) => {
                        updateAccountAvatarOnFbDB(avatarURL)
                        updateAuthContext(avatarURL)
                        updatePhotoURLOnFbAuth(avatarURL)
                        onRequestClose()
                    })
                })
        } catch (error) {
            console.log(error)
        }
    }
    const updateAccountAvatarOnFbDB = (avatarURL: string) => {
        fbDb.collection('users').doc(fbAuth.currentUser.uid).set(
            {
                avatarURL,
            },
            {
                merge: true,
            }
        )
    }
    const updateAuthContext = (avatarURL: string): void => {
        setSigninAccount({
            userId: signinAccount.userId,
            userName: signinAccount.userName,
            email: signinAccount.email,
            profile: signinAccount.profile,
            avatarURL,
        })
    }
    const updatePhotoURLOnFbAuth = (avatarURL: string): void => {
        fbAuth.currentUser.updateProfile({
            photoURL: avatarURL,
        })
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            style={modalStyle}
            onRequestClose={onRequestClose}
            ariaHideApp={false}
        >
            <ReactCrop
                src={src}
                crop={crop}
                onImageLoaded={onImageLoaded}
                onComplete={onCropComplete}
                onChange={onCropChange}
                ruleOfThirds
            />
            <div>
                <Button variant="contained" onClick={onRequestClose}>
                    キャンセル
                </Button>
                {croppedImageUrl && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onUploadAvatar}
                    >
                        OK
                    </Button>
                )}
            </div>
        </Modal>
    )
}
export default AvatalTrimmingModal
