import { auth, db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'

export const getCurrentUser = async () => {
  const user = auth.currentUser
  if (!user) return null

  const userDoc = await getDoc(doc(db, 'users', user.uid))
  return {
    uid: user.uid,
    email: user.email,
    role: userDoc.data()?.role || 'user',
  }
}

export const isAdmin = async () => {
  const user = await getCurrentUser()
  return user?.role === 'admin'
}
