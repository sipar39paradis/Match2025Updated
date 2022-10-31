import React, { createContext, ReactNode } from 'react'
import firebase, { initializeApp } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBlDTJ__d4BGvkE1aNX5l9UWMbh6Cloz-E',

  authDomain: 'impot-match.firebaseapp.com',

  projectId: 'impot-match',

  storageBucket: 'impot-match.appspot.com',

  messagingSenderId: '689989068082',

  appId: '1:689989068082:web:a480fd7ebb3c0276cf632b',

  measurementId: 'G-6JTV1BLMVR',
}
const firestore = initializeApp(firebaseConfig)
const auth = getAuth()

export interface AppContextType {
  user: any
  signIn: (email: string, password: string) => void
  signInWithGoogle: () => void
  signOut: () => void
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
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
  }

  function signOut() {
    auth.signOut()
  }

  function signUp(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
  }

  function getUser() {
    auth.currentUser
  }

  return (
    <AppContext.Provider value={{ user, signIn, signInWithGoogle, signOut }}>
      {children}
    </AppContext.Provider>
  )
}
