import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDTip5ObsIxWfOrPkTu3qsr-YmTNE6af_o',
  authDomain: 'remob-timer.firebaseapp.com',
  projectId: 'remob-timer',
  storageBucket: 'remob-timer.appspot.com',
  messagingSenderId: '637589874808',
  appId: '1:637589874808:web:1a90da86ba3dfc577fa58d',
  measurementId: 'G-FYBTQRW2JX',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.firestore()

export default firebase
