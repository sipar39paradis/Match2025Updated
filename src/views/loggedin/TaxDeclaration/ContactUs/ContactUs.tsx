import React, { useContext, useRef } from 'react';
import emailjs from '@emailjs/browser';
import {
  QuestionnaireContext,
  QuestionnaireContextType,
} from '../context/QuestionnaireContext';
import { useNavigate } from 'react-router-dom';

export const ContactUs = () => {
  const { user, setSearchParams } = useContext(
    QuestionnaireContext
  ) as QuestionnaireContextType;
  const navigate = useNavigate();
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_6rfchdo',
        'template_q6vh61j',
        form.current,
        'umJYlsZZcSc4v8_4L'
      )
      .then(() => {
        alert('Courriel envoyé.');
        navigate('/profile');
      })
      .catch((err) => {
        alert('There was an issue.');
        console.log(err);
      });
  };

  return (
    <section className="flex flex-col align-baseline items-start w-full">
      <h1>Merci de faire affaire avec Impôts Match</h1>
      <p className="font-semibold">
        Veuillez contacter le service à la clientèle pour que nos professionnels
        de l’impôts prennent en charge votre dossier.
      </p>

      <div className="mx-auto max-w-[780px] pt-16">
        <form ref={form} onSubmit={sendEmail}>
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 sm:w-1/2">
              <div className="mb-12">
                <label
                  htmlFor="name"
                  className="mb-3 block font-heading text-base text-dark dark:text-white"
                >
                  Votre nom
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={user.displayName}
                  placeholder="Votre nom"
                  className="w-full border-b bg-transparent py-5 text-base font-medium text-dark placeholder-dark-text outline-none dark:border-[#2C3443] dark:text-white dark:focus:border-white"
                />
              </div>
            </div>
            <div className="w-full px-4 sm:w-1/2">
              <div className="mb-12">
                <label
                  htmlFor="email"
                  className="mb-3 block font-heading text-base text-dark dark:text-white"
                >
                  Adresse Courriel
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={user.email}
                  placeholder="Email@exemple.com"
                  className="w-full border-b bg-transparent py-5 text-base font-medium text-dark placeholder-dark-text outline-none dark:border-[#2C3443] dark:text-white dark:focus:border-white"
                />
              </div>
            </div>
            <div className="w-full px-4 sm:w-1/2">
              <div className="mb-12">
                <label
                  htmlFor="phone"
                  className="mb-3 block font-heading text-base text-dark dark:text-white"
                >
                  Téléphone (Optionnel)
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="(xxx) xxx-xxxx"
                  className="w-full border-b bg-transparent py-5 text-base font-medium text-dark placeholder-dark-text outline-none dark:border-[#2C3443] dark:text-white dark:focus:border-white"
                />
              </div>
            </div>
            <div className="w-full px-4 sm:w-1/2">
              <div className="mb-12">
                <label
                  htmlFor="subject"
                  className="mb-3 block font-heading text-base text-dark dark:text-white"
                >
                  Sujet
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  defaultValue={`Déclaration d'impôts: ${user.displayName}`}
                  placeholder="Écrivez le sujet"
                  className="w-full border-b bg-transparent py-5 text-base font-medium text-dark placeholder-dark-text outline-none dark:border-[#2C3443] dark:text-white dark:focus:border-white"
                />
              </div>
            </div>
            <div className="w-full px-4">
              <div className="mb-10">
                <label
                  htmlFor="message"
                  className="mb-3 block font-heading text-base text-dark dark:text-white"
                >
                  Message
                </label>
                <textarea
                  rows={4}
                  name="message"
                  id="message"
                  placeholder="Écrivez votre Message"
                  className="w-full resize-none border-b bg-transparent py-5 text-base font-medium text-dark placeholder-dark-text outline-none dark:border-[#2C3443] dark:text-white dark:focus:border-white"
                ></textarea>
              </div>
            </div>

            <div className="w-full px-4">
              <input
                type="submit"
                value="Envoyez votre message"
                className="flex w-full items-center justify-center rounded bg-orange-500 py-[14px] px-8 font-heading text-base text-white hover:bg-opacity-90 cursor-pointer"
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
