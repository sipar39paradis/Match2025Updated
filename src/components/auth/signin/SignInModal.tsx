import React, { useContext, useState } from 'react';
import { AppContext, AppContextType } from '../../../context/AppContext';
import { ReactComponent as GoogleIcon } from '../../../icons/GoogleIcon.svg';
import { ReactComponent as FacebookIcon } from '../../../icons/FacebookIcon.svg';
import { AuthButton } from '../AuthButton';
import { useForm } from 'react-hook-form';
import { Modal } from '../../common/Modal';
import { AuthModalEnum } from '../AuthModal';
import { SignInModalBody } from './SignInModalBody';
import { MultiFactorResolver, UserCredential } from 'firebase/auth';
import { Button, Label, TextInput } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

interface SignInModalProps {
  closeModal: (show: boolean) => void;
  switchModal: (modal: AuthModalEnum) => void;
}

type signInData = {
  email: string;
  password: string;
};

export function SignInModal({ closeModal, switchModal }: SignInModalProps) {
  const navigate = useNavigate();
  const { verifyTwoFactor } = useContext(AppContext) as AppContextType;

  const [verificationId, setVerificationId] = useState<string>(null);
  const [resolver, setResolver] = useState<MultiFactorResolver>(null);
  const [verificationCode, setVerificationCode] = useState<string>('');

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<signInData>();
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<signInData>();
  const onSubmit = async (data: signInData) => {
    console.log('submited');
  };

  return (
    <Modal closeModalCallBack={() => closeModal(false)}>
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-96 bg-white">
        {!verificationId ? (
          <SignInModalBody
            closeModal={closeModal}
            switchModal={switchModal}
            setVerificationId={setVerificationId}
            setResolver={setResolver}
          />
        ) : (
          <div className="flex items-center justify-center p-5 rounded-t">
            <h3 className="text-xl font-semibold">
              Entrez le code de vérification envoyé sur votre téléphone
            </h3>
            <button
              className="flex items-center justify-center h-8 w-8 text-black float-right text-2xl absolute top-2 right-2"
              onClick={() => closeModal(false)}
            >
              ×
            </button>

            <form className="flex flex-col gap-4">
              <div>
                <TextInput
                  className="text-center select-none"
                  id="verifivation"
                  required={true}
                  onChange={(e) => {
                    setVerificationCode(e.target.value);
                  }}
                />
              </div>
              <div></div>
              <Button
                id="two-factor-button"
                onClick={async () => {
                  console.log(verificationId, 'promisefromtext');
                  console.log(verificationCode, 'verification code');
                  console.log(resolver, 'resolver');
                  await verifyTwoFactor(
                    verificationId,
                    verificationCode,
                    resolver
                  );
                  console.log('out of login');
                  closeModal(false);
                  navigate('/profile');
                }}
              >
                Soumettre
              </Button>
            </form>
          </div>
        )}
      </div>
    </Modal>
  );
}
