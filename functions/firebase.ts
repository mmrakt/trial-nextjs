import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'

const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  databaseURL: process.env.FB_DATABASE_URL,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
  appId: process.env.FB_APP_ID,
}
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
  console.log('Firebase inialization secusess')
} else {
  console.error('Firebase initialization error')
}

const db = firebase.firestore()
const loginUser = firebase.auth().currentUser
const googleProvider = new firebase.auth.GoogleAuthProvider()
const fbStorage = firebase.storage()

export { firebase, db, loginUser, googleProvider, fbStorage }
