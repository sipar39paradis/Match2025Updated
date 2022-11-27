import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { doc, setDoc, getFirestore, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any
  signIn: (email: string, password: string) => void
  signInWithGoogle: () => Promise<string>
  signOut: () => void
  signUpWithEmailAndPassword: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<string>
  resetPassword: (email: string) => void
}

export const AppContext = createContext<AppContextType | null>(null)

interface AppContextProviderProps {
  children: ReactNode
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userProfile, setUserProfile] = useState(null)
  const [user] = useAuthState(auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (userProfile) {
      navigate('/profile')
    } else {
      navigate('/')
    }
  }, [userProfile])

  function signIn(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
  }
  
  async function signInWithGoogle() {
    let errorMessage = ''
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
      .then((userCredential) => {
        const profile = getDoc(doc(db, 'profiles', userCredential.user.email))
        setUserProfile(profile)
      })
      .catch((error) => {
        errorMessage = error.message
      })
    return errorMessage
  }

  async function signUpWithEmailAndPassword(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    let errorMessage = ''

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        if (userCredential?.user.email) {
          const newProfile = {
            email: userCredential.user.email,
            firstName: firstName,
            lastName: lastName,
            type: 'client',
            phoneNumber: userCredential.user.phoneNumber,
          }
          await setDoc(
            doc(db, 'profiles', userCredential.user.email),
            newProfile
          )
          setUserProfile(newProfile)
        }
      })
      .catch((error) => {
        errorMessage = error.message
      })
    return errorMessage
  }

  function signOut() {
    setUserProfile(null)
    auth.signOut()
  }

  async function resetPassword(email: string) {
    auth.useDeviceLanguage()
    await sendPasswordResetEmail(auth, email)
  }

  return (
    <AppContext.Provider
      value={{
        user,
        signIn,
        signInWithGoogle,
        signOut,
        signUpWithEmailAndPassword,
        resetPassword,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
