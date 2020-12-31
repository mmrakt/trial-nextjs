import React, { useState } from 'react'
import Layout from '../../../components/layout'
import { AuthContext, checkAuthenticated } from '../../../auth/AuthProvider'
import { firebase, fbAuth, fbDb } from 'functions/firebase'
import {
    Button,
    CssBaseline,
    TextField,
    Grid,
    makeStyles,
    Container,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

const ResetEmail = (): React.ReactElement => {
    const classes = useStyles()
    const { signinAccount } = React.useContext(AuthContext)
    //checkAuthenticated()
    const [oldEmail, setOldEmail] = useState<string>('')
    const [newEmail, setNewEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [, setLoading] = useState<boolean>(false)

    const onResetEmail = async (): Promise<void> => {
        try {
            setLoading(true)
            await reauthenticateWithCredential()
            await updateAccountEmailOnFbDB()
            fbAuth.currentUser.sendEmailVerification()
            setTimeout(() => {
                location.href = '/account/reset_email_complete'
            }, 2000)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const reauthenticateWithCredential = async (): Promise<void> => {
        fbAuth.currentUser
            .reauthenticateWithCredential(fetchCredential())
            .then(() => {
                console.log('再認証成功！')
                fbAuth.currentUser.updateEmail(newEmail)
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                fbAuth.currentUser.getIdToken(true)
            })
    }
    const fetchCredential = () => {
        return firebase.auth.EmailAuthProvider.credential(oldEmail, password)
    }
    const updateAccountEmailOnFbDB = async (): Promise<void> => {
        fbDb.collection('users')
            .doc(fbAuth.currentUser.uid)
            .set(
                {
                    email: newEmail,
                },
                {
                    merge: true,
                }
            )
            .then(() => {
                console.log('メールアドレス変更完了')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <Layout title="メールアドレス変更">
            {signinAccount && (
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="oldEmail"
                                label="現在のメールアドレス"
                                name="oldEmail"
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setOldEmail(e.target.value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="newEmail"
                                label="新しいメールアドレス"
                                name="newEmail"
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setNewEmail(e.target.value)
                                }}
                            />
                        </Grid>
                        <p>
                            ※ご指定のメールアドレスに本人確認用メールを送信します。
                        </p>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="password"
                                label="パスワード"
                                name="password"
                                type="password"
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setPassword(e.target.value)
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={onResetEmail}
                    >
                        変更する
                    </Button>
                </Container>
            )}
        </Layout>
    )
}
export default ResetEmail
