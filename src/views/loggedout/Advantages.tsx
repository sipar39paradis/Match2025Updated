import React from 'react';
import Fade from 'react-reveal';
import { ReactComponent as ArrowCircle } from '../../icons/ArrowCircle.svg';
import { ReactComponent as ChatBubble } from '../../icons/ChatBubble.svg';
import { ReactComponent as CheckMark } from '../../icons/CheckMark.svg';
import { ReactComponent as Computer } from '../../icons/Computer.svg';
import { ReactComponent as Clock } from '../../icons/Clock.svg';

export function Advantages() {
  return (
    <section
      id="advantages"
      className="pt-14 sm:pt-20 lg:pt-[130px] animate__animated animate__bounceInLeft"
    >
      <div className="xl:container m-auto">
        <div className="relative overflow-hidden w-full pt-[56.25%]">
          <iframe
            className="absolute top-o left-0 bottom-0 right-0 w-full h-full"
            src="https://www.youtube.com/embed/ZYNy9C85Db4"
          ></iframe>
        </div>
      </div>
      <Fade left big cascade>
        <div className="px-4 xl:container m-auto">
          <div className="relative mx-auto mb-12 pt-6 text-center lg:mb-20 lg:pt-16">
            <h2 className="mx-auto mb-5 font-heading text-3xl font-semibold sm:text-4xl md:text-[50px] md:leading-[60px]">
              Avantages Impôts Match
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:px-48 md:px-16">
            <div className="flex flex-row items-center">
              <div className="mr-8 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 bg-opacity-5 text-orange-500 transition group-hover:bg-orange-500 group-hover:bg-opacity-100 group-hover:text-white dark:bg-white dark:bg-opacity-5 dark:text-white dark:group-hover:bg-primary dark:group-hover:bg-opacity-100">
                <ArrowCircle className="h-10" />
              </div>
              <h3 className="font-heading text-xl font-medium text-dark dark:text-white sm:text-2xl opacity-60">
                Tarification dynamique qui s’ajuste à votre dossier, vous payez
                selon vos besoins
              </h3>
            </div>
            <div className="flex flex-row items-center">
              <div className="mr-8 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 bg-opacity-5 text-orange-500 transition group-hover:bg-orange-500 group-hover:bg-opacity-100 group-hover:text-white dark:bg-white dark:bg-opacity-5 dark:text-white dark:group-hover:bg-primary dark:group-hover:bg-opacity-100">
                <Clock className="h-10" />
              </div>
              <h3 className="font-heading text-xl font-medium text-dark dark:text-white sm:text-2xl opacity-60">
                Prise en charge par un professionnel compétent en moins de 12h
              </h3>
            </div>
            <div className="flex flex-row items-center">
              <div className="mr-8 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 bg-opacity-5 text-orange-500 transition group-hover:bg-orange-500 group-hover:bg-opacity-100 group-hover:text-white dark:bg-white dark:bg-opacity-5 dark:text-white dark:group-hover:bg-primary dark:group-hover:bg-opacity-100">
                <Computer className="h-10" />
              </div>
              <h3 className="font-heading text-xl font-medium text-dark dark:text-white sm:text-2xl opacity-60">
                Service 100% à distance
              </h3>
            </div>
            <div className="flex flex-row items-center">
              <div className="mr-8 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 bg-opacity-5 text-orange-500 transition group-hover:bg-orange-500 group-hover:bg-opacity-100 group-hover:text-white dark:bg-white dark:bg-opacity-5 dark:text-white dark:group-hover:bg-primary dark:group-hover:bg-opacity-100">
                <CheckMark className="h-10" />
              </div>
              <h3 className="font-heading text-xl font-medium text-dark dark:text-white sm:text-2xl opacity-60">
                Tous les dossiers sont révisés par un CPA
              </h3>
            </div>

            {/* <div className="flex flex-row items-center">
              <div className="mr-8 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 bg-opacity-5 text-orange-500 transition group-hover:bg-orange-500 group-hover:bg-opacity-100 group-hover:text-white dark:bg-white dark:bg-opacity-5 dark:text-white dark:group-hover:bg-primary dark:group-hover:bg-opacity-100">
                <ChatBubble className="h-10" />
              </div>
              <h3 className="font-heading text-xl font-medium text-dark dark:text-white sm:text-2xl opacity-60">
                Communications avec l’équipe d’impôts match selon vos
                préférences; clavardage, courriel et vidéoconférence sur
                rendez-vous
              </h3>
            </div> */}
          </div>
        </div>
      </Fade>
    </section>
  );
}
