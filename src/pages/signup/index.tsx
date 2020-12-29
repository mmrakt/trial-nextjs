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
import { AuthContext, checkUnAuthenticated } from '../../auth/AuthProvider'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

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
    const router = useRouter()
    const { signinAccount } = React.useContext(AuthContext)
    checkUnAuthenticated()
    const classes = useStyles()

    const [userId, setUserId] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState<boolean>(true)

    const { register, handleSubmit, errors } = useForm({
        mode: 'onChange',
    })
    const onSubmit = (data) => console.log(data)

    const onSignup = async (): Promise<void> => {
        setLoading(false)
        if (email && password && loading) {
            try {
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
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(true)
            }
        }
    }

    return (
        <Layout title="ユーザー登録">
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}></Avatar>
                    <form
                        className={classes.form}
                        onSubmit={handleSubmit(onSubmit)}
                    >
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
                                    className={errors.title && 'error'}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setUserId(e.target.value)
                                    }}
                                    inputRef={register({
                                        required: {
                                            value: true,
                                            message: '必須項目です。',
                                        },
                                        pattern: {
                                            value: /^[0-9a-zA-Z]*$/,
                                            message:
                                                '半角英数字のみ使用可能です。',
                                        },
                                    })}
                                    error={Boolean(errors.userId)}
                                />
                                <ErrorMessage errors={errors} name="userId" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="userName"
                                    label="ユーザー名"
                                    name="userName"
                                    autoComplete="userName"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setUserName(e.target.value)
                                    }}
                                    inputRef={register({
                                        required: {
                                            value: true,
                                            message: '必須項目です。',
                                        },
                                    })}
                                    error={Boolean(errors.userName)}
                                />
                                <ErrorMessage errors={errors} name="userName" />
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
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setEmail(e.target.value)
                                    }}
                                    inputRef={register({
                                        required: {
                                            value: true,
                                            message: '必須項目です。',
                                        },
                                        pattern: {
                                            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                            message:
                                                'メールアドレスの形式が正しくありません。',
                                        },
                                    })}
                                    error={Boolean(errors.email)}
                                />
                                <ErrorMessage errors={errors} name="email" />
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
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setPassword(e.target.value)
                                    }}
                                    inputRef={register({
                                        required: {
                                            value: true,
                                            message: '必須項目です。',
                                        },
                                        pattern: {
                                            value: /^[0-9a-zA-Z]*$/,
                                            message:
                                                '半角英数字のみ使用可能です。',
                                        },
                                    })}
                                    error={Boolean(errors.password)}
                                />
                                <ErrorMessage errors={errors} name="password" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="パスワード確認"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="current-password"
                                    inputRef={register({
                                        required: {
                                            value: true,
                                            message: '必須項目です。',
                                        },
                                        validate: (value) =>
                                            value === password ||
                                            '確認用パスワードが一致しません。',
                                    })}
                                    error={Boolean(errors.confirmPassword)}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="confirmPassword"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={onSignup}
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
