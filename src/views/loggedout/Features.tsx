import React from 'react';
import Fade from 'react-reveal';
import { ReactComponent as UserCircle } from '../../icons/UserCircle.svg';
import { ReactComponent as ClipboardDocument } from '../../icons/ClipboardDocument.svg';
import { ReactComponent as DollarSign } from '../../icons/DollarSign.svg';
import { ReactComponent as DocumentArrowDown } from '../../icons/DocumentArrowDown.svg';
import { ReactComponent as Hourglass } from '../../icons/Hourglass.svg';
import { ReactComponent as Calculator } from '../../icons/Calculator.svg';
import { ReactComponent as Arrow } from '../../icons/Arrow.svg';

export function Features() {
  return (
    <section id="features" className={'pt-14 sm:pt-20 lg:pt-[130px]'}>
      <div className="px-4 xl:container m-auto">
        {/* <!-- Section Title --> */}
        <Fade top>
          <div className="relative flex flex-col gap-2 w-full mb-12 pt-6 text-center md:mb-20 lg:pt-16 items-center">
            <h2 className="mb-5 font-heading text-3xl font-semibold text-dark dark:text-white sm:text-4xl md:text-[50px] md:leading-[60px] w-full">
              Découvrez comment utiliser notre service
            </h2>
          </div>
        </Fade>
        <Fade bottom cascade>
          <div className="-mx-4 flex flex-wrap md:flex-nowrap lg:flex-wrap justify-center items-center">
            <div className="w-full px-4 md:w-1/2 lg:w-1/5">
              <div className="group mx-auto max-w-[380px] text-center md:">
                <div className="mx-auto mb-6 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-orange-500 bg-opacity-5 text-orange-500 transition group-hover:bg-orange-500 group-hover:bg-opacity-100 group-hover:text-white dark:bg-white dark:bg-opacity-5 dark:text-white dark:group-hover:bg-primary dark:group-hover:bg-opacity-100 md:mb-9 md:h-[90px] md:w-[90px]">
                  <UserCircle className="h-16"></UserCircle>
                </div>
                <div>
                  <h3 className="mb-3 font-heading text-xl font-medium text-dark dark:text-white sm:text-2xl md:mb-5">
                    Créer votre compte
                  </h3>
                  <p className="text-base text-dark-text">
                    Aller via l’option ‘’s’inscrire’’ pour créer votre compte
                    Impôts Match
                  </p>
                </div>
              </div>
            </div>
            <Arrow className="h-16 lg:w-1/5 transform !rotate-90 my-6 md:!transform-none"></Arrow>
            <div className="w-full px-4 md:w-1/2 lg:w-1/5">
              <div className="group mx-auto  max-w-[380px] text-center md:">
                <div className="mx-auto mb-6 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-orange-500 bg-opacity-5 text-orange-500 transition group-hover:bg-orange-500 group-hover:bg-opacity-100 group-hover:text-white dark:bg-white dark:bg-opacity-5 dark:text-white dark:group-hover:bg-primary dark:group-hover:bg-opacity-100 md:mb-9 md:h-[90px] md:w-[90px]">
                  <ClipboardDocument className="h-16"></ClipboardDocument>
                </div>
                <div>
                  <h3 className="mb-3 font-heading text-xl font-medium text-dark dark:text-white sm:text-2xl md:mb-5">
                    Remplissez notre questionnaire
                  </h3>
                  <p className="text-base text-dark-text">
                    Une fois sur votre profile remplissez notre questionnaire
                    simple et interactif
                  </p>
                </div>
              </div>
            </div>
            <Arrow className="h-16 lg:w-1/5 transform !rotate-90 my-6 md:!transform-none"></Arrow>
            <div className="w-full px-4 md:w-1/2 lg:w-1/5">
              <div className="group mx-auto  max-w-[380px] text-center md:">
                <div className="mx-auto mb-6 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-orange-500 bg-opacity-5 text-orange-500 transition group-hover:bg-orange-500 group-hover:bg-opacity-100 group-hover:text-white dark:bg-white dark:bg-opacity-5 dark:text-white dark:group-hover:bg-primary dark:group-hover:bg-opacity-100 md:mb-9 md:h-[90px] md:w-[90px]">
                  <DollarSign className="h-16"></DollarSign>
                </div>
                <div>
                  <h3 className="mb-3 font-heading text-xl font-medium text-dark dark:text-white sm:text-2xl md:mb-5">
                    Obtenez votre prix
                  </h3>
                  <p className="text-base text-dark-text">
                    Vous obtiendrez votre prix 100% adapté; vous paierez
                    exactement en fonction des spécificités de votre dossier
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center md:items-end md:justify-end lg:my-8">
            <Arrow className="h-16 md:h-[48px] transform !rotate-90 my-6 lg:w-1/5 md:mr-[84px] lg:mr-0 lg:h-16"></Arrow>
          </div>
          <div className="-mx-4 flex flex-wrap md:flex-nowrap lg:flex-wrap justify-center items-center">
            <div className="w-full px-4 md:w-1/2 lg:w-1/5">
              <div className="group mx-auto  max-w-[380px] text-center md:">
                <div className="mx-auto mb-6 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-orange-500 bg-opacity-5 text-orange-500 transition group-hover:bg-orange-500 group-hover:bg-opacity-100 group-hover:text-white dark:bg-white dark:bg-opacity-5 dark:text-white dark:group-hover:bg-primary dark:group-hover:bg-opacity-100 md:mb-9 md:h-[90px] md:w-[90px]">
                  <Calculator className="h-16"></Calculator>
                </div>
                <div>
                  <h3 className="mb-3 font-heading text-xl font-medium text-dark dark:text-white sm:text-2xl md:mb-5">
                    À notre tour de jouer!
                  </h3>
                  <p className="text-base text-dark-text">
                    Nous vous contacterons lorsque le traitement de votre
                    dossier sera terminé
                  </p>
                </div>
              </div>
            </div>
            <Arrow className="h-16 lg:w-1/5 transform !rotate-90 my-6 md:!rotate-180"></Arrow>
            <div className="w-full px-4 md:w-1/2 lg:w-1/5">
              <div className="group mx-auto  max-w-[380px] text-center md:">
                <div className="mx-auto mb-6 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-orange-500 bg-opacity-5 text-orange-500 transition group-hover:bg-orange-500 fill-orange-500 group-hover:bg-opacity-100 group-hover:text-white group-hover:fill-white dark:bg-white dark:bg-opacity-5 dark:text-white dark:group-hover:bg-primary dark:group-hover:bg-opacity-100 md:mb-9 md:h-[90px] md:w-[90px]">
                  <Hourglass className="h-16"></Hourglass>
                </div>
                <div>
                  <h3 className="mb-3 font-heading text-xl font-medium text-dark dark:text-white sm:text-2xl md:mb-5">
                    Prise en charge du dossier
                  </h3>
                  <p className="text-base text-dark-text">
                    Vos documents seront acheminés à un membre de notre équipe
                    d’experts
                  </p>
                </div>
              </div>
            </div>
            <Arrow className="h-16 lg:w-1/5 transform !rotate-90 my-6 md:!rotate-180"></Arrow>
            <div className="w-full px-4 md:w-1/2 lg:w-1/5">
              <div className="group mx-auto max-w-[380px] text-center md:">
                <div className="mx-auto mb-6 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-orange-500 bg-opacity-5 text-orange-500 transition group-hover:bg-orange-500 group-hover:bg-opacity-100 group-hover:text-white dark:bg-white dark:bg-opacity-5 dark:text-white dark:group-hover:bg-primary dark:group-hover:bg-opacity-100 md:mb-9 md:h-[90px] md:w-[90px]">
                  <DocumentArrowDown className="h-16"></DocumentArrowDown>
                </div>
                <div>
                  <h3 className="mb-3 font-heading text-xl font-medium text-dark dark:text-white sm:text-2xl md:mb-5">
                    Déposer les documents
                  </h3>
                  <p className="text-base text-dark-text">
                    Déposer vos documents ; En fonction de votre dossier, vous
                    pourrez déposer vos documents qui nous seront nécessaires
                    afin que l’on puisse préparer votre dossier
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}
