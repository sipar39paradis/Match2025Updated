import React, { useContext, useState } from 'react'
import { AppContext, AppContextType } from '../../context/AppContext'
import { AuthModalEnum } from './AuthModal'
import { useForm } from 'react-hook-form'

interface SignUpWithEmailModalProps {
  closeModal: (show: boolean) => void
  switchModal: (modal: AuthModalEnum) => void
}

type signUpWithEmailData = {
  firstName: string
  lastName: string
  email: string
  password: string
  referralCode: string
}

export function SignUpWithEmailModal(props: SignUpWithEmailModalProps) {
  const { closeModal, switchModal } = props
  const { signUpWithEmailAndPassword } = useContext(
    AppContext
  ) as AppContextType
  
  const [authError, setAuthError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpWithEmailData>()
  const onSubmit = async (data: signUpWithEmailData) => {
    const res = await signUpWithEmailAndPassword(
      data.email,
      data.password,
      data.firstName,
      data.lastName,
      data.referralCode
    )
    console.log(res)
    res ? setAuthError(res) : closeModal(false)
  }

  return (
    <div className='border-0 rounded-lg shadow-lg relative flex flex-col bg-white'>
      {/*header*/}
      <div className='flex items-center justify-center p-5 mb-5'>
        <h3 className='text-xl font-semibold'>Lets get started</h3>
        <button
          className='flex items-center justify-center h-8 w-8 text-black float-right text-2xl absolute top-2 right-2'
          onClick={() => closeModal(false)}
        >
          ×
        </button>
      </div>
      {/*body*/}
      <div className='flex flex-col space-y-3.5 bg-white rounded pt-6 pb-8 mb-2'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='bg-white rounded px-8 pt-6 pb-8'
        >
          <div className='flex flex-col items-baseline mb-4'>
            <div className='flex flex-row mb-4'>
              <div className='flex flex-col items-baseline w-48  mr-8'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2 ml-1'
                  htmlFor='FirstName'
                >
                  First name
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700'
                  type='text'
                  placeholder='First name'
                  {...register('firstName', { required: true })}
                />
                {errors.firstName && (
                  <span className='text-red-500 ml-1'>
                    First name is required
                  </span>
                )}
              </div>

              <div className='flex flex-col items-baseline w-48'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2 ml-1'
                  htmlFor='lastName'
                >
                  Last name
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700'
                  type='text'
                  placeholder='Last Name'
                  {...register('lastName', { required: true })}
                />
                {errors.lastName && (
                  <span className='text-red-500 ml-1'>
                    Last name is required
                  </span>
                )}
              </div>
            </div>
            <label
              className='block text-gray-700 text-sm font-bold mb-2 ml-1'
              htmlFor='email'
            >
              Email
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700'
              type='text'
              placeholder='Email'
              {...register('email', { required: true, minLength: 6 })}
            />
            {errors.email && (
              <span className='text-red-500 ml-1'>Email is required</span>
            )}
            {authError && (
              <span className='text-red-500 ml-1'>{authError}</span>
            )}
          </div>
          <div className='flex flex-col items-baseline mb-6'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2 ml-1'
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
          <div className='flex flex-col items-baseline mb-6'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2 ml-1'
              htmlFor='password'
            >
             Referral Code 
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
              type='text'
              placeholder='ABCD1234'
              {...register('referralCode', { required: false })}
            />
            {errors.password && (
              <span className='text-red-500 ml-1'>Password is required</span>
            )}
          </div>
          <input
            type='submit'
            value='Sign up'
            className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 w-full rounded cursor-pointer'
          />
        </form>
      </div>
      {/*footer*/}
      <div className='flex flex-row items-center justify-center mb-8'>
        <div className='mr-2'>Already have an account ?</div>
        <button
          className='hover:bg-gray-100 text-black font-semibold px-2 py-1 border border-black text-sm relative'
          onClick={() => {
            switchModal(AuthModalEnum.SignIn)
          }}
        >
          Sign in
        </button>
      </div>
    </div>
  )
}
