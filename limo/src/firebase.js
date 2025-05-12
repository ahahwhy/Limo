import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBhkZQlKVqtSf5cAhDnS1jdUgC36QYF1as',
  authDomain: 'limo-da2b4.firebaseapp.com',
  projectId: 'limo-da2b4',
  storageBucket: 'limo-da2b4.firebasestorage.app',
  messagingSenderId: '909817903059',
  appId: '1:909817903059:web:8be3dd41e671bb7ab3a126',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { app, auth, db }
