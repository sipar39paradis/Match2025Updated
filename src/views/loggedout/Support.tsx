import React, { useRef } from 'react';
import Fade from 'react-reveal';
import emailjs from '@emailjs/browser';

export function Support() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_6bjauir',
        'template_q6vh61j',
        form.current,
        'umJYlsZZcSc4v8_4L'
      )
      .then(() => {
        alert('Courriel envoyé.');
      })
      .catch((err) => {
        alert('There was an issue.');
        console.log(err);
      });
  };

  return (
    <section id="support" className="pt-14 sm:pt-20 lg:pt-[130px]">
      <Fade top cascade>
        <div className="px-4 xl:container m-auto">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4 xl:w-10/12">
              <div className="flex flex-wrap items-center border-b pb-14 dark:border-[#2E333D] lg:pb-0">
                <div className="w-full px-4">
                  {/* <!-- Section Title --> */}
                  <div className="relative mb-12 max-w-[500px] pt-6 md:mb-14 lg:pt-16">
                    <span className="title !left-0 !translate-x-0">
                      SUPPORT
                    </span>
                    <h2 className="mb-5 font-heading text-3xl font-semibold text-dark dark:text-white sm:text-4xl md:text-[50px] md:leading-[60px]">
                      Besoin d&apos;aide? Envoyez nous un message!
                    </h2>
                    <p className="text-base text-dark-text">
                      Notre équipe de professionnels ce fera un plaisir de
                      répondre à vos questions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-[780px] pt-[130px]">
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
        </div>
      </Fade>
    </section>
  );
}
