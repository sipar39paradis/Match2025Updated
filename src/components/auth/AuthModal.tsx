import React from 'react';
import { Modal } from '../common/Modal';
import { ResetPasswordModal } from './ResetPasswordModal';
import { SignInModal } from './signin/SignInModal';
import { SignUpWithEmailModal } from './SignUpWithEmailModal';
import { TwoFactorModal } from './TwoFactorModal';

export enum AuthModalEnum {
  SignUp = 'SignUp',
  SignIn = 'SignIn',
  ResetPassword = 'ResetPassword',
  TwoFactor = 'twoFactor',
}

interface AuthModalProps {
  closeModal: (show: boolean) => void;
  authModalToDisplay: AuthModalEnum;
  switchModal: (modal: AuthModalEnum) => void;
}

export function AuthModal(props: AuthModalProps) {
  const { closeModal, authModalToDisplay, switchModal } = props;

  return (
    <Modal
      closeModalCallBack={closeModal}
      is2fa={authModalToDisplay === AuthModalEnum.TwoFactor}
    >
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
      {authModalToDisplay === AuthModalEnum.SignUp && (
        <SignUpWithEmailModal
          closeModal={closeModal}
          switchModal={switchModal}
        ></SignUpWithEmailModal>
      )}
      {authModalToDisplay === AuthModalEnum.TwoFactor && (
        <TwoFactorModal
          closeModal={closeModal}
          switchModal={switchModal}
        ></TwoFactorModal>
      )}
    </Modal>
  );
}
