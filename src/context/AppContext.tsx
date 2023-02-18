import React, { createContext, ReactNode, useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
  FacebookAuthProvider,
  getMultiFactorResolver,
  PhoneMultiFactorGenerator,
  PhoneAuthProvider,
  RecaptchaVerifier,
  multiFactor,
  MultiFactorResolver,
  User,
} from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  doc,
  setDoc,
  getFirestore,
  getDoc,
  Firestore,
  addDoc,
  collection,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '../interfaces/User';
import { upsertUserProfile } from '../client/firebaseClient';
import { FirebaseStorage, getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBlDTJ__d4BGvkE1aNX5l9UWMbh6Cloz-E',

  authDomain: 'impot-match.firebaseapp.com',

  projectId: 'impot-match',

  storageBucket: 'impot-match.appspot.com',

  messagingSenderId: '689989068082',

  appId: '1:689989068082:web:a480fd7ebb3c0276cf632b',

  measurementId: 'G-6JTV1BLMVR',
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);
const auth: Auth = getAuth();

export interface AppContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: User;
  loading: boolean;
  errors: Error;
  signIn: (email: string, password: string) => Promise<string>;
  signInWithGoogle: () => Promise<
    [Promise<string>, MultiFactorResolver, string]
  >;
  signInWithFacebook: () => Promise<string>;
  enrollTwoFactor: (phoneNumber: string) => Promise<string>;
  verifyEnrollingTwoFactor(
    promise: Promise<string>,
    verificationCode: string
  ): Promise<void>;
  verifyTwoFactor(
    promise: Promise<string>,
    verificationCode: string,
    resolver: MultiFactorResolver
  ): Promise<void>;
  signOut: () => void;
  signUpWithEmailAndPassword: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    referralCode: string
  ) => Promise<string>;
  resetPassword: (email: string) => void;
  firestore: Firestore;
  storage: FirebaseStorage;
}

export const AppContext = createContext<AppContextType | null>(null);

interface AppContextProviderProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userInfo, setUserInfo] = useState(null);
  const [user, loading, errors] = useAuthState(auth);
  const navigate = useNavigate();

  async function enrollTwoFactor(phoneNumber: string): Promise<string> {
    console.log(phoneNumber);
    // const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container-id', undefined, auth);
    const recaptchaVerifier = new RecaptchaVerifier(
      'two-factor-button',
      {
        size: 'invisible',
        callback: function (response) {
          // reCAPTCHA solved, you can proceed with
          // phoneAuthProvider.verifyPhoneNumber(...).
          //onSolvedRecaptcha();
        },
      },
      auth
    );
    recaptchaVerifier.render();

    return multiFactor(user)
      .getSession()
      .then(function (multiFactorSession) {
        // Specify the phone number and pass the MFA session.
        const phoneInfoOptions = {
          phoneNumber: `+1${phoneNumber}`,
          session: multiFactorSession,
        };

        const phoneAuthProvider = new PhoneAuthProvider(auth);

        // Send SMS verification code.
        return phoneAuthProvider.verifyPhoneNumber(
          phoneInfoOptions,
          recaptchaVerifier
        );
      });
  }

  const verifyEnrollingTwoFactor = async (
    promise: Promise<string>,
    verificationCode: string
  ) => {
    promise.then(function (verificationId) {
      // Ask user for the verification code. Then:
      const cred = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);

      // Complete enrollment.
      return multiFactor(user).enroll(multiFactorAssertion, 'my phone number');
    });
  };

  const succsessfulSignIn = async (userCredential: UserCredential) => {
    const names = userCredential.user.displayName.split(' ');
    await createProfile(userCredential, names[0], names[1], '');
    setUserInfo(userCredential);
  };

  const verifyTwoFactor = async (
    promise: Promise<string>,
    verificationCode: string,
    resolver: MultiFactorResolver
  ) => {
    promise
      .then(function (verificationId) {
        // Ask user for the SMS verification code. Then:
        console.log(verificationCode);
        const cred = PhoneAuthProvider.credential(
          verificationId,
          verificationCode
        );
        const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);
        // Complete sign-in.
        return resolver.resolveSignIn(multiFactorAssertion);
      })
      .then(function (userCredential) {
        setUserInfo(userCredential);
      });
    await promise;
  };

  async function signIn(email: string, password: string) {
    let errorMessage = '';
    console.log(email, password);
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate('/platform'))
      .catch((error) => {
        errorMessage = error.message;
      });
    return errorMessage;
  }

  async function signInWithGoogle(): Promise<
    [Promise<string>, MultiFactorResolver, string]
  > {
    let errorMessage: string = null;
    let promise = null;
    let resolver = null;
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then(async (userCredential) => {
        // succsessfulSignIn(userCredential);
        errorMessage = 'No Two Factor';
      })
      .catch((error) => {
        console.log(error);
        if (error.code == 'auth/multi-factor-auth-required') {
          const recaptchaVerifier = new RecaptchaVerifier(
            'google-login',
            {
              size: 'invisible',
              callback: function (response) {
                console.log('catchadone');
              },
            },
            auth
          );

          resolver = getMultiFactorResolver(auth, error);
          // Ask user which second factor to use.
          const selectedIndex = 0;
          if (
            resolver.hints[selectedIndex].factorId ===
            PhoneMultiFactorGenerator.FACTOR_ID
          ) {
            const phoneInfoOptions = {
              multiFactorHint: resolver.hints[selectedIndex],
              session: resolver.session,
            };
            const phoneAuthProvider = new PhoneAuthProvider(auth);
            // Send SMS verification code
            promise = phoneAuthProvider.verifyPhoneNumber(
              phoneInfoOptions,
              recaptchaVerifier
            );
          } else {
            // Unsupported second factor.
          }
        } else if (error.code == 'auth/wrong-password') {
          console.log(error);
          errorMessage = error.message;
        }
        console.log(error);
        errorMessage = error.message;
      });
    return [promise, resolver, errorMessage];
  }

  async function signInWithFacebook() {
    let errorMessage = '';
    const provider = new FacebookAuthProvider();
    await signInWithPopup(auth, provider)
      .then((userCredential) => {
        console.log(userCredential);
        const userInfo = getDoc(
          doc(firestore, 'userInfo', userCredential.user.email)
        );
        setUserInfo(userInfo);
      })
      .catch((error) => {
        console.log(error);
        errorMessage = error.message;
      });

    return errorMessage;
  }

  async function signUpWithEmailAndPassword(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    referalCode: string
  ) {
    let errorMessage = '';

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        if (userCredential?.user.email) {
          await createProfile(
            userCredential,
            firstName,
            lastName,
            referalCode
          ).then(async () => {
            setUserInfo(userCredential);
            navigate('/platform/questionnaire');
          });
        }
      })
      .catch((error) => {
        errorMessage = error.message;
      });
    return errorMessage;
  }

  function signOut() {
    setUserInfo(null);
    auth.signOut();
    navigate('/');
  }

  async function resetPassword(email: string) {
    auth.useDeviceLanguage();
    await sendPasswordResetEmail(auth, email);
  }

  const createProfile = async (
    userCredential: UserCredential,
    firstName: string,
    lastName: string,
    referralCode: string
  ) => {
    const profile: UserProfile = {
      id: userCredential.user.uid,
      email: userCredential.user.email,
      firstName: firstName,
      lastName: lastName,
      referralCode: referralCode,
      avatar: userCredential.user.photoURL || '',
    };

    await upsertUserProfile(userCredential.user.uid, profile, true);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        errors,
        signIn,
        signInWithGoogle,
        signInWithFacebook,
        enrollTwoFactor,
        verifyTwoFactor,
        verifyEnrollingTwoFactor,
        signOut,
        signUpWithEmailAndPassword,
        resetPassword,
        firestore,
        storage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
