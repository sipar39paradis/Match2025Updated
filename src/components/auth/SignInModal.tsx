
import React, { useContext, useState } from 'react';
import { AppContext, AppContextType } from '../../context/AppContext';
import { ReactComponent as GoogleIcon } from '../../icons/GoogleIcon.svg';
import { AuthButton } from './AuthButton';
import { useForm } from 'react-hook-form';
import { Modal } from '../common/Modal';
import { AuthModalEnum } from './AuthModal';

interface SignInModalProps {
  closeModal: (show: boolean) => void;
  switchModal: (modal: AuthModalEnum) => void;
}

type signInData = {
  email: string;
  password: string;
};

export function SignInModal(props: SignInModalProps) {
  const { closeModal, switchModal } = props;
  const { signInWithGoogle, signInWithFacebook, signIn } = useContext(AppContext) as AppContextType;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInData>();
  const onSubmit = (data: signInData) => signIn(data.email, data.password);
  const [authError, setAuthError] = useState('');

  return (
    <Modal closeModalCallBack={() => closeModal(false)}>
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-96 bg-white">
        {/*header*/}
        <div className="flex items-center justify-center p-5 rounded-t">
          <h3 className="text-xl font-semibold">Se connecter à Impot Match</h3>
          <button
            className="flex items-center justify-center h-8 w-8 text-black float-right text-2xl absolute top-2 right-2"
            onClick={() => closeModal(false)}
          >
            ×
          </button>
        </div>
        {/*body*/}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded px-8 pt-6 pb-8"
        >
          <div className="flex flex-col items-baseline mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 ml-1"
              htmlFor="email"
            >
              Courriel
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              type="text"
              placeholder="Courriel@exemple.com"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <span className="text-red-500 ml-1">Le courriel est requis</span>
            )}
          </div>
          <div className="flex flex-col items-baseline mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 ml-1"
              htmlFor="password"
            >
              Mot de passe
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              type="password"
              placeholder="******************"
              {...register('password', { required: true })}
            />
            {errors.password && (
              <span className="text-red-500 ml-1">
                Un mot de passe est requis
              </span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <input
              type="submit"
              value="Se connecter"
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            />
            <a
              className="inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-800"
              href="#"
              onClick={() => switchModal(AuthModalEnum.ResetPassword)}
            >
              Mot de passe oublié?
            </a>
          </div>
        </form>
        <div className="relative flex py-5 px-2 items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-gray-400">ou</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        <div className="px-8 mb-3">
          <AuthButton
            Icon={GoogleIcon}
            onClick={async () => {
              const res = await signInWithGoogle();
              res ? setAuthError(res) : closeModal(false);
            }}
            text="Continuez avec Google"
          ></AuthButton>
          <AuthButton
            Icon={GoogleIcon}
            onClick={async () => {
              const res = await signInWithFacebook()
              res ? setAuthError(res) : closeModal(false)
            }}
            text='Continue with Facebook'
          ></AuthButton>
          {authError && (
            <span className="text-red-500 ml-1">Something went wrong</span>
          )}
        </div>
        <div className="px-8 mb-3">
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
        </div>
        <div className="flex flex-row items-center justify-center mb-8">
          <div className="mr-2">Vous n&apos;avez pas de compte?</div>
          <button
            className="hover:bg-gray-100 text-black font-semibold px-2 py-1 ml-2 border border-black text-sm relative"
            onClick={() => {
              switchModal(AuthModalEnum.SignUp);
            }}
          >
            S&apos;inscrire
          </button>
        </div>
      </div>
    </Modal>
  );
}
