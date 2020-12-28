import React, { useState } from 'react'
import {} from '@material-ui/core'
import { AuthContext } from '../../auth/AuthProvider'
import { Button } from '@material-ui/core'
import { fbDb, fbAuth, fbStorage } from '../../../functions/firebase'
import ReactCrop, { Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { formatDateTime } from '../../utils/date'
import Modal from 'react-modal'

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
    const [crop, setCrop] = useState<Crop>({
        unit: '%',
        x: 0,
        y: 0,
        width: 50,
        height: 50,
        aspect: 1,
    })
    const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null)
    const [croppedImageUrl, setCroppedImageUrl] = useState<string>('')
    const [croppedBlob, setCroppedBlob] = useState<Blob>(null)

    const onImageLoaded = (image: HTMLImageElement) => {
        setImageRef(image)
    }
    const onCropChange = (crop: Crop) => {
        setCrop(crop)
    }
    const onCropComplete = async (crop: any) => {
        if (imageRef && crop.width && crop.height) {
            const canvas = document.createElement('canvas')
            const scaleX = imageRef.naturalWidth / imageRef.width
            const scaleY = imageRef.naturalHeight / imageRef.height
            canvas.width = crop.width
            canvas.height = crop.height
            const ctx = canvas.getContext('2d')
            if (ctx !== null) {
                ctx.drawImage(
                    imageRef,
                    crop.x * scaleX,
                    crop.y * scaleY,
                    crop.width * scaleX,
                    crop.height * scaleY,
                    0,
                    0,
                    crop.width,
                    crop.height
                )
            }
            canvas.toBlob(
                async (blob) => {
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
                    snapshot.ref
                        .getDownloadURL()
                        .then(async (avatarURL: string) => {
                            await updateAccountAvatarOnFbDB(avatarURL)
                            await updatePhotoURLOnFbAuth(avatarURL)
                            onRequestClose()
                        })
                })
        } catch (error) {
            console.log(error)
        }
    }
    const updateAccountAvatarOnFbDB = (avatarURL: string) => {
        fbDb.collection('users')
            .doc(fbAuth.currentUser.uid)
            .set(
                {
                    avatarURL,
                },
                {
                    merge: true,
                }
            )
            .catch((error) => {
                console.log(error)
            })
        setSigninAccount({
            userId: signinAccount.userId,
            userName: signinAccount.userName,
            email: signinAccount.email,
            profile: signinAccount.profile,
            avatarURL,
        })
    }
    const updatePhotoURLOnFbAuth = (avatarURL: string) => {
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
