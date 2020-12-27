import React, { useState } from 'react'
import {} from '@material-ui/core'
import Layout from '../../components/layout'
import { AuthContext } from '../../auth/AuthProvider'
import {
    Button,
    CssBaseline,
    TextField,
    Grid,
    makeStyles,
    Container,
} from '@material-ui/core'
import { fbDb, fbAuth, fbStorage } from '../../../functions/firebase'
import ReactCrop, { Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { formatDateTime } from '../../utils/date'
import Modal from 'react-modal'
import styled from 'styled-components'

const AvatarImg = styled.img`
    border-radius: 50%;
    height: 100px;
    width: 100px;
`

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

const useStyles = makeStyles((theme) => ({
    paper: {},
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

const Settings = (): React.ReactElement => {
    const classes = useStyles()
    const { signinAccount } = React.useContext(AuthContext)
    const [editedUserName, setEditedUserName] = useState('')
    const [editedProfile, setEditedProfile] = useState('')
    const [src, setSrc] = useState<any>(null)
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
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

    React.useEffect(() => {
        //NOTE: https://stackoverflow.com/questions/52474208/react-localstorage-is-not-defined-error-showing
        if (typeof window !== 'undefined') {
            setEditedUserName(
                JSON.parse(localStorage.getItem('signinAccount'))['userName']
            )
            setEditedProfile(
                JSON.parse(localStorage.getItem('signinAccount'))['profile']
            )
        }
    }, [])

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader()
            reader.addEventListener('load', () => {
                setSrc(reader.result)
                setModalIsOpen(true)
            })
            reader.readAsDataURL(e.target.files[0])
        }
    }
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
                .child(
                    'images/' +
                        formatDateTime(new Date()) +
                        signinAccount.userId
                )
                .put(croppedBlob)
                .then((snapshot) => {
                    snapshot.ref
                        .getDownloadURL()
                        .then(async (avatarURL: string) => {
                            await updateAccountAvatarOnFbDB(avatarURL)
                            await updatePhotoURLOnFbAuth(avatarURL)
                            setModalIsOpen(false)
                            // TODO: DOMの更新をかけてアバターを変更する方法を探る
                            location.href = '/settings'
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
    }
    const updatePhotoURLOnFbAuth = (avatarURL: string) => {
        fbAuth.currentUser.updateProfile({
            photoURL: avatarURL,
        })
    }

    const onUpdateAccountOnFbDB = async (): Promise<void> => {
        await fbDb
            .collection('users')
            .doc(fbAuth.currentUser.uid)
            .set(
                {
                    userName: editedUserName,
                    profile: editedProfile,
                },
                { merge: true }
            )
            .then(() => {
                updateAccountOnLocalStorage()
            })
            .catch((error) => {
                console.log(error.message)
            })
        location.href = `/${signinAccount.userId}`
    }

    const updateAccountOnLocalStorage = () => {
        localStorage.setItem(
            'signinAccount',
            JSON.stringify({
                userName: editedUserName,
                profile: editedProfile,
            })
        )
    }
    return (
        <Layout title="アカウント設定">
            {signinAccount && (
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        {signinAccount.avatarURL ? (
                            <AvatarImg src={signinAccount.avatarURL} />
                        ) : (
                            <AvatarImg src="/profile.png" />
                        )}
                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={onSelectFile}
                            />
                        </div>
                        {src && (
                            <Modal
                                isOpen={modalIsOpen}
                                style={modalStyle}
                                onRequestClose={() => setModalIsOpen(false)}
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
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            setModalIsOpen(false)
                                        }}
                                    >
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
                        )}
                        <form className={classes.form} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="userName"
                                        label="ユーザー名"
                                        name="diplayName"
                                        value={editedUserName}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                            setEditedUserName(e.target.value)
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="profile"
                                        label="プロフィール"
                                        name="profile"
                                        value={editedProfile}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                            setEditedProfile(e.target.value)
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={onUpdateAccountOnFbDB}
                            >
                                更新
                            </Button>
                        </form>
                    </div>
                </Container>
            )}
        </Layout>
    )
}
export default Settings
