import React, { useState } from 'react'
import Layout from '../../components/layout'
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    makeStyles,
    Container,
} from '@material-ui/core'
import { fbAuth, fbDb } from '../../../functions/firebase'
import { useRouter } from 'next/router'
import { AuthContext } from '../../auth/AuthProvider'

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

const Signup = (): React.ReactElement => {
    const classes = useStyles()
    const [userId, setUserId] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const router = useRouter()
    const { currentUser } = React.useContext(AuthContext)

    const handleChangeUserId = (e) => setUserId(e.target.value)
    const handleChangeuserName = (e) => setUserName(e.target.value)
    const handleChangeEmail = (e) => setEmail(e.target.value)
    const handleChangePassword = (e) => setPassword(e.target.value)
    const handleChangeConfirmPassword = (e) =>
        setConfirmPassword(e.target.value)

    const signup = async (): Promise<void> => {
        React.useEffect(() => {
            currentUser && router.push('/signin')
        })
        if (email && password) {
            await fbAuth
                .createUserWithEmailAndPassword(email, password)
                .then((result) => {
                    result.user.updateProfile({
                        displayName: userName,
                    })
                })
            fbDb.collection('users').doc(fbAuth.currentUser.uid).set({
                userId: userId,
                userName: userName,
                email: email,
            })
            router.push(`/{$fbAuth.currentUser.uid}`)
        }
    }

    return (
        <Layout title="ユーザー登録">
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}></Avatar>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="userId"
                                    label="ユーザーID"
                                    name="userId"
                                    autoComplete="userId"
                                    onChange={handleChangeUserId}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="userName"
                                    label="ユーザー名"
                                    name="diplayName"
                                    autoComplete="userName"
                                    onChange={handleChangeuserName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Eメールアドレス"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleChangeEmail}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="パスワード"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={handleChangePassword}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="passwordConfirm"
                                    label="パスワード確認"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={handleChangeConfirmPassword}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={signup}
                        >
                            登録
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/signin" variant="body2">
                                    すでにアカウントをお持ちですか？ログイン
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </Layout>
    )
}

export default Signup
