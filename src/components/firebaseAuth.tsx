import React from 'react'

export default function firebaseAuth() {
    const firebase = require('firebase')
    const firebaseui = require('firebaseui')
    require('firebaseui/dist/firebaseui.css')

    const uiConfig = {
        signInSuccessUrl: '/',
        signInOptions: [
            firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
    }
    // Auth UIインスタンスが存在しなければ初期化する
    const ui =
        firebaseui.auth.AuthUI.getInstance() ||
        new firebaseui.auth.AuthUI(firebase.auth())
    // FirebaseUI Auth のインターフェースをレンダリング
    ui.start('#firebaseui-auth-container', uiConfig)
    return (
        <>
            <div id="firebaseui-auth-container"></div>
        </>
    )
}
