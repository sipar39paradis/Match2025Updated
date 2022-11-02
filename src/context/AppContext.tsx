import React, { createContext, ReactNode } from 'react'
import { initializeApp } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { doc, setDoc, getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBlDTJ__d4BGvkE1aNX5l9UWMbh6Cloz-E',

  authDomain: 'impot-match.firebaseapp.com',

  projectId: 'impot-match',

  storageBucket: 'impot-match.appspot.com',

  messagingSenderId: '689989068082',

  appId: '1:689989068082:web:a480fd7ebb3c0276cf632b',

  measurementId: 'G-6JTV1BLMVR',
}
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth()

export interface AppContextType {
  user: unknown
  signIn: (email: string, password: string) => void
  signInWithGoogle: () => Promise<boolean>
  signOut: () => void
  signUpWithEmailAndPassword: (email: string, password: string) => void
}

export const AppContext = createContext<AppContextType | null>(null)

interface AppContextProviderProps {
  children: ReactNode
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [user] = useAuthState(auth)

  function signIn(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
  }

  async function signInWithGoogle() {
    let success = false
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider).then(() => {
      success = true
    })
    return success
  }

  function signUpWithEmailAndPassword(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password).then(
      async (userCredential) => {
        if (userCredential?.user.email) {
          await setDoc(doc(db, 'users', userCredential.user.email), {
            email: userCredential.user.email,
            name: userCredential.user.displayName,
            profileType: 'client',
            phoneNumber: userCredential.user.phoneNumber,
          })
        }
      }
    )
  }

  function signOut() {
    auth.signOut()
  }

  return (
    <AppContext.Provider
      value={{
        user,
        signIn,
        signInWithGoogle,
        signOut,
        signUpWithEmailAndPassword,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
