import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBjwzX5Vkrq59CZJEP9PkDluwjzlzKRWOE',
  authDomain: 'week7-mostakkhan.firebaseapp.com',
  databaseURL: 'https://week7-mostakkhan-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'week7-mostakkhan',
  storageBucket: 'week7-mostakkhan.appspot.com',
  messagingSenderId: '353385059416',
  appId: '1:353385059416:web:14e47d27269f72dc16e62d'
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)

export { auth, db }
