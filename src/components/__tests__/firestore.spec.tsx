const fs = require('fs')
const firebase = require('@firebase/rules-unit-testing')
const PROJECT_ID = 'nextjs-app-bfac0'
const http = require('http')
const COVERAGE_URL = `http://localhost:8080/emulator/v1/projects/nextjs-app-bfac0:ruleCoverage.html`
const authedUsersRef = getAuthedFirestore({ uid: 'mmrakt' })
    .collection('users')
    .doc('mmrakt')
const guestUsersRef = getAuthedFirestore(null).collection('users').doc('mmrakt')

beforeAll(async () => {
    const rules = fs.readFileSync('firestore.rules', 'utf8')
    await firebase.loadFirestoreRules({ projectId: PROJECT_ID, rules })
})

afterAll(async () => {
    await Promise.all(firebase.apps().map((app) => app.delete()))

    const coverageFile = 'firestore-coverage.html'
    const fstream = fs.createWriteStream(coverageFile)
    await new Promise((resolve, reject) => {
        http.get(COVERAGE_URL, (res) => {
            res.pipe(fstream, { end: true })
            res.on('end', resolve)
            res.on('error', reject)
        })
    })
})

function getAuthedFirestore(auth) {
    return firebase
        .initializeTestApp({ projectId: PROJECT_ID, auth })
        .firestore()
}

describe('users collection', () => {
    afterEach(async () => {
        await firebase.clearFirestoreData({ projectId: PROJECT_ID })
    })
    test('認証済みの場合ドキュメントを作成できること', async () => {
        await firebase.assertSucceeds(
            authedUsersRef.set({
                userId: 'mmrakt',
                userName: 'mmrakt',
                email: 'mmrakt@gmail.com',
                profile: 'hogehoge',
                avatarURL: '',
            })
        )
    })
    test('未認証の場合ドキュメントを作成できないこと', async () => {
        await firebase.assertFails(
            guestUsersRef.set({
                userId: 'mmrakt',
                userName: 'mmrakt',
                email: 'mmrakt@gmail.com',
                profile: 'hogehoge',
                avatarURL: '',
            })
        )
    })
    test('uidが一致する場合ドキュメントを更新できること', async () => {
        await authedUsersRef.set({
            userId: 'mmrakt',
            userName: 'mmrakt',
            email: 'mmrakt@gmail.com',
            profile: 'hogehoge',
            avatarURL: '',
        })
        await firebase.assertSucceeds(
            authedUsersRef.update({
                userId: 'mmrakt',
                userName: 'mmrakt',
                email: 'mmrakt@gmail.com',
                profile: 'hogehoge',
                avatarURL: '',
            })
        )
    })
    test('uidが一致しない場合ドキュメントを更新できないこと', async () => {
        const usersRef = getAuthedFirestore({ uid: 'akito' })
            .collection('users')
            .doc('akito')
        await usersRef.set({
            userId: 'mmrakt',
            userName: 'mmrakt',
            email: 'mmrakt@gmail.com',
            profile: 'hogehoge',
            avatarURL: '',
        })
        const usersRefByAnother = getAuthedFirestore({ uid: 'mmrakt' })
            .collection('users')
            .doc('akito')
        await firebase.assertFails(
            usersRefByAnother.update({
                userId: 'mmrakt',
                userName: 'mmrakt',
                email: 'mmrakt@gmail.com',
                profile: 'hogehoge',
                avatarURL: '',
            })
        )
    })
    test('認証済みの場合ドキュメントを削除できること', async () => {
        await firebase.assertSucceeds(authedUsersRef.delete())
    })
    test('未認証の場合ドキュメントを削除できないこと', async () => {
        await firebase.assertFails(guestUsersRef.delete())
    })
})
