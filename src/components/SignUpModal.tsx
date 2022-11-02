import React, { useContext } from 'react'
import { AppContext, AppContextType } from '../context/AppContext'
import { AuthButton } from './AuthButton'
import { ReactComponent as GoogleIcon } from '../icons/GoogleIcon.svg'
import { ReactComponent as EnvelopeIcon } from '../icons/EnvelopeIcon.svg'

interface SignUpModalProps {
  setShowSignUpModal: (show: boolean) => void
}

export function SignUpModal(props: SignUpModalProps) {
  const { signInWithGoogle } = useContext(AppContext) as AppContextType
  const { setShowSignUpModal } = props

  return (
    <>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50'>
        <div className='relative mb-96 mx-auto w-96'>
          {/*content*/}
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none'>
            {/*header*/}
            <div className='flex items-center justify-center p-5 mb-5'>
              <h3 className='text-xl font-semibold'>Welcome to Impot Match</h3>
              <button
                className='flex items-center justify-center h-8 w-8 text-black float-right text-2xl absolute top-2 right-2'
                onClick={() => setShowSignUpModal(false)}
              >
                ×
              </button>
            </div>
            {/*body*/}
            <div className='flex flex-col space-y-3.5 bg-white rounded px-8 pt-6 pb-8 mb-5'>
              <AuthButton
                Icon={GoogleIcon}
                onClick={signInWithGoogle}
                text='Continue with Google'
              ></AuthButton>
              <AuthButton
                Icon={EnvelopeIcon}
                onClick={signInWithGoogle}
                text='Continue with email'
              ></AuthButton>
            </div>
            <div className='p-4 px-8 mb-5'>Already have an account ?</div>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
    </>
  )
}
