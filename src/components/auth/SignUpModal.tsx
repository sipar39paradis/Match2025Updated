import React, { useContext, useState } from 'react';
import { AppContext, AppContextType } from '../../context/AppContext';
import { AuthButton } from './AuthButton';
import { ReactComponent as GoogleIcon } from '../../icons/GoogleIcon.svg';
import { ReactComponent as EnvelopeIcon } from '../../icons/EnvelopeIcon.svg';
import { AuthModalEnum } from './AuthModal';

interface SignUpModalProps {
  closeModal: (show: boolean) => void;
  switchModal: (modal: AuthModalEnum) => void;
}

export function SignUpModal(props: SignUpModalProps) {
  const { signInWithGoogle } = useContext(AppContext) as AppContextType;
  const { closeModal, switchModal } = props;
  const [authError, setAuthError] = useState('');

  return (
    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[28rem] bg-white">
      {/*header*/}
      <div className="flex items-center justify-center p-5 mb-5">
        <h3 className="text-xl font-semibold">Bienvenue à Impot Match</h3>
        <button
          className="flex items-center justify-center h-8 w-8 text-black float-right text-2xl absolute top-2 right-2"
          onClick={() => closeModal(false)}
        >
          ×
        </button>
      </div>
      {/*body*/}
      <div className="flex flex-col space-y-3.5 bg-white rounded px-8 pt-6 pb-8 mb-5">
        <AuthButton
          Icon={GoogleIcon}
          onClick={async () => {
            const res = await signInWithGoogle();
            res ? setAuthError(res) : closeModal(false);
          }}
          text="Continuez avec Google"
        ></AuthButton>
        {authError && (
          <span className="text-red-500 ml-1">Something went wrong</span>
        )}
        <button
          className=" hover:bg-gray-100 text-black font-semibold py-2 px-4 w-full border border-black text-sm relative"
          type="button"
          onClick={() => switchModal(AuthModalEnum.SignUpWithEmail)}
        >
          <EnvelopeIcon className="absolute  h-7 bottom-1" />
          Continuez avec une adresse courriel
        </button>
      </div>
      {/*footer*/}
      <div className="flex flex-row items-center justify-center mb-8">
        <div className="mr-2">Vous avez déjà un compte ?</div>
        <button
          className="hover:bg-gray-100 text-black font-semibold px-2 py-1 border border-black text-sm relative"
          onClick={() => {
            switchModal(AuthModalEnum.SignIn);
          }}
        >
          Se connecter
        </button>
      </div>
    </div>
  );
}
