import React, { useContext } from 'react';
import { ReactComponent as UserCircle } from '../../icons/UserCircle.svg';
import { ReactComponent as ClipboardDocument } from '../../icons/ClipboardDocument.svg';
import { ReactComponent as DollarSign } from '../../icons/DollarSign.svg';
import { ReactComponent as Handshake } from '../../icons/Handshake.svg';
import { Button } from 'flowbite-react';
import { AppContext, AppContextType } from '../../context/AppContext';
import { AuthModalEnum } from '../../components/auth/AuthModal'; 

export function Features() {
  // Retrieve modal functions from AppContext
  const { setModalToDisplay, setShowModal } = useContext(AppContext) as AppContextType;

  // Function to open the modal
  function displayModal(modal: AuthModalEnum) {
    setModalToDisplay(modal);
    setShowModal(true);
  }

  return (
    <section id="features" className={'pt-14 sm:pt-20 lg:pt-[130px]'}>
      <div className="px-4 xl:container m-auto">
        {/* <!-- Section Title --> */}
        <div className="relative flex flex-col gap-2 w-full mb-12 pt-6 text-center md:mb-20 lg:pt-16 items-center">
          <h2 className="mb-5 font-heading text-3xl font-semibold text-dark dark:text-white sm:text-4xl md:text-[50px] md:leading-[60px] w-full">
            Découvrez comment utiliser notre service
          </h2>
        </div>

        {/* <!-- Grid 4 colonnes alignées --> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center items-start">
          
          {/* Étape 1 */}
          <div className="w-full px-4 flex flex-col items-center text-center">
            <div className="mb-6 flex h-[90px] w-[90px] items-center justify-center rounded-full bg-orange-500 bg-opacity-5 text-orange-500 transition group-hover:bg-orange-500 group-hover:bg-opacity-100 group-hover:text-white dark:bg-white dark:bg-opacity-5 dark:text-white dark:group-hover:bg-primary dark:group-hover:bg-opacity-100">
              <UserCircle className="h-16 w-16"></UserCircle>
            </div>
            <h3 className="mb-3 font-heading text-xl font-medium text-dark dark:text-white sm:text-2xl">
              Créer votre compte
            </h3>
            <p className="text-base text-dark-text">
              Allez dans l&apos;option <strong>Débutez maintenant</strong> pour créer votre compte Impôts Match.
            </p>
          </div>

          {/* Étape 2 */}
          <div className="w-full px-4 flex flex-col items-center text-center">
            <div className="mb-6 flex h-[90px] w-[90px] items-center justify-center rounded-full bg-orange-500 bg-opacity-5 text-orange-500 transition group-hover:bg-orange-500 group-hover:bg-opacity-100 group-hover:text-white dark:bg-white dark:bg-opacity-5 dark:text-white dark:group-hover:bg-primary dark:group-hover:bg-opacity-100">
              <ClipboardDocument className="h-16 w-16"></ClipboardDocument>
            </div>
            <h3 className="mb-3 font-heading text-xl font-medium text-dark dark:text-white sm:text-2xl">
              Remplissez notre questionnaire
            </h3>
            <p className="text-base text-dark-text">
              Répondez à quelques questions simples pour nous aider à optimiser votre déclaration.
            </p>
          </div>

          {/* Étape 3 */}
          <div className="w-full px-4 flex flex-col items-center text-center">
            <div className="mb-6 flex h-[90px] w-[90px] items-center justify-center rounded-full bg-orange-500 bg-opacity-5 text-orange-500 transition group-hover:bg-orange-500 group-hover:bg-opacity-100 group-hover:text-white dark:bg-white dark:bg-opacity-5 dark:text-white dark:group-hover:bg-primary dark:group-hover:bg-opacity-100">
              <DollarSign className="h-16 w-16"></DollarSign>
            </div>
            <h3 className="mb-3 font-heading text-xl font-medium text-dark dark:text-white sm:text-2xl">
              Obtenez votre prix
            </h3>
            <p className="text-base text-dark-text">
              Un tarif 100% adapté à votre dossier, sans surprise.
            </p>
          </div>

          {/* Étape 4 : Prise en charge */}
          <div className="w-full px-4 flex flex-col items-center text-center">
            <div className="mb-6 flex h-[90px] w-[90px] items-center justify-center rounded-full bg-orange-500 bg-opacity-5 text-orange-500 transition group-hover:bg-orange-500 group-hover:bg-opacity-100 group-hover:text-white dark:bg-white dark:bg-opacity-5 dark:text-white dark:group-hover:bg-primary dark:group-hover:bg-opacity-100">
              <Handshake className="h-16 w-16 fill-current text-orange-500 group-hover:text-white"></Handshake>
            </div>
            <h3 className="mb-3 font-heading text-xl font-medium text-dark dark:text-white sm:text-2xl">
              Prise en charge du dossier
            </h3>
            <p className="text-base text-dark-text">
              Vos documents sont analysés par un comptable CPA pour un traitement optimal.
            </p>
          </div>

          {/* Étape mise en commentaires */}
          {/*
          <div className="w-full px-4 flex flex-col items-center text-center">
            <div className="mb-6 flex h-[90px] w-[90px] items-center justify-center rounded-full bg-orange-500 bg-opacity-5 text-orange-500 transition group-hover:bg-orange-500 group-hover:bg-opacity-100 group-hover:text-white dark:bg-white dark:bg-opacity-5 dark:text-white dark:group-hover:bg-primary dark:group-hover:bg-opacity-100">
              <Hourglass className="h-16 w-16"></Hourglass>
            </div>
            <h3 className="mb-3 font-heading text-xl font-medium text-dark dark:text-white sm:text-2xl">
              À notre tour de jouer !
            </h3>
            <p className="text-base text-dark-text">
              Nous vous contactons dès que votre déclaration est prête.
            </p>
          </div>
          */}  

        </div>

        {/* <!-- CTA with Modal --> */}
        <div className="flex justify-center mt-[100px]">
          <Button color={'dark'} className="w-2/5 max-w-[1200px]" onClick={() => displayModal(AuthModalEnum.SignUp)}>
            <span>Débutez maintenant</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
