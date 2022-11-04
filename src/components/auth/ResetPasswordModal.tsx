import React, { useContext, useState } from 'react'
import { AppContext, AppContextType } from '../../context/AppContext'
import { useForm } from 'react-hook-form'
import { AuthModalEnum } from './AuthModal'

interface SignInModalProps {
  closeModal: (show: boolean) => void
  switchModal: (modal: AuthModalEnum) => void
}

type resetPasswordData = {
  email: string
}

export function ResetPasswordModal(props: SignInModalProps) {
  const { closeModal, switchModal } = props
  const { resetPassword } = useContext(AppContext) as AppContextType
  const [emailSent, setEmailSent] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<resetPasswordData>()
  const onSubmit = async (data: resetPasswordData) => {
    resetPassword(data.email)
    setEmailSent(data.email)
  }

  return (
    <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-96 bg-white'>
      {/*header*/}
      <div className='flex items-center justify-center p-5 rounded-t'>
        <h3 className='text-xl font-semibold'>Reset password</h3>
        <button
          className='flex items-center justify-center h-8 w-8 text-black float-right text-2xl absolute top-2 right-2'
          onClick={() => closeModal(false)}
        >
          ×
        </button>
      </div>
      {!emailSent && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='bg-white rounded px-8 pt-6 pb-8'
        >
          <div className='flex flex-col items-baseline mb-4'>
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
              {...register('email', { required: true })}
            />
            {errors.email && (
              <span className='text-red-500 ml-1'>Email is required</span>
            )}
          </div>
          <div className='flex items-center'>
            <input
              type='submit'
              value='Reset password'
              className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-3 rounded cursor-pointer'
            />
            <button
              className='hover:bg-gray-100 text-black font-bold py-2 px-3 ml-3 rounded border border-black'
              onClick={() => {
                switchModal(AuthModalEnum.SignIn)
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      {emailSent && (
        <div className='flex align-baseline p-6'>
          <span className='font-semibold text-start'>
            Weve sent you an email at {emailSent} with instructions to reset
            your password. It may take a minute or two to arrive.
          </span>
        </div>
      )}
    </div>
  )
}
