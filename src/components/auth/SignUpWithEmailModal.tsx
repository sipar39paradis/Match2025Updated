import React, { useContext, useEffect, useState } from 'react';
import { AppContext, AppContextType } from '../../context/AppContext';
import { AuthModalEnum } from './AuthModal';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ReactComponent as CheckMark } from '../../icons/CheckMark.svg';
import { Toast } from 'flowbite-react';
import { HiX } from 'react-icons/hi';

const formSchema = Yup.object().shape({
  firstName: Yup.string().required('Le prénom est requis'),
  lastName: Yup.string().required('Le nom de famille est requis'),
  email: Yup.string()
    .email()
    .min(6, "L'adresse courriel doit être au moins 6 caractères"),
  password: Yup.string()
    .required('Mot de passe requis')
    .min(12, 'Le mot de passe doit être au moins 12 caractères')
    .matches(
      /[a-z]/,
      'Le mot de passe doit contenir au moins une lettre minuscule'
    )
    .matches(
      /[A-Z]/,
      'Le mot de passe doit contenir au moins une lettre majuscule'
    )
    .matches(/[0-9]/, 'Le mot de passe doit contenir au moins un numéro')
    .matches(/[^\w]/, 'Le mot de passe doit contenir au moins un symbole'),

  confirmationPassword: Yup.string()
    .required('Confirmation du mot de passe requis')
    .oneOf([Yup.ref('password')], 'Les mots de passe doivent être identique'),
});

interface SignUpWithEmailModalProps {
  closeModal: (show: boolean) => void;
  switchModal: (modal: AuthModalEnum) => void;
}

export type signUpWithEmailData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmationPassword: string;
  referralCode: string;
};

export function SignUpWithEmailModal(props: SignUpWithEmailModalProps) {
  const navigate = useNavigate();
  const { closeModal, switchModal } = props;
  const {
    signUpWithEmailAndPassword,
    setCreateUserParams,
    err,
    createUserParams,        
    donePolicy,
    doneConditions,
    setErr,
    setModalToDisplay,
    setShowModal,
    setDonePolicy,
    setDoneConditions
  } = useContext(AppContext) as AppContextType;

  const [authError, setAuthError] = useState('');
  const [showPassWordPolicy, setShowPasswordPolicy] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<signUpWithEmailData>({ resolver: yupResolver(formSchema) });
  const formData = watch();
  const onSubmit = async (data: signUpWithEmailData) => {
    if (donePolicy && doneConditions) {
      
      const newError = await signUpWithEmailAndPassword(
        data.email,
        data.password,
        data.firstName,
        data.lastName,
        data.referralCode
      );
      if (newError) {
        if(newError === 'No Two Factor'){
          setErr(null)
          setModalToDisplay(AuthModalEnum.TwoFactor)
          setShowModal(true)
          navigate('/profile');
          setDonePolicy(false);
          setDoneConditions(false)
        }else{
          setErr(newError)
        }

      } else {
        setErr(null)
        navigate('/profile');
      }


    }else{
      closeModal(false);
      setCreateUserParams(data);
      navigate({
        pathname: '/userConditions',
        search: '?signup=true&type=email',
    });
  }
  

  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

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
      <div className="flex flex-col space-y-3.5 bg-white rounded p-8 mb-2">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded">
          <div className="flex flex-col items-baseline mb-4 w-96">
            <div className="flex flex-row mb-4 gap-2">
              <div className="flex flex-col items-baseline w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">
                  Prénom
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  type="text"
                  placeholder="Prénom"
                  {...register('firstName')}
                  defaultValue={err ? createUserParams.firstName : null}
                />
                {errors.firstName && (
                  <span className="text-red-500 ml-1">
                    {errors.firstName?.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col items-baseline w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">
                  Nom de famille
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  type="text"
                  placeholder=" Nom de famille"
                  {...register('lastName')}
                  defaultValue={err ? createUserParams.lastName : null}
                />
                {errors?.lastName && (
                  <span className="text-red-500 ml-1">
                    {errors.lastName?.message}
                  </span>
                )}
              </div>
            </div>
            <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">
              Courriel
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              type="text"
              placeholder="Courriel"
              {...register('email')}
              defaultValue={err ? createUserParams.email : null}
            />
            {errors?.email && (
              <span className="text-red-500 ml-1">{errors.email?.message}</span>
            )}
            {err === 'Firebase: Error (auth/email-already-in-use).' && (
              <span className="text-red-500 ml-1">Cet email est déjà utilisé</span>
            )}
            {authError && (
              <span className="text-red-500 ml-1">
                Adresse courriel déjà utilisé
              </span>
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
              {...register('password')}
              onFocus={() => {
                setShowPasswordPolicy(true);
              }}
              onBlur={() => {
                setShowPasswordPolicy(false);
              }}
            />
            {errors?.password && (
              <span className="text-red-500 ml-1">
                {errors.password?.message}
              </span>
            )}
            {showPassWordPolicy && (
              <div className="bg-gray-100 rounded-sm mt-2 p-2 w-full">
                <ul>
                  <li className="flex flex-row gap-2 items-center">
                    {formData.password.length >= 12 && (
                      <CheckMark className="text-green-500 h-5" />
                    )}
                    <p
                      className={`${
                        formData.password.length >= 12
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      Au moins 12 caractères
                    </p>
                  </li>
                  <li className="flex flex-row gap-2 items-center">
                    {/[A-Z]/.test(formData.password) && (
                      <CheckMark className="text-green-500 h-5" />
                    )}
                    <p
                      className={`${
                        /[A-Z]/.test(formData.password)
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      Au moins une majuscule
                    </p>
                  </li>
                  <li className="flex flex-row gap-2 items-center">
                    {/[a-z]/.test(formData.password) && (
                      <CheckMark className="text-green-500 h-5" />
                    )}
                    <p
                      className={`${
                        /[a-z]/.test(formData.password)
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      Au moins une minuscule
                    </p>
                  </li>
                  <li className="flex flex-row gap-2 items-center">
                    {/[0-9]/.test(formData.password) && (
                      <CheckMark className="text-green-500 h-5" />
                    )}
                    <p
                      className={`${
                        /[0-9]/.test(formData.password)
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      Au moins un chiffre
                    </p>
                  </li>
                  <li className="flex flex-row gap-2 items-center">
                    {/[^\w]/.test(formData.password) && (
                      <CheckMark className="text-green-500 h-5" />
                    )}
                    <p
                      className={`${
                        /[^\w]/.test(formData.password)
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      Au moins caractères spécial (!@#$%^&*)(+=_-)
                    </p>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="flex flex-col items-baseline mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">
              Confirmation du mot de passe
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              type="password"
              placeholder="******************"
              {...register('confirmationPassword')}
            />
            {errors.confirmationPassword && (
              <span className="text-red-500 ml-1">
                {errors.confirmationPassword.message}
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
              defaultValue={err ? createUserParams.referralCode : null}
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
