import React, { useState } from 'react'
import {} from '@material-ui/core'
import Layout from '../../components/layout'
import { AuthContext } from '../../auth/AuthProvider'
import { CssBaseline, Grid, makeStyles, Container } from '@material-ui/core'
import { fbDb, fbAuth } from '../../../functions/firebase'
import 'react-image-crop/dist/ReactCrop.css'
import AvatalTrimmingModal from './AvatarTrimmingModal'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import TextFieldEl from '../../components/grid/textFieldEl'
import { vldRules } from '@/utils/validationRule'
import ProtectedRoute from '../../auth/ProtectedRoute'
import Button from '../../components/Button'

const AvatarImg = styled.img`
    border-radius: 50%;
    height: 100px;
    width: 100px;
`

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
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    const { register, errors } = useForm({
        criteriaMode: 'all',
        mode: 'onChange',
    })

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

    const onUpdateAccountOnFbDB = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): Promise<void> => {
        event.preventDefault()

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
        <ProtectedRoute signinAccount={signinAccount}>
            <Layout title="アカウント設定">
                {signinAccount && (
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                            {signinAccount.avatarURL ? (
                                <AvatarImg src={signinAccount.avatarURL} />
                            ) : (
                                <AvatarImg src="/avatar.png" />
                            )}
                            <div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={onSelectFile}
                                />
                            </div>
                            <AvatalTrimmingModal
                                modalIsOpen={modalIsOpen}
                                onRequestClose={() => setModalIsOpen(false)}
                                src={src}
                            />
                            <form className={classes.form} noValidate>
                                <Grid container spacing={2}>
                                    <TextFieldEl
                                        id="userName"
                                        label="ユーザー名"
                                        name="diplayName"
                                        autoComplete="userName"
                                        type="text"
                                        value={editedUserName}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                            setEditedUserName(e.target.value)
                                        }}
                                        inputRef={register({
                                            maxLength:
                                                vldRules.checkMaxLength20,
                                        })}
                                        error={Boolean(errors.newEmail)}
                                        errors={errors}
                                    />
                                    <TextFieldEl
                                        id="profile"
                                        label="プロフィール文"
                                        name="profile"
                                        autoComplete="profile"
                                        type="text"
                                        value={editedProfile}
                                        multiline
                                        rows={4}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                            setEditedProfile(e.target.value)
                                        }}
                                        inputRef={register({
                                            maxLength:
                                                vldRules.checkMaxLength100,
                                        })}
                                        error={Boolean(errors.newEmail)}
                                        errors={errors}
                                    />
                                </Grid>
                                <Button
                                    name="更新"
                                    onClickEvent={onUpdateAccountOnFbDB}
                                />
                            </form>
                        </div>
                    </Container>
                )}
            </Layout>
        </ProtectedRoute>
    )
}
export default Settings
