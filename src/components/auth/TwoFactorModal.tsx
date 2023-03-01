import React, { useContext, useRef, useState } from 'react';
import { AppContext, AppContextType } from '../../context/AppContext';
import { AuthButton } from './AuthButton';
import { ReactComponent as GoogleIcon } from '../../icons/GoogleIcon.svg';
import { ReactComponent as EnvelopeIcon } from '../../icons/EnvelopeIcon.svg';
import { AuthModalEnum } from './AuthModal';
import { Button, Label, TextInput } from 'flowbite-react';

interface TwoFactorModalProps {
  closeModal: (show: boolean) => void;
  switchModal: (modal: AuthModalEnum) => void;
}

const fillWithX = (phone: string) => {
  let newPhone = phone
  for(let i = 0; i < 10 - phone.length; i++){
    newPhone = newPhone + 'X'
  }
  return [newPhone.substring(0,3), newPhone.substring(3,6), newPhone.substring(6,10)].join('-')
}

export function TwoFactorModal(props: TwoFactorModalProps) {
  const { enrollTwoFactor, verifyEnrollingTwoFactor } = useContext(AppContext) as AppContextType;
  const { closeModal, switchModal } = props;
  const [phoneNumber, setPhoneNumber] = useState('')
  const [promiseFromText, setPromiseFromText] = useState<Promise<string>>(null)
  const [verificationCode, setVerificationCode] = useState('')

  return (
    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[28rem] bg-white p-8">
      {/*header*/}
      <div className="flex items-center justify-center p-5 mb-5">
        <div className='flex flex-col'>
          <h3 className="text-xl font-semibold">Authentification à deux facteurs</h3>
          <p>{"Veuillez activer l'authentification à deux facteurs pour commencer à utiliser Impots Match."}</p>
        </div>
        
        {/* <button
          className="flex items-center justify-center h-8 w-8 text-black float-right text-2xl absolute top-2 right-2"
          onClick={() => closeModal(false)}
        >
          ×
        </button> */}
      </div>
      {/*body*/}
      <form className="flex flex-col gap-4">
        <div>
          {!promiseFromText ? 
            <>
              <div className="mb-2 block">
                <Label
                  htmlFor="phone1"
                  value="Votre numéro de téléphone"
                />
              </div>
              <TextInput
                className='text-center select-none'
                id="phone1"
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                value={fillWithX(phoneNumber)}
                required={true}
                onChange={(e) => {
                  const value = e.target.value
                  console.log(value, 'value')
                  if(value.length < 12){ // backspace
                    setPhoneNumber(phoneNumber.substring(0, phoneNumber.length -1))
                    return
                  }
                  const filtered = value.replaceAll('-', '').replaceAll('X', '')
                  console.log(filtered, 'filtered')
                  console.log(phoneNumber, 'phoneNumber')
                
                  if(!isNaN(+filtered) && phoneNumber.length !== 10){
                    setPhoneNumber(filtered)
                  }
                }}
              />
            </>
            :
            <>
              <div className="mb-2 block">
                <Label
                  htmlFor="phone1"
                  value="Le code de vérification"
                />
              </div>
              <TextInput
                className='text-center select-none'
                id="verifivation"
                type="number"
                required={true}
                onChange={(e) => {
                  setVerificationCode(e.target.value)
                  
                }}
              />
            </>
          }

        </div>
        <div>
        </div>
        <Button type="submit"
        id='two-factor-button'
        onClick={() => {
          if(!promiseFromText){ 
            setPromiseFromText(enrollTwoFactor(phoneNumber))
          }
          else{
            verifyEnrollingTwoFactor(promiseFromText, verificationCode)
            closeModal(true)
          }
        }}>
          Submit
        </Button>
      </form>

    </div>
    
  );
}
