import React, { useContext, useState } from 'react';
import { AppContext, AppContextType } from '../../context/AppContext';
import { AuthModalEnum } from './AuthModal';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface SignUpWithEmailModalProps {
  closeModal: (show: boolean) => void;
  switchModal: (modal: AuthModalEnum) => void;
}

type signUpWithEmailData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordVerification: string;
  referralCode: string;
};

export function SignUpWithEmailModal(props: SignUpWithEmailModalProps) {
  const navigate = useNavigate();
  const { closeModal, switchModal } = props;
  const { signUpWithEmailAndPassword } = useContext(
    AppContext
  ) as AppContextType;

  const [authError, setAuthError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<signUpWithEmailData>();
  const onSubmit = async (data: signUpWithEmailData) => {
    if (data.password !== data.passwordVerification) {
      errors.passwordVerification;
    } else {
      const res = await signUpWithEmailAndPassword(
        data.email,
        data.password,
        data.firstName,
        data.lastName,
        data.referralCode
      );
      if (res) {
        setAuthError(res);
      } else {
        closeModal(false);
        navigate('/profile');
      }
    }
  };

  return (
    <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white">
      {/*header*/}
      <div className="flex items-center justify-center p-5 mb-2">
        <h3 className="text-xl font-semibold">Inscription à Impôts Match</h3>
        <button
          className="flex items-center justify-center h-8 w-8 text-black float-right text-2xl absolute top-2 right-2"
          onClick={() => closeModal(false)}
        >
          ×
        </button>
      </div>
      {/*body*/}
      <div className="flex flex-col space-y-3.5 bg-white rounded pt-2 pb-8 mb-2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded px-8 pt-6 pb-8"
        >
          <div className="flex flex-col items-baseline mb-4 w-96">
            <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">
              Courriel
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              type="text"
              placeholder="Courriel"
              {...register('email', { required: true, minLength: 6 })}
            />
            {errors.email && (
              <span className="text-red-500 ml-1">Courriel requis</span>
            )}
            {authError && (
              <span className="text-red-500 ml-1">{authError}</span>
            )}
          </div>
          <div className="flex flex-col items-baseline mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">
              Mot de passe
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              type="password"
              placeholder="******************"
              {...register('password', { required: true, minLength: 7 })}
            />
            {errors.password && (
              <span className="text-red-500 ml-1">
                Le mot de passe doit être au moins 7 charactères
              </span>
            )}
          </div>
          <div className="flex flex-col items-baseline mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">
              Ressaisir le mot de passe
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              type="password"
              placeholder="******************"
              {...register('passwordVerification', {
                required: true,
                minLength: 7,
                validate: (val: string) => {
                  if (watch('password') != val) {
                    return 'Les mots de passe doivent être identique';
                  }
                },
              })}
            />
            {errors.passwordVerification && (
              <span className="text-red-500 ml-1">
                {errors.passwordVerification.message}
              </span>
            )}
          </div>
          <div className="flex flex-col items-baseline mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">
              Code de référence
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              type="text"
              placeholder="ABCD1234"
              {...register('referralCode', { required: false })}
            />
          </div>
          <input
            type="submit"
            value="S'inscrire"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 w-full rounded cursor-pointer"
          />
        </form>
      </div>
      {/*footer*/}
      <div className="flex flex-row items-center justify-center mb-8">
        <div className="mr-2">Vous avez déjà un compte?</div>
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
