import React, { useContext } from 'react'
import { AppContext, AppContextType } from '../../context/AppContext'
import { ReactComponent as GoogleIcon } from '../../icons/GoogleIcon.svg'
import { AuthButton } from './AuthButton'
import { useForm } from 'react-hook-form'
import { Modal } from '../common/Modal'

interface SignInModalProps {
  setShowSignUpModal: (show: boolean) => void
  setShowSignInModal: (show: boolean) => void
}

type signInData = {
  email: string
  password: string
}

export function SignInModal(props: SignInModalProps) {
  const { setShowSignUpModal, setShowSignInModal } = props
  const { signInWithGoogle, signIn } = useContext(AppContext) as AppContextType
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInData>()
  const onSubmit = (data: signInData) => signIn(data.email, data.password)

  return (
    <Modal closeModalCallBack={() => setShowSignInModal(false)}>
      {/*content*/}
      <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none'>
        {/*header*/}
        <div className='flex items-center justify-center p-5 border-b border-solid border-slate-200 rounded-t'>
          <h3 className='text-xl font-semibold'>Sign in to Impot Match</h3>
          <button
            className='flex items-center justify-center h-8 w-8 text-black float-right text-2xl absolute top-2 right-2'
            onClick={() => setShowSignInModal(false)}
          >
            ×
          </button>
        </div>
        {/*body*/}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='bg-white rounded px-8 pt-6 pb-8'
        >
          <div className='flex flex-col items-baseline mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='email'
            >
              Email
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700'
              type='text'
              placeholder='Email'
              {...register('email', { required: true })}
            />
            {errors.email && (
              <span className='text-red-500 ml-1'>Email is required</span>
            )}
          </div>
          <div className='flex flex-col items-baseline mb-6'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='password'
            >
              Password
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
              type='password'
              placeholder='******************'
              {...register('password', { required: true })}
            />
            {errors.password && (
              <span className='text-red-500 ml-1'>Password is required</span>
            )}
          </div>
          <div className='flex items-center justify-between'>
            <input
              type='submit'
              value='Sign In'
              className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded cursor-pointer'
            />
            <a
              className='inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-800'
              href='#'
            >
              Forgot Password?
            </a>
          </div>
        </form>
        <span className='mb-4'>or</span>
        <div className='p-4 px-8 mb-3'>
          <AuthButton
            Icon={GoogleIcon}
            onClick={async () => {
              const closeOnSuccess = !signInWithGoogle()
              setShowSignInModal(closeOnSuccess)
            }}
            text='Continue with Google'
          ></AuthButton>
        </div>
        <div className='flex flex-row items-center justify-center mb-8'>
          <div className='mr-2'>Dont have an account ?</div>
          <button
            className='hover:bg-gray-100 text-black font-semibold px-2 py-1 border border-black text-sm relative'
            onClick={() => {
              setShowSignInModal(false)
              setShowSignUpModal(true)
            }}
          >
            Sign up
          </button>
        </div>
      </div>
    </Modal>
  )
}
