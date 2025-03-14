import React, { useContext, useState } from 'react';
import { AppContext, AppContextType } from '../../../context/AppContext';
import { useForm } from 'react-hook-form';
import { AuthModalEnum } from '../AuthModal';
import { useNavigate } from 'react-router-dom';

interface SignInModalBodyProps {
  closeModal: (show: boolean) => void;
  switchModal: (modal: AuthModalEnum) => void;
  setVerificationId: any;
  setResolver: any;
}

type signInData = {
  email: string;
  password: string;
};

export function SignInModalBody({
  closeModal,
  switchModal,
  setVerificationId,
  setResolver,
}: SignInModalBodyProps) {
  const { signIn } = useContext(AppContext) as AppContextType;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInData>();
  const onSubmit = async (data: signInData) => {
    const [resolvedId, resolver, err] = await signIn(data.email, data.password);

    if (resolver) {
      setVerificationId(resolvedId);
      setResolver(resolver);
    } else if (err) {
      if (err === 'No Two Factor') {
        switchModal(AuthModalEnum.TwoFactor);
        navigate('/profile');
      } else {
        setAuthError(err);
      }
    } else {
      closeModal(false);
      navigate('/profile');
    }
  };
  const [authError, setAuthError] = useState('');

  return (
    <>
      {/*header*/}
      <div className="flex items-center justify-center p-5 rounded-t">
        <h3 className="text-xl font-semibold">Se connecter à Impôts Match</h3>
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
            id="connect-button"
            type="submit"
            value="Se connecter"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          />
          <a
            className="inline-block align-baseline font-bold text-sm text-orange-500 hover:text-orange-700"
            href="#"
            onClick={() => switchModal(AuthModalEnum.ResetPassword)}
          >
            Mot de passe oublié?
          </a>
        </div>
      </form>

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
      {authError && (
        <span className="text-red-500 text-center mb-2">
          Courriel ou mot de passe invalide
        </span>
      )}
    </>
  );
}
