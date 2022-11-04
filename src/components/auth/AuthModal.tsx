import React from 'react'
import { Modal } from '../common/Modal'
import { ResetPasswordModal } from './ResetPasswordModal'
import { SignInModal } from './SignInModal'
import { SignUpModal } from './SignUpModal'
import { SignUpWithEmailModal } from './SignUpWithEmailModal'

export enum AuthModalEnum {
  SignUp = 'SignUp',
  SignIn = 'SignIn',
  ResetPassword = 'ResetPassword',
  SignUpWithEmail = 'SignUpWithEmail',
}

interface AuthModalProps {
  closeModal: (show: boolean) => void
  authModalToDisplay: AuthModalEnum
  switchModal: (modal: AuthModalEnum) => void
}

export function AuthModal(props: AuthModalProps) {
  const { closeModal, authModalToDisplay, switchModal } = props

  return (
    <Modal closeModalCallBack={closeModal}>
      {authModalToDisplay === AuthModalEnum.SignUp && (
        <SignUpModal
          closeModal={closeModal}
          switchModal={switchModal}
        ></SignUpModal>
      )}
      {authModalToDisplay === AuthModalEnum.SignIn && (
        <SignInModal
          closeModal={closeModal}
          switchModal={switchModal}
        ></SignInModal>
      )}
      {authModalToDisplay === AuthModalEnum.ResetPassword && (
        <ResetPasswordModal
          closeModal={closeModal}
          switchModal={switchModal}
        ></ResetPasswordModal>
      )}
      {authModalToDisplay === AuthModalEnum.SignUpWithEmail && (
        <SignUpWithEmailModal
          closeModal={closeModal}
          switchModal={switchModal}
        ></SignUpWithEmailModal>
      )}
    </Modal>
  )
}
