export namespace vldRules {
    export const required = {
        value: true,
        message: '必須項目です。',
    }
    export const checkAlphanumeric = {
        value: /^[0-9a-zA-Z]*$/,
        message: '半角英数字のみ使用可能です。',
    }
    export const checkEmail = {
        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        message: 'メールアドレスの形式が正しくありません。',
    }
    export const checkMinLength = {
        value: 8,
        message: '8文字以上で設定してください。',
    }
}
