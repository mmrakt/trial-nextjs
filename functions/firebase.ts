import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'

const firebaseConfig = {
  apiKey: 'AIzaSyD3K-IR3bz_e8Y7rZzNthV0koiSa283AwU',
  authDomain: 'nextjs-app-bfac0.firebaseapp.com',
  databaseURL: 'https://nextjs-app-bfac0.firebaseio.com',
  projectId: 'nextjs-app-bfac0',
  storageBucket: 'nextjs-app-bfac0.appspot.com',
  messagingSenderId: '51418477007',
  appId: '1:51418477007:web:c472c0712221a0059522ba',
}
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const db = firebase.firestore()
const loginUser = firebase.auth().currentUser
const googleProvider = new firebase.auth.GoogleAuthProvider()
const fbStorage = firebase.storage()

export { firebase, db, loginUser, googleProvider, fbStorage }
