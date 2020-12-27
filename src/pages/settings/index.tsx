import React, { useState } from 'react'
import {} from '@material-ui/core'
import Layout from '../../components/layout'
import { AuthContext } from '../../auth/AuthProvider'
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Grid,
    makeStyles,
    Container,
} from '@material-ui/core'
import { fbDb, fbAuth, fbStorage } from '../../../functions/firebase'
import ReactCrop, { Crop } from 'react-image-crop'
import { formatDateTime } from '../../utils/date'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
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

    const [src, setSrc] = useState(null)
    const [crop, setCrop] = useState<Crop>({
        unit: '%',
        x: 0,
        y: 0,
        width: 50,
        height: 50,
        aspect: 1,
    })
    const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null)
    const [imageUrl, setImageUrl] = useState<string>('')
    const [croppedImageUrl, setCroppedImageUrl] = useState<string>('')
    const [croppedBlob, setCroppedBlob] = useState<Blob>(null)

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
        fbStorage
            .ref()
            .child(
                'images/' + formatDateTime(new Date()) + signinAccount.userId
            )
            .put(croppedBlob)
            .then((snapshot) => {
                snapshot.ref.getDownloadURL().then((avatarUrl) => {
                    setImageUrl(avatarUrl)
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
    // const update = () => {
    //     fbDb.collection('users').doc(fbAuth.currentUser.uid).set(
    //         {
    //             avatarUrl: imageUrl,
    //         },
    //         {
    //             merge: true,
    //         }
    //     )
    // }
    const updateFbAuthPhotoURL = () => {
        fbAuth.currentUser.updateProfile({
            photoURL: imageUrl,
        })
    }

    const onUpdateAccount = async (): Promise<void> => {
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
                console.log('update success!')
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
                        <Avatar className={classes.avatar}></Avatar>
                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={onSelectFile}
                            />
                        </div>
                        {src && (
                            <ReactCrop
                                src={src}
                                crop={crop}
                                onImageLoaded={onImageLoaded}
                                onComplete={onCropComplete}
                                onChange={onCropChange}
                                ruleOfThirds
                            />
                        )}
                        {croppedImageUrl && (
                            <div>
                                <img
                                    alt="Crop"
                                    style={{ maxWidth: '100%' }}
                                    src={croppedImageUrl}
                                />
                                <button onClick={onUploadAvatar}>OK</button>
                            </div>
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
                                onClick={onUpdateAccount}
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
