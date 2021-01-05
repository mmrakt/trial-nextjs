import React, { useState } from 'react'
import Layout from '../../../components/layout'
import { AuthContext, checkAuthenticated } from '../../../auth/AuthProvider'
import { firebase, fbAuth, fbDb } from 'functions/firebase'
import {
    Button,
    CssBaseline,
    Grid,
    makeStyles,
    Container,
} from '@material-ui/core'
import TextFieldEl from '../../../components/grid/textFieldEl'
import { useForm } from 'react-hook-form'
import { vldRules } from '../../../utils/validationRule'

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
    const { register, errors } = useForm({
        mode: 'onChange',
        criteriaMode: 'all',
    })

    const onResetEmail = async (): Promise<void> => {
        try {
            setLoading(true)
            await reauthenticateWithCredential()
            await updateAccountEmailOnFbDB()
            fbAuth.currentUser.sendEmailVerification()
            setTimeout(() => {
                location.href = '/account/reset_email/complete'
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
                        <TextFieldEl
                            name="oldEmail"
                            label="現在のメールアドレス"
                            id="oldEmail"
                            autoComplete="oldEmail"
                            type="text"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setOldEmail(e.target.value)
                            }}
                            inputRef={register({
                                required: vldRules.required,
                                pattern: vldRules.checkEmail,
                            })}
                            error={Boolean(errors.oldEmail)}
                            errors={errors}
                        />
                        <TextFieldEl
                            name="newEmail"
                            label="新しいメールアドレス"
                            id="newEmail"
                            autoComplete="newEmail"
                            type="text"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setNewEmail(e.target.value)
                            }}
                            inputRef={register({
                                required: vldRules.required,
                                pattern: vldRules.checkEmail,
                            })}
                            error={Boolean(errors.newEmail)}
                            errors={errors}
                        />
                        <p>
                            ※ご指定のメールアドレスに本人確認用メールを送信します。
                        </p>
                        <TextFieldEl
                            name="password"
                            label="パスワード"
                            id="password"
                            autoComplete="password"
                            type="password"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setPassword(e.target.value)
                            }}
                            inputRef={register({
                                required: vldRules.required,
                            })}
                            error={Boolean(errors.password)}
                            errors={errors}
                        />
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
