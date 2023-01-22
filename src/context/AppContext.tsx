import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
  UserCredential,
} from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { doc, setDoc, getFirestore, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { AccountantProfile, ClientProfile, UserInfo } from '../interfaces/User'
import { upsertProfile } from '../client/firebaseClient'

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
const auth: Auth = getAuth()

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
  const [userInfo, setUserInfo] = useState(null)
  const [user] = useAuthState(auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo) {
      navigate('/platform')
    } else {
      navigate('/')
    }
  }, [userInfo])

  function signIn(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
  }

  async function signInWithGoogle() {
    let errorMessage = ''
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
      .then(async (userCredential) => {
        const names = userCredential.user.displayName.split(' ')
        await createProfile(userCredential, names[0], names[1])
        setUserInfo(userCredential)
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

          createProfile(userCredential, firstName, lastName)

          setUserInfo(userCredential)
        }
      })
      .catch((error) => {
        errorMessage = error.message
      })
    return errorMessage
  }

  function signOut() {
    setUserInfo(null)
    auth.signOut()
    navigate('/')
  }

  async function resetPassword(email: string) {
    auth.useDeviceLanguage()
    await sendPasswordResetEmail(auth, email)
  }

  const createProfile = async  (userCredential: UserCredential, firstName: string, lastName: string) => {
    const profile: AccountantProfile = {
      id: userCredential.user.uid,
      email: userCredential.user.email,
      firstName: firstName, 
      lastName: lastName,
      avatar: userCredential.user.photoURL || '',
    }

    await upsertProfile(userCredential.user.uid, profile, true)
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
