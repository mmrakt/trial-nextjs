import React, { useState } from 'react'
import Layout from '../../components/Layout'
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
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const router = useRouter()

    const handleChangeUserId = (e) => setUserId(e.target.value)
    const handleChangeDisplayName = (e) => setDisplayName(e.target.value)
    const handleChangeEmail = (e) => setEmail(e.target.value)
    const handleChangePassword = (e) => setPassword(e.target.value)
    const handleChangeConfirmPassword = (e) =>
        setConfirmPassword(e.target.value)

    const signup = async (): Promise<void> => {
        if (email && password) {
            await fbAuth
                .createUserWithEmailAndPassword(email, password)
                .then((result) => {
                    result.user.updateProfile({
                        displayName: displayName,
                    })
                })
            fbDb.collection('users').doc(fbAuth.currentUser.uid).set({
                fbUid: fbAuth.currentUser.uid,
                userId: userId,
                displayName: displayName,
                email: email,
            })
            router.push(`/{$fbAuth.currentUser.uid}`)
        }
    }

    return (
        <Layout title="Signup">
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
                                    label="User ID"
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
                                    id="displayName"
                                    label="Display Name"
                                    name="diplayName"
                                    autoComplete="displayName"
                                    onChange={handleChangeDisplayName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
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
                                    label="Password"
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
                                    label="Password Confirm"
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
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/signin" variant="body2">
                                    Already have an account? Sign in
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
