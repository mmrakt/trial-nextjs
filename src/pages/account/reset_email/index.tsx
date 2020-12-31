import React, { useState } from 'react'
import Layout from '../../../components/layout'
import { AuthContext, checkAuthenticated } from '../../../auth/AuthProvider'
import styled from 'styled-components'
import { fbAuth, fbDb } from 'functions/firebase'
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
    const [newEmail, setNewEmail] = useState<string>('')

    const onResetEmail = async (): Promise<void> => {
        try {
            //const credential = fbAuth.EmailAuthProvider.credential(currentUser.email, currentUser.password)
            await fbAuth.currentUser.updateEmail(newEmail)
            fbAuth.currentUser.sendEmailVerification()
            updateAccountEmailOnFbDB()
            setNewEmail('')
            location.href = '/account/reset_email_complete'
        } catch (error) {
            console.log(error)
        }
    }
    const updateAccountEmailOnFbDB = () => {
        fbDb.collection('users').doc(fbAuth.currentUser.uid).set(
            {
                email: newEmail,
            },
            {
                merge: true,
            }
        )
    }

    return (
        <Layout title="メールアドレス変更">
            {signinAccount && (
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="newEmail"
                                    label="メールアドレス"
                                    name="newEmail"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setNewEmail(e.target.value)
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
                            送信する
                        </Button>
                    </form>
                </Container>
            )}
        </Layout>
    )
}
export default ResetEmail
