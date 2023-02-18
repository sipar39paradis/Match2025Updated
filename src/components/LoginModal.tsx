import React, { useContext } from 'react';
import { AppContext, AppContextType } from '../context/AppContext';
import { ReactComponent as GoogleIcon } from '../icons/GoogleIcon.svg';

interface LoginModalProps {
  setShowLoginModal: (show: boolean) => void;
}

export function LoginModal(props: LoginModalProps) {
  const { setShowLoginModal } = props;
  const { signInWithGoogle } = useContext(AppContext) as AppContextType;
  const { signInWithFacebook } = useContext(AppContext) as AppContextType;

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
        <div className="relative mb-96 mx-auto w-96">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none">
            {/*header*/}
            <div className="flex items-center justify-center p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-xl font-semibold">
                Se connecter à Impôts Match
              </h3>
              <button
                className="flex items-center justify-center h-8 w-8 text-black float-right text-2xl absolute top-2 right-2"
                onClick={() => setShowLoginModal(false)}
              >
                ×
              </button>
            </div>
            {/*body*/}
            <form className="bg-white rounded px-8 pt-6 pb-8 border-b border-solid border-slate-200">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                  placeholder="Email"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight"
                  id="password"
                  type="password"
                  placeholder="******************"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                  type="button"
                >
                  Sign In
                </button>
                <a
                  className="inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-800"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
            </form>
            <div className="p-4 px-8">
              <button
                className=" hover:bg-gray-100 text-black font-semibold py-2 px-4 w-full rounded border border-black text-sm relative"
                type="button"
                onClick={async () => {
                  await signInWithGoogle();
                  setShowLoginModal(false);
                }}
              >
                <GoogleIcon className="absolute  h-7 bottom-1" />
                Continue with Google
              </button>
              <button
                className=" hover:bg-gray-100 text-black font-semibold py-2 px-4 w-full rounded border border-black text-sm relative"
                type="button"
                onClick={async () => {
                  signInWithFacebook();
                  setShowLoginModal(false);
                }}
              >
                Continue with Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
