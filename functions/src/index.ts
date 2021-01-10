const fbFunc = require('firebase-functions')
const nodemailer = require('nodemailer')

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

const gmailEmail = fbFunc.config().gmail.email
const adminEmail = fbFunc.config().admin.email
const adminPassword = fbFunc.config().admin.password

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

exports.sendMailCompleteUpdatePassword = fbFunc.https.onCall(
    async (data: any) => {
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
    }
)

export {}
