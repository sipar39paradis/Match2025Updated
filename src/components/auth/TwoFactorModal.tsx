import React, { useContext, useEffect, useState } from 'react';
import { AppContext, AppContextType } from '../../context/AppContext';
import { AuthModalEnum } from './AuthModal';
import { Button, Label, TextInput } from 'flowbite-react';

interface TwoFactorModalProps {
  closeModal: (show: boolean) => void;
  switchModal: (modal: AuthModalEnum) => void;
}

const fillWithX = (phone: string) => {
  let newPhone = phone;
  for (let i = 0; i < 10 - phone.length; i++) {
    newPhone = newPhone + 'X';
  }
  return [
    newPhone.substring(0, 3),
    newPhone.substring(3, 6),
    newPhone.substring(6, 10),
  ].join('-');
};

export function TwoFactorModal(props: TwoFactorModalProps) {
  const { user, sendEmail } = useContext(AppContext) as AppContextType;
  const { enrollTwoFactor, verifyEnrollingTwoFactor, setIsInSensitive } =
    useContext(AppContext) as AppContextType;
  const { closeModal } = props;
  const [refresh, setRefresh] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [promiseFromText, setPromiseFromText] = useState<Promise<string>>(null);
  const [verificationCode, setVerificationCode] = useState('');

  if (!user) {
    closeModal(false);
  }

  if (user && !user.emailVerified) {
    setTimeout(() => {
      if (!user) {
        closeModal(false);
      } else {
        user.reload();
        setRefresh(refresh * -1);
      }
    }, 10000);
  }

  useEffect(() => {
    setIsInSensitive(true);
    // return (() => setIsInSensitive(false))
  }, []);

  return (
    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[28rem] bg-white p-8">
      {/*header*/}
      {user && user.emailVerified ? (
        <>
          <div className="flex items-center justify-center p-5 mb-5">
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold">
                Authentification à deux facteurs
              </h3>
              <p>
                {
                  "Veuillez activer l'authentification à deux facteurs pour commencer à utiliser Impots Match."
                }
              </p>
              <p className="pt-4">
                Ceci est important pour protéger vos informations personnelles
              </p>
            </div>
          </div>

          <form className="flex flex-col gap-4">
            <div>
              {!promiseFromText ? (
                <>
                  <div className="mb-2 block">
                    <Label htmlFor="phone1" value="Votre numéro de téléphone" />
                  </div>
                  <TextInput
                    className="text-center select-none"
                    id="phone1"
                    type="tel"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    value={fillWithX(phoneNumber)}
                    required={true}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length < 12) {
                        // backspace
                        setPhoneNumber(
                          phoneNumber.substring(0, phoneNumber.length - 1)
                        );
                        return;
                      }
                      const filtered = value
                        .replaceAll('-', '')
                        .replaceAll('X', '');

                      if (!isNaN(+filtered) && phoneNumber.length !== 10) {
                        setPhoneNumber(filtered);
                      }
                    }}
                  />
                </>
              ) : (
                <>
                  <div className="mb-2 block">
                    <Label htmlFor="phone1" value="Le code de vérification" />
                  </div>
                  <TextInput
                    className="text-center select-none"
                    id="verifivation"
                    type="number"
                    required={true}
                    onChange={(e) => {
                      setVerificationCode(e.target.value);
                    }}
                  />
                </>
              )}
            </div>
            <Button
              type="submit"
              id="two-factor-button"
              onClick={async () => {
                if (!promiseFromText) {
                  setPromiseFromText(enrollTwoFactor(phoneNumber));
                } else {
                  await verifyEnrollingTwoFactor(
                    promiseFromText,
                    verificationCode
                  );
                  setIsInSensitive(false);
                  closeModal(false);
                }
              }}
            >
              Soumettre
            </Button>
          </form>
        </>
      ) : (
        <div className="flex items-center justify-center p-5 mb-5">
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold pb-4">
              Vérifiez votre e-mail
            </h3>
            <p>
              Un courriel vous a été envoyé, veuillez vérifier votre boite.
              Attention, ce courriel peut se retrouver dans vos indésirables.
              <span
                className=" text-orange-500 font-semibold cursor-pointer"
                onClick={() => sendEmail()}
              >
                {' '}
                Cliquez ici{' '}
              </span>
              pour renvoyer le courriel de vérification.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
