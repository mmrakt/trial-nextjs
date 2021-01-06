const fbFunc = require('firebase-functions')
const nodemailer = require('nodemailer')
const gmailEmail = fbFunc.config().gmail.email
const adminEmail = fbFunc.config().admin.email
const adminPassword = fbFunc.config().admin.password

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = fbFunc.https.onRequest(
    (request: any, response: any) => {
        fbFunc.logger.info('Hello logs!', { structuredData: true })
        response.send('Hello from Firebase!')
    }
)

exports.helloOnRequest = fbFunc.https.onRequest(
    (request: any, response: any) => {
        response.send('Hello from Firebase!')
    }
)

const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: adminEmail,
        pass: adminPassword,
    },
})

const toUserMailContent = (data: any) => {
    return `こんにちは、${data.email}さん。
    あなたのパスワードが変更されました。
    本メールにお心当たりのない場合は無視してください。`
}

exports.sendMail = fbFunc.https.onCall(async (data: any, context: any) => {
    const toUserMail = {
        from: adminEmail,
        to: gmailEmail,
        subject: 'パスワード更新完了',
        text: toUserMailContent(data),
    }

    try {
        await mailTransport.sendMail(toUserMail)
    } catch (error) {
        console.log(error)
    }
})

exports.helloOnCall = fbFunc.https.onCall((data: any, context: any) => {
    return 'Hello OnCall!'
})
