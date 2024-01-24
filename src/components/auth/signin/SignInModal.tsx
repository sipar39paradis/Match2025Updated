import React, { useContext, useState } from 'react';
import { AppContext, AppContextType } from '../../../context/AppContext';
import { useForm } from 'react-hook-form';
import { Modal } from '../../common/Modal';
import { AuthModalEnum } from '../AuthModal';
import { SignInModalBody } from './SignInModalBody';
import { MultiFactorResolver } from 'firebase/auth';
import { Button, TextInput } from 'flowbite-react';
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
          <div className="flex flex-col items-center justify-center p-5 rounded-t m-8">
            <h3 className="text-xl font-semibold pb-10 w-5/6">
              Entrez le code de vérification envoyé sur votre téléphone
            </h3>

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
                  await verifyTwoFactor(
                    verificationId,
                    verificationCode,
                    resolver
                  );
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
