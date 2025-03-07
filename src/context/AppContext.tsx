import React, {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useRef,
} from 'react';
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
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  doc,
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
import { Button, Modal } from 'flowbite-react';
import { EmptyQuestionnaire } from '../views/loggedin/TaxDeclaration/emptyQuestionnaire';
import {
  ClientTypeEnum,
  Questionnaire,
  QuestionnaireStateEnum,
} from '../views/loggedin/TaxDeclaration/types/Questionnaire/Questionnaire';
import { TaxDeclarationStep } from '../views/loggedin/TaxDeclaration/types/TaxReport/TaxDeclarationStep';
import { signUpWithEmailData } from '../components/auth/SignUpWithEmailModal';
import { AuthModalEnum } from '../components/auth/AuthModal';

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
auth.languageCode = 'fr';

export interface AppContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: User;
  loading: boolean;
  errors: Error;
  signIn: (
    email: string,
    password: string
  ) => Promise<[Promise<string>, MultiFactorResolver, string]>;
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
    promise: string,
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
  addQuestionnaire: (
    clientType?: ClientTypeEnum,
    questionnaire?: Questionnaire,
    stepToRedirect?: TaxDeclarationStep
  ) => void;
  sendEmail: () => Promise<void>;
  createUserParams: signUpWithEmailData;
  setCreateUserParams: any;
  isInSensitive: boolean;
  setIsInSensitive: any;
  modalToDisplay: AuthModalEnum | null;
  setModalToDisplay: any;
  showModal: boolean;
  setShowModal: any;
  err: string;
  setErr: any;
  donePolicy: boolean;
  setDonePolicy: any;
  doneConditions: boolean;
  setDoneConditions: any;
}

export const AppContext = createContext<AppContextType | null>(null);

interface AppContextProviderProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userInfo, setUserInfo] = useState(null);
  const [user, loading, errors] = useAuthState(auth);
  const [openModel, setOpenModel] = useState(false);
  const openRef = useRef(openModel);
  const [createUserParams, setCreateUserParams] =
    useState<signUpWithEmailData>(null);
  const [isInSensitive, setIsInSensitive] = useState(false);
  const [continueSess, setContinueSess] = useState(false);
  const [modalToDisplay, setModalToDisplay] =
    React.useState<AuthModalEnum | null>(null);
  const [showModal, setShowModal] = React.useState(false);
  const [err, setErr] = useState<string>(null);
  const [donePolicy, setDonePolicy] = useState(false);
  const [doneConditions, setDoneConditions] = useState(false);
  const continueSessRef = useRef(continueSess);
  continueSessRef.current = continueSess;
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (window.performance.navigation.type !== 1 || isInSensitive) {
        signOut();
      }
    };
  }, []);

  async function enrollTwoFactor(phoneNumber: string): Promise<string> {
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
    if (userCredential.user.displayName !== null) {
      const names = userCredential.user.displayName.split(' ');
      await createProfile(userCredential, names[0], names[1], '');
    }
    setUserInfo(userCredential);
    timedSignOut();
  };

  const timedSignOut = async () => {
    const FIFTEEN_MINUTES_BEFORE_MODAL = 900_000;
    const THIRTY_SECONDS_AFTER_MODAL = 30000;

    setTimeout(() => {
      setOpenModel(true);
      setTimeout(async () => {
        if (continueSessRef.current) {
          setContinueSess(false);
          timedSignOut();
        } else {
          setOpenModel(false);
          await signOut();
        }
        // }
      }, THIRTY_SECONDS_AFTER_MODAL);
    }, FIFTEEN_MINUTES_BEFORE_MODAL);
  };

  const verifyTwoFactor = async (
    verificationId: string,
    verificationCode: string,
    resolver: MultiFactorResolver
  ) => {
    // Ask user for the SMS verification code. Then:
    const cred = PhoneAuthProvider.credential(verificationId, verificationCode);
    const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);
    // Complete sign-in.
    return resolver
      .resolveSignIn(multiFactorAssertion)
      .then(function (userCredential) {
        succsessfulSignIn(userCredential);
      });
  };

  const handleLogin = async (
    userCredentialsPromise: Promise<UserCredential>,
    buttonId: string
  ): Promise<[Promise<string>, MultiFactorResolver, string]> => {
    let errorMessage: string = null;
    let promise = null;
    let resolver = null;

    await userCredentialsPromise
      .then(async (userCredential) => {
        succsessfulSignIn(userCredential);
        errorMessage = 'No Two Factor';
      })
      .catch(async (error) => {
        if (error.code == 'auth/multi-factor-auth-required') {
          const recaptchaVerifier = new RecaptchaVerifier(
            buttonId,
            {
              size: 'invisible',
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
            promise = await phoneAuthProvider.verifyPhoneNumber(
              phoneInfoOptions,
              recaptchaVerifier
            );
          } else {
            // Unsupported second factor.
          }
        } else if (error.code == 'auth/wrong-password') {
          errorMessage = error.message;
        }
        errorMessage = error.message;
      });
    return [promise, resolver, errorMessage];
  };

  async function signIn(
    email: string,
    password: string
  ): Promise<[Promise<string>, MultiFactorResolver, string]> {
    return handleLogin(
      signInWithEmailAndPassword(auth, email, password),
      'connect-button'
    );
  }

  async function signInWithGoogle(): Promise<
    [Promise<string>, MultiFactorResolver, string]
  > {
    const provider = new GoogleAuthProvider();
    return handleLogin(signInWithPopup(auth, provider), 'google-login');
  }

  async function signInWithFacebook() {
    let errorMessage = '';
    const provider = new FacebookAuthProvider();
    await signInWithPopup(auth, provider)
      .then((userCredential) => {
        const userInfo = getDoc(
          doc(firestore, 'userInfo', userCredential.user.email)
        );
        setUserInfo(userInfo);
      })
      .catch((error) => {
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
          await createProfile(userCredential, firstName, lastName, referalCode);
          await updateProfile(userCredential.user, {
            displayName: `${firstName} ${lastName}`,
          }).catch((error) => {
            errorMessage = error.message;
          });
          await sendEmailVerification(userCredential.user);
          succsessfulSignIn(userCredential);
          errorMessage = 'No Two Factor';
        }
      })
      .catch((error) => {
        errorMessage = error.message;
      });
    return errorMessage;
  }

  async function sendEmail(): Promise<void> {
    await sendEmailVerification(user);
  }

  function signOut() {
    // if (user) {
    auth.signOut();
    setUserInfo(null);
    navigate('/');
    // }
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

  async function addQuestionnaire(
    clientType = ClientTypeEnum.MAIN_CLIENT,
    questionnaire = EmptyQuestionnaire,
    stepToRedirect = TaxDeclarationStep.PERSONAL_INFORMATIONS
  ) {
    const defaultValues = {
      ...EmptyQuestionnaire,
      clientType,
      state: QuestionnaireStateEnum.IN_PROGRESS,
      year: new Date().getFullYear(),
      personalInformations: {
        ...EmptyQuestionnaire?.personalInformations,
        email: user.email,
      },
      civilStatus: questionnaire?.civilStatus || null,
      contactDetails: questionnaire?.contactDetails || null,
    };
    await addDoc(
      collection(firestore, 'taxReport', user.uid, 'questionnaires'),
      defaultValues
    ).then((docRef) => {
      navigate(`/questionnaire/${docRef.id}?step=${stepToRedirect}`);
    });
  }

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
        addQuestionnaire,
        sendEmail,
        createUserParams,
        setCreateUserParams,
        isInSensitive,
        setIsInSensitive,
        modalToDisplay,
        setModalToDisplay,
        showModal,
        setShowModal,
        err,
        setErr,
        donePolicy,
        setDonePolicy,
        doneConditions,
        setDoneConditions,
      }}
    >
      <Modal show={openModel}>
        <div className="flex border-0 rounded-lg shadow-lg relative bg-white flex-col">
          <div className="flex flex-col items-center justify-center p-5 rounded-t">
            <h3 className="text-xl font-semibold pt-6">
              Êtes vous toujours la ?
            </h3>
            <h4>
              Vous serez déconnecté pour assurer la sécurité de vos
              informations.
            </h4>
            <button
              className="flex items-center justify-center h-8 w-8 text-black float-right text-2xl absolute top-2 right-2"
              onClick={() => setOpenModel(false)}
            >
              ×
            </button>

            <form className="flex flex-col gap-4">
              <Button
                color="warning"
                className=" m-6"
                id="two-factor-button"
                onClick={() => {
                  setContinueSess(true);
                  setOpenModel(false);
                }}
              >
                je suis la, ne pas me déconnecter
              </Button>
            </form>
          </div>
        </div>
      </Modal>
      {children}
    </AppContext.Provider>
  );
}
