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
import { fbDb, fbAuth } from '../../../functions/firebase'
import { useRouter } from 'next/router'

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
    const router = useRouter()
    const { signinAccount } = React.useContext(AuthContext)
    const [editedUserName, setEditedUserName] = useState(
        JSON.parse(localStorage.getItem('signinAccount'))['userName']
    )
    const [editedProfile, setEditedProfile] = useState(
        JSON.parse(localStorage.getItem('signinAccount'))['profile']
    )

    const handleUpdateAccount = async (): Promise<void> => {
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
                localStorage.setItem(
                    'signinAccount',
                    JSON.stringify({
                        userName: editedUserName,
                        profile: editedProfile,
                    })
                )
            })
            .catch((error) => {
                console.log(error.message)
            })
        router.push(`/${signinAccount.userId}`)
    }
    return (
        <Layout title="アカウント設定">
            {signinAccount && (
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}></Avatar>
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
                                onClick={handleUpdateAccount}
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
